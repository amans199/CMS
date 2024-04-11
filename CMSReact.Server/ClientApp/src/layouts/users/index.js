import { useEffect, useState } from "react";
import axios from "utils/Axios";
import Author from "./Author";
import History from "./History";
import SoftBadge from "components/SoftBadge";
import { useLocation, Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Images
import team2 from "assets/images/team-2.jpg";
import { getColorOfUser } from "utils";
import { getColorOfStatus } from "utils";
import SoftButton from "components/SoftButton";
function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { name: "id", align: "center" },
    { name: "user", align: "left" },
    // { name: "doctor", align: "left" },
    { name: "type", align: "left" },
    { name: "appointments", align: "left" },
    { name: "created at", align: "left" },
    { name: "isApproved", align: "left" },
    // { name: "history", align: "center" },
    { name: "action", align: "left" },
  ];

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response?.data || []);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const getUserType = (isDoctor) => (isDoctor ? `Doctor` : "Patient");

  const openProfile = (userId) => navigate(`/user/${userId}`);

  const rows = users.map((user) => ({
    id: <>{user.id}</>,
    user: <Author image={team2} name={user.fullName || user.username} email={user.email} />,
    type: (
      <SoftBadge
        variant="gradient"
        badgeContent={`${getUserType(user.isDoctor)}${
          user.isDoctor ? `(${user.specialityId})` : ""
        }`}
        color={getColorOfUser(getUserType(user.isDoctor))}
        size="xs"
        container
      />
    ),
    "created at": (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {user.createdAt}
      </SoftTypography>
    ),
    history: <History />,
    isApproved: (
      <SoftBadge
        variant="gradient"
        badgeContent={user.status}
        color={getColorOfStatus(user.status)}
        size="xs"
        container
      />
    ),
    action: (
      <>
        <SoftButton variant="primary" onClick={() => openProfile(user.id)}>
          Open
        </SoftButton>
        {/* <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Approve
        </SoftTypography>
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Reject
        </SoftTypography>
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Delete
        </SoftTypography> */}
      </>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Users table</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Users;
