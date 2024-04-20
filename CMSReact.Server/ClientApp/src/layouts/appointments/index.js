import { useEffect, useState } from "react";
import axios from "utils/Axios";
import { getColorOfUser } from "utils";
import AddNewAppointmentDialog from "./AddNewAppointmentDialog";
import RejectReasonDialog from "./RejectReasonDialog";
import Author from "components/Global/Author";

// @mui material components
import Card from "@mui/material/Card";

//  React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

//  React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Images
import team2 from "assets/images/team-2.jpg";
import SoftButton from "components/SoftButton";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";

//   React components
import SoftInput from "components/SoftInput";

// Images
import { getColorOfStatus } from "utils";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogTitle, Select } from "@mui/material";
import { formatDate } from "utils";
import { getUserData } from "utils";

function Tables() {
  const [appointments, setAppointments] = useState([]);
  const [isAddingDialogOpen, setIsAddingDialogOpen] = useState();
  const [rejectDialogAppointmentId, setRejectDialogAppointmentId] = useState();
  const [isLoading, setIsLoading] = useState();

  const userData = getUserData();

  useEffect(() => {
    // fetchDoctors();
    fetchAll();
  }, []);

  const columns = [
    { name: "id", align: "center" },
    { name: "patient", align: "left" },
    { name: "doctor", align: "left" },
    { name: "created at", align: "left" },
    { name: "status", align: "center" },
    { name: "schedule", align: "left" },
    { name: "comment", align: "left" },
    { name: "action", align: "left" },
  ];

  const fetchAll = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/appointments/user/${userData.id}`);
      setAppointments(response?.data || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Registration failed:", error);
      setIsLoading(false);
    }
  };

  const handleApproving = async (appointmentId) => {
    try {
      const response = await axios.post(`/api/appointments/approve/${appointmentId}`);
      toast.success(`Appointment approved successfully`);
    } catch (error) {
      console.error("approval failed:", error);
    } finally {
      fetchAll();
    }
  };

  const handleDeleting = async (appointmentId) => {
    try {
      const response = await axios.post(`/api/appointments/delete/${appointmentId}`);
      toast.success(`Appointment deleted successfully`);
    } catch (error) {
      console.error("Deletion failed:", error);
    } finally {
      fetchAll();
    }
  };

  const getUserOfType = (users, isDoctor) => {
    return users?.filter((u) => u.isDoctor === isDoctor)?.[0]?.user || {};
  };

  const rows = appointments.map((appointment) => {
    const patient = getUserOfType(appointment.appointmentUsers, false);
    const doctor = getUserOfType(appointment.appointmentUsers, true);
    return {
      id: <>{appointment.id}</>,
      patient: (
        <Author
          image={patient.profilePicture}
          name={patient.fullName || patient.username}
          email={patient.email}
        />
      ),
      doctor: (
        <Author
          image={doctor.profilePicture}
          name={doctor.fullName || doctor.username}
          email={doctor.email}
        />
      ),
      "created at": (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {formatDate(appointment.createdAt)}
        </SoftTypography>
      ),
      schedule: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {formatDate(appointment.date)} -{appointment.time}
        </SoftTypography>
      ),
      status: (
        <SoftBadge
          variant="gradient"
          badgeContent={appointment.status}
          color={getColorOfStatus(appointment.status)}
          size="xs"
          container
        />
      ),
      comment: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {appointment.rejectionReason ? `(${appointment.rejectionReason})  ` : ""}{" "}
          {appointment.comment ? `${appointment.comment}` : "-"}
        </SoftTypography>
      ),
      action: (
        <>
          {userData.isAdmin ? (
            <>
              {appointment.status !== "Approved" ? (
                <SoftButton variant="primary" onClick={() => handleApproving(appointment.id)}>
                  Approve
                </SoftButton>
              ) : (
                <SoftButton
                  variant="primary"
                  onClick={() => setRejectDialogAppointmentId(appointment.id)}
                >
                  Reject
                </SoftButton>
              )}
              <SoftButton variant="primary" onClick={() => handleDeleting(appointment.id)}>
                Delete
              </SoftButton>
            </>
          ) : (
            <></>
          )}
        </>
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
              <SoftTypography variant="h6">Appointments table</SoftTypography>
              <SoftButton onClick={() => setIsAddingDialogOpen(true)} color="primary">
                Add new appointment
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
              <Table columns={columns} rows={rows} isLoading={isLoading} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>

      <AddNewAppointmentDialog
        isAddingDialogOpen={isAddingDialogOpen}
        setIsAddingDialogOpen={setIsAddingDialogOpen}
        fetchAll={fetchAll}
        userData={userData}
      />

      <RejectReasonDialog
        rejectDialogAppointmentId={rejectDialogAppointmentId}
        setRejectDialogAppointmentId={setRejectDialogAppointmentId}
        fetchAll={fetchAll}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
