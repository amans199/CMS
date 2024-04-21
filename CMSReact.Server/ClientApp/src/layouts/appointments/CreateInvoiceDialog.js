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

export const CreateInvoiceDialog = ({ isDialogOpen, userData, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(toDateInputValue(new Date()));
  const [serviceDescription, setServiceDescription] = useState("---");
  const [totalAmount, setTotalAmount] = useState(0);
  const [invoiceItems, setInvoiceItems] = useState([]);

  const handleCreatingInvoice = () => {
    const invoice = {
      invoiceDate: selectedDate,
      serviceDescription,
      totalAmount, // Total amount for the invoice
      invoiceItems: [
        // {
        //   description: "Medication",
        //   unitPrice: 50.0,
        //   quantity: 1,
        //   totalPrice: 50.0,
        // },
      ],
    };
    // if (originalAppointment) {
    //   appointment.OriginalAppointmentId = originalAppointment.id;
    //   appointment.doctorId = originalAppointment.doctor?.id;
    //   appointment.patientId = originalAppointment.patient?.id;
    //   appointment.specialtyId = originalAppointment.doctor.specialityId;
    // }
    // const response = await axios.post("/api/appointments", appointment);
    // if (response) {
    //   const data = response.data.value;
    //   onClose();
    //   // setIsAddingDialogOpen(false);
    //   fetchAll();
    //   toast.success(`Appointment has been created correctly on ${data.date} at ${data.time} `);
    // } else {
    //   console.error("Failed to create appointment");
    // }
  };

  useEffect(() => {
    // fetchPatients();
    // fetchAllSpecialties();
  }, []);

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>Add New Invoice</DialogTitle>
      <DialogContent>
        <DialogContentText>Please fill in the details for your new Invoice.</DialogContentText>
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
            <SoftTypography variant="body2">Description:</SoftTypography>
            <SoftInput
              multiline
              rows={4}
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
            />
          </SoftBox>

          <SoftBox mb={2}>
            <SoftTypography variant="body2">Description:</SoftTypography>
            <SoftInput value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
          </SoftBox>
          <SoftBox mt={4} display="flex" justifyContent="space-between">
            <SoftButton onClick={onClose}>Cancel</SoftButton>
            <SoftButton
              variant="contained"
              color="primary"
              onClick={handleCreatingInvoice}
              disabled={!selectedDate || !serviceDescription || !totalAmount}
            >
              Create
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvoiceDialog;
