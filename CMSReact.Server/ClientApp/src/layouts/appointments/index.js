import { useEffect, useState } from "react";
import axios from "utils/Axios";
import { getColorOfUser } from "utils";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Images
import team2 from "assets/images/team-2.jpg";

function Tables() {
  const [appointments, setAppointments] = useState([]);
  const columns = [
    { name: "id", align: "center" },
    { name: "patient", align: "left" },
    // { name: "doctor", align: "left" },
    { name: "created at", align: "left" },
    { name: "schedule", align: "left" },
    { name: "comment", align: "left" },
    // { name: "history", align: "center" },
    { name: "action", align: "left" },
  ];

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const response = await axios.get("/api/appointments");
      setAppointments(response?.data || []);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const rows = appointments.map((appointment) => {
    console.log("🚀 ~ rows ~ appointment:", appointment);

    const { user } = appointment;
    const { result: userData } = user;
    return {
      id: <>{appointment.id}</>,
      patient: <Author image={team2} name={userData.username} email={userData.email} />,
      "created at": (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {appointment.createdAt}
        </SoftTypography>
      ),
      schedule: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {appointment.date} -{appointment.time}
        </SoftTypography>
      ),
      comment: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {appointment.comment || "-"}
        </SoftTypography>
      ),
      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Open
        </SoftTypography>
      ),
    };
  });

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

function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" px={0} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Type({ type }) {
  return (
    <SoftBadge
      variant="gradient"
      badgeContent={type}
      color={getColorOfUser(type)}
      size="xs"
      container
    />
  );
}

function History() {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" color="secondary">
        History
      </SoftTypography>
    </SoftBox>
  );
}

export default Tables;
