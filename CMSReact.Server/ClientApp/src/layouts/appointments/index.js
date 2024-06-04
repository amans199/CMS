import { useEffect, useState } from "react";
import axios from "utils/Axios";
import { getColorOfUser } from "utils";
import AddNewAppointmentDialog from "./AddNewAppointmentDialog";
import RejectReasonDialog from "./RejectReasonDialog";
import Author from "components/Global/Author";
import AppointmentStatusBadge from "components/Global/AppointmentStatusBadge";

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
import { getAppointmentStatus } from "utils";
import DeleteWarningDialog from "./DeleteWarningDialog";
import CreateInvoiceDialog from "./CreateInvoiceDialog";
import CreatePrescriptionDialog from "./CreatePrescriptionDialog";

function Tables() {
  const [appointments, setAppointments] = useState([]);
  const [isAddingDialogOpen, setIsAddingDialogOpen] = useState();
  const [rejectDialogAppointmentId, setRejectDialogAppointmentId] = useState();
  const [isLoading, setIsLoading] = useState();
  const [originalAppointmentToBeFollowedUp, setOriginalAppointmentToBeFollowedUp] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [isDeleteWarningDialogOpen, setIsDeleteWarningDialogOpen] = useState(false);
  const [isCreateInvoiceDialogOpen, setIsCreateInvoiceDialogOpen] = useState(false);
  const [isCreatePrescriptionDialogOpen, setIsCreatePrescriptionDialogOpen] = useState(false);

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
    setAppointmentsAppointmentToBeDeleted(appointmentId);
    setIsDeleteWarningDialogOpen(true);
  };

  const getUserOfType = (users, isDoctor) => {
    return users?.filter((u) => u.isDoctor === isDoctor)?.[0]?.user || {};
  };

  const handleFollowup = (appointment, doctor, patient) => {
    setOriginalAppointmentToBeFollowedUp({ ...appointment, doctor, patient });
    setIsAddingDialogOpen(true);
  };

  const getOriginalAppointmentSchedule = (appointmentId) => {
    const appointment = appointments.filter((appointment) => {
      return appointment.id === appointmentId;
    })?.[0];
    return appointment;
  };

  const handleMarkingAppointmentAsDone = async (appointmentId) => {
    try {
      const response = await axios.post(`/api/appointments/done/${appointmentId}`);
      toast.success(`Appointment Marked as done successfully`);
    } catch (error) {
      console.error("marking appointment as done failed:", error);
    } finally {
      fetchAll();
    }
  };

  const handleCreatingPrescription = (appointment) => {
    setIsCreatePrescriptionDialogOpen(true);
    setSelectedAppointment(appointment);
  };
  const handleCreatingInvoice = (appointment) => {
    setIsCreateInvoiceDialogOpen(true);
    setSelectedAppointment(appointment);
  };

  const isAdmin = userData.isAdmin;
  const isDoctor = userData.isDoctor;
  const isPatient = !userData.isDoctor && !userData.isAdmin;

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
      status: <AppointmentStatusBadge status={appointment.status} />,
      comment: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {appointment.originalAppointmentId ? (
            <div className="p-3 m-2 rounded bg-light">
              <div>original Appointment was at:</div>
              {getOriginalAppointmentSchedule(appointment.originalAppointmentId)?.date} -
              {getOriginalAppointmentSchedule(appointment.originalAppointmentId)?.time}
            </div>
          ) : (
            ""
          )}{" "}
          {appointment.rejectionReason ? `(${appointment.rejectionReason})  ` : ""}{" "}
          {appointment.comment ? `${appointment.comment}` : "-"}
        </SoftTypography>
      ),
      action: (
        <>
          <div className="d-flex flex-column gap-2">
            {/* <ButtonWithConditions
              conditions={[
                getAppointmentStatus(appointment.status) === "Done" ||
                  getAppointmentStatus(appointment.status) === "Rejected",
                isAdmin,
              ]}
              color="success"
              onClick={() => handleApproving(appointment.id)}
            >
              Approve
            </ButtonWithConditions> */}

            <ButtonWithConditions
              conditions={[
                appointment.prescriptionId !== null,
                getAppointmentStatus(appointment.status) === "Done",
              ]}
              color="dark"
              onClick={() => handleCreatingPrescription({ ...appointment, doctor, patient })}
            >
              View Prescription
            </ButtonWithConditions>

            <ButtonWithConditions
              conditions={[
                appointment.prescriptionId === null,
                getAppointmentStatus(appointment.status) === "Done",
                isAdmin || isDoctor,
              ]}
              color="primary"
              onClick={() => handleCreatingPrescription({ ...appointment, doctor, patient })}
            >
              Create Prescription
            </ButtonWithConditions>

            <ButtonWithConditions
              conditions={[
                appointment.invoiceId !== null,
                getAppointmentStatus(appointment.status) === "Done",
              ]}
              color="dark"
              onClick={() => handleCreatingInvoice({ ...appointment, doctor, patient })}
            >
              View Invoice
            </ButtonWithConditions>
            <ButtonWithConditions
              conditions={[
                appointment.invoiceId === null,
                getAppointmentStatus(appointment.status) === "Done",
                isAdmin,
              ]}
              color="primary"
              onClick={() => handleCreatingInvoice({ ...appointment, doctor, patient })}
            >
              Create Invoice
            </ButtonWithConditions>

            <ButtonWithConditions
              conditions={[
                getAppointmentStatus(appointment.status) === "Pending" ||
                  getAppointmentStatus(appointment.status) === "Rejected",
                isAdmin,
              ]}
              color="success"
              onClick={() => handleApproving(appointment.id)}
            >
              Approve
            </ButtonWithConditions>

            <ButtonWithConditions
              conditions={[
                getAppointmentStatus(appointment.status) === "Pending" ||
                  getAppointmentStatus(appointment.status) === "Approved",
                isDoctor || isAdmin,
              ]}
              color="warning"
              onClick={() => setRejectDialogAppointmentId(appointment.id)}
            >
              Reject
            </ButtonWithConditions>

            <ButtonWithConditions
              conditions={[
                getAppointmentStatus(appointment.status) === "Approved",
                isDoctor || isAdmin,
              ]}
              color="success"
              onClick={() => handleMarkingAppointmentAsDone(appointment.id)}
            >
              Done
            </ButtonWithConditions>

            <ButtonWithConditions
              conditions={[
                getAppointmentStatus(appointment.status) === "Done",
                isDoctor || isAdmin,
              ]}
              color="primary"
              onClick={() => handleFollowup(appointment, doctor, patient)}
            >
              Follow-up
            </ButtonWithConditions>

            <ButtonWithConditions
              conditions={[isAdmin || isPatient]}
              color="error"
              onClick={() => {
                setSelectedAppointment(appointment);
                setIsDeleteWarningDialogOpen(true);
              }}
            >
              Delete
            </ButtonWithConditions>
          </div>
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
        fetchAll={fetchAll}
        userData={userData}
        originalAppointmentToBeFollowedUp={originalAppointmentToBeFollowedUp}
        onClose={() => {
          setIsAddingDialogOpen(false);
          setOriginalAppointmentToBeFollowedUp();
        }}
      />

      <RejectReasonDialog
        rejectDialogAppointmentId={rejectDialogAppointmentId}
        setRejectDialogAppointmentId={setRejectDialogAppointmentId}
        fetchAll={fetchAll}
      />

      <DeleteWarningDialog
        isOpen={isDeleteWarningDialogOpen}
        fetchAll={fetchAll}
        appointmentId={selectedAppointment?.id}
        onClose={() => {
          setIsDeleteWarningDialogOpen(false);
          setSelectedAppointment();
        }}
      />

      <CreateInvoiceDialog
        isDialogOpen={isCreateInvoiceDialogOpen}
        selectedAppointment={selectedAppointment}
        onClose={() => {
          setIsCreateInvoiceDialogOpen(false);
          setSelectedAppointment();
          fetchAll();
        }}
      />

      <CreatePrescriptionDialog
        isDialogOpen={isCreatePrescriptionDialogOpen}
        selectedAppointment={selectedAppointment}
        onClose={() => {
          setIsCreatePrescriptionDialogOpen(false);
          setSelectedAppointment();
          fetchAll();
        }}
      />

      <Footer />
    </DashboardLayout>
  );
}

const ButtonWithConditions = ({ conditions, color, onClick, children }) => {
  const allConditionsAreMet = conditions.filter((condition) => !condition).length === 0;

  return allConditionsAreMet ? (
    <>
      <SoftButton color={color} onClick={onClick}>
        {children}
      </SoftButton>
    </>
  ) : (
    <></>
  );
};

export default Tables;
