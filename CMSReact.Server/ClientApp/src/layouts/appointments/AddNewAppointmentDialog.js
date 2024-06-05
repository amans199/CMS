import { useEffect, useState } from "react";
import axios from "utils/Axios";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Form } from "react-bootstrap";

// Images
import SoftButton from "components/SoftButton";

//   React components
import SoftInput from "components/SoftInput";

// Images
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogTitle, Select, Typography } from "@mui/material";
import { formatTimeTo12Hour } from "utils";
import { isTimeSlotAvailable } from "utils";
import SoftBadge from "components/SoftBadge";

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
    setDoctorId(0);
    fetchDoctors(spec);
  };

  const handleChangingPatient = (e) => {
    const spec = e.target.value;
    setPatientId(spec);
  };

  return (
    <Dialog open={isAddingDialogOpen}>
      <DialogTitle>
        {originalAppointment?.id ? "Follow up Appointment" : "Add New Appointment"}
      </DialogTitle>
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
                <SelectDoctor
                  doctors={doctors}
                  value={doctorId}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onChange={(id) => setDoctorId(id)}
                />
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

const SelectDoctor = ({ doctors, value, onChange, selectedDate, selectedTime }) => {
  const isAvailable = (doctor) => isTimeSlotAvailable(doctor, selectedDate, selectedTime);

  function hasSufficientAvailabilityData(doctor) {
    return (
      doctor.availableWeekDays?.length > 0 && doctor.availableTimeFrom && doctor.availableTimeTo
    );
  }
  return (
    <div className="doctor-selection">
      {doctors.map((doctor) => (
        <Card
          key={doctor.id}
          className={`doctor-card ${
            value === doctor.id ? "selected" : ""
          } border-1 p-2 cursor-pointer`}
          onClick={() => {
            if (hasSufficientAvailabilityData(doctor) && !isAvailable(doctor)) return;
            onChange(doctor.id);
          }}
          style={{ cursor: "pointer", marginBottom: "1rem", borderRadius: "4px" }}
          disabled={hasSufficientAvailabilityData(doctor) && !isAvailable(doctor)}
        >
          <div className="d-flex align-items-center justify-content-between">
            <Form.Check
              type="radio"
              name="doctor"
              id={`doctor-${doctor.id}`}
              label={doctor.fullName || doctor.username}
              checked={value === doctor.id}
              onChange={() => onChange(doctor.id)}
              className="cursor-pointer"
              disabled={hasSufficientAvailabilityData(doctor) && !isAvailable(doctor)}
            />
            <SoftBadge
              variant="gradient"
              badgeContent={isAvailable(doctor) ? "Available" : "Not Available"}
              color={isAvailable(doctor) ? "success" : "error"}
              size="xs"
              container
            />
          </div>
          {!hasSufficientAvailabilityData(doctor) && (
            <p className="mb-1 bg-light p-1" style={{ fontSize: "12px", color: "red" }}>
              The doctor hasn&apos;t added enough data regarding availability.
            </p>
          )}
          {hasSufficientAvailabilityData(doctor) && (
            <p className="mb-1 bg-light p-1" style={{ fontSize: "12px" }}>
              {isAvailable(doctor)
                ? "Doctor is available during the time slot selected."
                : "Doctor isn't available during the time slot selected."}
            </p>
          )}
          <Typography className="mb-1" variant="caption">
            <strong> Available Time From: </strong>{" "}
            {doctor.availableTimeFrom ? formatTimeTo12Hour(doctor.availableTimeFrom) : "-"}
          </Typography>
          <Typography className="mb-1" variant="caption">
            <strong> Available Time To: </strong>{" "}
            {doctor.availableTimeTo ? formatTimeTo12Hour(doctor.availableTimeTo) : "-"}
          </Typography>
          <Typography className="mb-1" variant="caption">
            <strong> Available Time Note: </strong> {doctor.availableTimeNote || "-"}
          </Typography>
          <Typography className="mb-1" variant="caption">
            <strong> Available Week Days: </strong>{" "}
            {doctor.availableWeekDays?.length ? doctor.availableWeekDays.join(", ") : "-"}
          </Typography>
          <Typography className="mb-1" variant="caption">
            <strong>Gender:</strong> {doctor.gender || "-"}
          </Typography>
        </Card>
      ))}
    </div>
  );
};

export default AddNewAppointmentDialog;
