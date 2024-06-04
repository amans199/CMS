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
import { Dialog, DialogContent, DialogContentText, DialogTitle, Select } from "@mui/material";
import { formatDate } from "utils";
import { getUserData } from "utils";
import { toDateInputValue } from "utils";

export const CreatePrescriptionDialog = ({
  isDialogOpen,
  selectedAppointment,
  userData,
  onClose,
}) => {
  const [medication, setMedication] = useState("");
  const [instructions, setInstructions] = useState("");
  const [selectedDate, setSelectedDate] = useState(toDateInputValue(new Date()));
  const [formMode, setFormMode] = useState("add");
  const [selectedPrescription, setSelectedPrescription] = useState();

  useEffect(() => {
    if (!isDialogOpen) return;
    setSelectedPrescription();
    if (selectedAppointment && selectedAppointment?.prescriptionId !== null) {
      fetchPrescription(selectedAppointment.prescriptionId);
      setFormMode("view");
    } else {
      setFormMode("add");
    }
  }, [selectedAppointment]);

  const handleCreatingPrescription = async () => {
    const prescription = {
      medication,
      instructions,
      appointmentId: selectedAppointment.id,
    };
    let response;
    if (selectedPrescription && selectedAppointment.prescriptionId) {
      response = await axios.put(
        `api/prescriptions/${selectedAppointment.id}/${selectedAppointment.prescriptionId}`,
        prescription
      );
    } else {
      response = await axios.post(`api/prescriptions/${selectedAppointment.id}`, prescription);
    }

    if (response) {
      onClose();
      toast.success(
        `Prescription been ${
          selectedAppointment?.prescriptionId ? "updated" : "added"
        } correctly for appointment on ${selectedAppointment.date} at ${selectedAppointment.time} `
      );
      resetForm();
    } else {
      console.error("Failed to create prescription");
    }
  };

  const fetchPrescription = async (id) => {
    if (id === null) return;

    const response = await axios.get(`api/prescriptions/${selectedAppointment.id}/${id}`);

    if (response && response.data) {
      setInstructions(response.data.instructions);
      setMedication(response.data.medication);
      setSelectedPrescription(response.data);
      // onClose();
    } else {
      console.error("Failed to create prescription");
    }
  };

  const resetForm = () => {
    setFormMode("add");
    setMedication("");
    setInstructions("");
    setSelectedDate(toDateInputValue(new Date()));
    setSelectedPrescription();
  };
  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>{formMode === "add" ? "Add New Prescription" : "Edit Prescription"}</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Please fill in the details for your new Prescription.</DialogContentText> */}
        {formMode === "view" ? (
          <>
            <SoftBox mt={2} mb={3} px={3}>
              <SoftBox mb={2}>
                <SoftTypography variant="body2">Medication:</SoftTypography>
                <SoftTypography rows={4}>{medication}</SoftTypography>
              </SoftBox>
              <SoftBox mb={2}>
                <SoftTypography variant="body2">Instructions:</SoftTypography>
                <SoftTypography rows={4}>{instructions}</SoftTypography>
              </SoftBox>
              <SoftBox mb={2}>
                <SoftTypography variant="body2">Date:</SoftTypography>
                <SoftTypography rows={4}>{selectedDate}</SoftTypography>
              </SoftBox>

              <SoftBox mt={4} display="flex" justifyContent="space-between">
                <SoftButton onClick={onClose}>Cancel</SoftButton>
                <SoftButton
                  variant="contained"
                  color="primary"
                  className="ml-3"
                  style={{ marginLeft: "1rem" }}
                  onClick={() => setFormMode("edit")}
                >
                  {"Edit"}
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </>
        ) : (
          <>
            <SoftBox mt={2} mb={3} px={3}>
              <SoftBox mb={2}>
                <SoftTypography variant="body2">Medication:</SoftTypography>
                <SoftInput
                  multiline
                  rows={4}
                  value={medication}
                  onChange={(e) => setMedication(e.target.value)}
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftTypography variant="body2">Instructions:</SoftTypography>
                <SoftInput
                  multiline
                  rows={4}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </SoftBox>
              <SoftBox mt={4} display="flex" justifyContent="space-between">
                <SoftButton onClick={onClose}>Cancel</SoftButton>
                <SoftButton
                  variant="contained"
                  color="primary"
                  className="ml-3"
                  style={{ marginLeft: "1rem" }}
                  onClick={handleCreatingPrescription}
                  disabled={!medication || !instructions || !selectedDate}
                >
                  {formMode === "add" ? "Create" : "Save"}
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePrescriptionDialog;
