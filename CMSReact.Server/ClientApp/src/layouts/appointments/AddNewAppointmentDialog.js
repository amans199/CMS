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

export const AddNewAppointmentDialog = ({
  isAddingDialogOpen,
  originalAppointmentToBeFollowedUp: originalAppointment,
  fetchAll,
  userData,
  onClose,
}) => {
  const [selectedDate, setSelectedDate] = useState("2024-04-18");
  const [selectedTime, setSelectedTime] = useState("21:31");
  const [reason, setReason] = useState("---");
  const [patientId, setPatientId] = useState(userData.id);
  const [doctorId, setDoctorId] = useState(0);
  const [specialtyId, setSpecialtyId] = useState(0);
  const [allPatients, setAllPatients] = useState([]);
  const [allSpecialties, setAllSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchPatients();
    fetchAllSpecialties();
  }, []);

  const fetchAllSpecialties = async () => {
    try {
      const response = await axios.get("/api/specialties");
      setAllSpecialties(response?.data || []);
    } catch (error) {
      console.error("Fetching Specialties failed:", error);
    }
  };

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
  const fetchPatients = async () => {
    try {
      const response = await axios.get(`/api/users?isDoctor=false&status=Approved`);
      if (response.data) {
        setAllPatients(response.data);
      } else {
        console.error("Failed to fetch doctors:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleAddingAppointment = async () => {
    var appointment = {
      date: selectedDate,
      time: selectedTime,
      reason,
      CreatedBy: userData.id,
      patientId,
      doctorId,
      specialtyId,
    };
    if (originalAppointment) {
      appointment.OriginalAppointmentId = originalAppointment.id;
      appointment.doctorId = originalAppointment.doctor?.id;
      appointment.patientId = originalAppointment.patient?.id;
      appointment.specialtyId = originalAppointment.doctor.specialityId;
    }
    const response = await axios.post("/api/appointments", appointment);

    if (response) {
      const data = response.data.value;
      onClose();
      // setIsAddingDialogOpen(false);
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

  const handleChangingPatient = (e) => {
    const spec = e.target.value;
    setPatientId(spec);
  };

  return (
    <Dialog open={isAddingDialogOpen}>
      <DialogTitle>Add New Appointment</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Please fill in the details for your new appointment.</DialogContentText> */}
        <SoftBox mt={2} mb={3} px={3}>
          {userData.isAdmin && !originalAppointment ? (
            <>
              <SoftBox mb={2}>
                <SoftTypography variant="body2">Patient:</SoftTypography>
                <select className="form-select" value={patientId} onChange={handleChangingPatient}>
                  <option value="0">Select Patient</option>
                  {allPatients.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.fullName || s.username}
                    </option>
                  ))}
                </select>
              </SoftBox>
            </>
          ) : (
            <></>
          )}
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
          {!originalAppointment ? (
            <>
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
            </>
          ) : (
            <></>
          )}
          <SoftBox mt={4} display="flex" justifyContent="space-between">
            <SoftButton onClick={onClose}>Cancel</SoftButton>
            <SoftButton
              variant="contained"
              color="primary"
              onClick={handleAddingAppointment}
              className="ml-3"
              disabled={
                !selectedDate || !selectedTime || !reason || (!originalAppointment && !doctorId)
              }
            >
              Add Appointment
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewAppointmentDialog;
