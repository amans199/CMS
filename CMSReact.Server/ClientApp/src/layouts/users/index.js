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
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";

//   React components
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Images
import team2 from "assets/images/team-2.jpg";
import { getColorOfUser } from "utils";
import { getColorOfStatus } from "utils";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogTitle, Select } from "@mui/material";
import { formatDate } from "utils";

function Users() {
  const [users, setUsers] = useState([]);
  const [isAddingDialogOpen, setIsAddingDialogOpen] = useState();

  const [isDoctor, setIsDoctor] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [AllSpecialties, setAllSpecialties] = useState([]);

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
    fetchAllSpecialties();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response?.data || []);
    } catch (error) {
      console.error("Fetching Users failed:", error);
    }
  };

  const fetchAllSpecialties = async () => {
    try {
      const response = await axios.get("/api/specialties");
      setAllSpecialties(response?.data || []);
    } catch (error) {
      console.error("Fetching Users failed:", error);
    }
  };

  const getUserType = (isDoctor) => (isDoctor ? `Doctor` : "Patient");

  const openProfile = (userId) => navigate(`/user/${userId}`);

  const handleApproving = async (userId) => {
    try {
      const response = await axios.post(`/api/users/approve/${userId}`);
      toast.success(`User (${response?.data?.username}) approved successfully`);
    } catch (error) {
      console.error("approval failed:", error);
    } finally {
      fetchAllUsers();
    }
  };

  const handleRejecting = async (userId) => {
    try {
      const response = await axios.post(`/api/users/reject/${userId}`);
      toast.success(`User (${response?.data?.username}) rejected successfully`);
    } catch (error) {
      console.error("Rejection failed:", error);
    } finally {
      fetchAllUsers();
    }
  };

  const handleDeleting = async (username, userId) => {
    try {
      const response = await axios.post(`/api/users/delete/${userId}`);
      toast.success(`User (${username}) deleted successfully`);
    } catch (error) {
      console.error("Deletion failed:", error);
    } finally {
      fetchAllUsers();
    }
  };

  const handleAdding = async () => {
    if (!username || !password || !email) return;
    const user = {
      username,
      passwordHash: password,
      email,
      isDoctor,
      ...(isDoctor ? { SpecialityId: specialty } : {}),
    };
    try {
      const response = await axios.post(`/api/users/add`, user);
      toast.success(`User (${username}) added successfully`);
    } catch (error) {
      console.error("Adding failed:", error);
    } finally {
      fetchAllUsers();

      resetNewUser();
      setIsAddingDialogOpen(false);
    }
  };

  const getSpecialtyName = (id) => {
    return AllSpecialties.find((s) => s.id === id)?.name;
  };

  const resetNewUser = () => {
    setEmail();
    setUsername();
    setIsDoctor(false);
    setPassword();
    setSpecialty();
  };

  const rows = users.map((user) => ({
    id: <>{user.id}</>,
    user: <Author image={team2} name={user.fullName || user.username} email={user.email} />,
    type: (
      <SoftBadge
        variant="gradient"
        badgeContent={`${getUserType(user.isDoctor)}${
          user.isDoctor ? `(${getSpecialtyName(user.specialityId)})` : ""
        }`}
        color={getColorOfUser(getUserType(user.isDoctor))}
        size="xs"
        container
      />
    ),
    "created at": (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {formatDate(user.createdAt)}
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
        {user.status !== "Approved" ? (
          <SoftButton variant="primary" onClick={() => handleApproving(user.id)}>
            Approve
          </SoftButton>
        ) : (
          <SoftButton variant="primary" onClick={() => handleRejecting(user.id)}>
            Reject
          </SoftButton>
        )}
        <SoftButton variant="primary" onClick={() => handleDeleting(user.username, user.id)}>
          Delete
        </SoftButton>
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
              <SoftButton onClick={() => setIsAddingDialogOpen(true)} color="primary">
                Add new user
              </SoftButton>
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

      <Dialog open={isAddingDialogOpen}>
        <DialogContent style={{ width: "400px" }}>
          <div className="d-flex flex-row align-items-center justify-content-between pb-3 border-bottom">
            <SoftTypography>Add new user</SoftTypography>
            <SoftButton onClick={() => setIsAddingDialogOpen(false)}> Close</SoftButton>
          </div>
          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="div" justifyContent="center" alignItems="center">
              <SoftBox mb={2}>
                <div className="d-flex flex-row gap-2 align-items-center justify-content-center">
                  <SoftTypography>Patient</SoftTypography>
                  <Switch
                    value={isDoctor}
                    onChange={(e) => {
                      setIsDoctor(e.target.checked);
                    }}
                  />
                  <SoftTypography>Doctor</SoftTypography>
                </div>
              </SoftBox>
              {isDoctor ? (
                <SoftBox mb={2}>
                  <select
                    className="form-select"
                    onChange={(e) => {
                      setSpecialty(e.target.value);
                    }}
                  >
                    <option selected>Select Specialty</option>
                    {AllSpecialties.map((s) => {
                      return (
                        <option key={s.id} value={s.id} selected={specialty == s}>
                          {s.name}
                        </option>
                      );
                    })}
                  </select>
                </SoftBox>
              ) : (
                <></>
              )}
              <SoftBox mb={2}>
                <SoftInput
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </SoftBox>

              <div className="d-flex flex-row align-items-center justify-content-between pt-3 border-top">
                <SoftButton onClick={() => setIsAddingDialogOpen(false)}>Cancel</SoftButton>

                <SoftButton
                  onClick={handleAdding}
                  disabled={!username || !password || !email}
                  color="primary"
                >
                  Add
                </SoftButton>
              </div>
            </SoftBox>
          </SoftBox>
        </DialogContent>
      </Dialog>
      <Footer />
    </DashboardLayout>
  );
}

export default Users;
