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
  const [doctors, setDoctors] = useState([]);
  const [allSpecialties, setAllSpecialties] = useState([]);
  const [isLoading, setIsLoading] = useState();

  const userData = getUserData();

  useEffect(() => {
    // fetchDoctors();
    fetchAll();
    fetchAllSpecialties();
  }, []);

  const fetchDoctors = async (specialtyId) => {
    try {
      const response = await axios.get(
        `/api/users?isDoctor=true&specialtyId=${specialtyId}&status=Approved`
      );
      if (response.data) {
        setDoctors(response.data);
      } else {
        console.error("Failed to fetch doctors:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchAllSpecialties = async () => {
    try {
      const response = await axios.get("/api/specialties");
      setAllSpecialties(response?.data || []);
    } catch (error) {
      console.error("Fetching Specialties failed:", error);
    }
  };

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
        doctors={doctors}
        allSpecialties={allSpecialties}
        fetchDoctors={fetchDoctors}
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

const RejectReasonDialog = ({
  rejectDialogAppointmentId,
  setRejectDialogAppointmentId,
  fetchAll,
}) => {
  const [rejectionReason, setRejectionReason] = useState("");

  const handleRejecting = async () => {
    try {
      const body = new FormData();
      body.append("rejectionReason", rejectionReason);

      const response = await axios.post(
        `/api/appointments/reject/${rejectDialogAppointmentId}?rejectionReason=${rejectionReason}`,
        {
          rejectionReason,
        }
      );
      if (response) {
        toast.success(`Appointment rejected successfully`);
        fetchAll();
        setRejectionReason("");
        setRejectDialogAppointmentId();
      }
    } catch (error) {
      console.error("Rejection failed:", error);
    }
  };

  return (
    <Dialog open={!!rejectDialogAppointmentId}>
      <DialogTitle>Reject Appointment</DialogTitle>
      <DialogContent>
        <SoftBox mt={2} mb={3} px={0}>
          <SoftBox mb={2}>
            <SoftTypography variant="body2">Reason:</SoftTypography>
            <SoftInput
              multiline
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </SoftBox>
          <SoftBox mt={4} display="flex" justifyContent="space-between" className="gap-3">
            <SoftButton onClick={() => setRejectDialogAppointmentId()} className="mr-2">
              Cancel
            </SoftButton>
            <SoftButton
              className="ml-2"
              variant="contained"
              color="error"
              onClick={handleRejecting}
              disabled={!rejectionReason}
            >
              Reject
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </DialogContent>
    </Dialog>
  );
};

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

const AddNewAppointmentDialog = ({
  isAddingDialogOpen,
  setIsAddingDialogOpen,
  doctors,
  allSpecialties,
  fetchDoctors,
  fetchAll,
  userData,
}) => {
  const [selectedDate, setSelectedDate] = useState("2024-04-18");
  const [selectedTime, setSelectedTime] = useState("21:31");
  const [reason, setReason] = useState("---");
  const [patientId, setPatientId] = useState(userData.id);
  const [doctorId, setDoctorId] = useState(0);
  const [specialtyId, setSpecialtyId] = useState(0);

  const handleAddingAppointment = async () => {
    const response = await axios.post("/api/appointments", {
      date: selectedDate,
      time: selectedTime,
      reason,
      CreatedBy: userData.id,
      patientId,
      doctorId,
      specialtyId,
    });

    if (response) {
      console.log("🚀 ~ handleAddingAppointment ~ response:", response);
      const data = response.data.value;
      setIsAddingDialogOpen(false);
      fetchAll();
      toast.success(`Appointment has been created correctly on ${data.date} at ${data.time} `);
    } else {
      console.error("Failed to create appointment");
    }
  };

  const handleChangingSpecialties = (e) => {
    const spec = e.target.value;
    setSpecialtyId(spec);
    fetchDoctors(spec);
  };

  return (
    <Dialog open={isAddingDialogOpen}>
      <DialogTitle>Add New Appointment</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Please fill in the details for your new appointment.</DialogContentText> */}
        <SoftBox mt={2} mb={3} px={3}>
          <SoftBox mb={2}>
            <SoftTypography variant="body2">Date:</SoftTypography>
            <SoftInput
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftTypography variant="body2">Time:</SoftTypography>
            <SoftInput
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftTypography variant="body2">Reason:</SoftTypography>
            <SoftInput
              multiline
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftTypography variant="body2">Specialty:</SoftTypography>
            <select
              className="form-select"
              value={specialtyId}
              onChange={handleChangingSpecialties}
            >
              <option value="0">Select Specialty</option>
              {allSpecialties.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </SoftBox>
          <SoftBox mb={2}>
            <SoftTypography variant="body2">Doctor:</SoftTypography>
            <select
              className="form-select"
              value={doctorId}
              disabled={!specialtyId}
              onChange={(e) => setDoctorId(parseInt(e.target.value))}
            >
              <option value="0">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.username} {doc.fullName ? `(${doc.fullName})` : ""}
                </option>
              ))}
            </select>
          </SoftBox>
          <SoftBox mt={4} display="flex" justifyContent="space-between">
            <SoftButton onClick={() => setIsAddingDialogOpen(false)}>Cancel</SoftButton>
            <SoftButton
              variant="contained"
              color="primary"
              onClick={handleAddingAppointment}
              disabled={!selectedDate || !selectedTime || !reason || !doctorId}
            >
              Add Appointment
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </DialogContent>
    </Dialog>
  );
};

export default Tables;
