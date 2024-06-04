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

export const CreateInvoiceDialog = ({ isDialogOpen, selectedAppointment, userData, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(toDateInputValue(new Date()));
  const [serviceDescription, setServiceDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [invoiceItems, setInvoiceItems] = useState([]);

  const [formMode, setFormMode] = useState("add");
  const [selectedInvoice, setSelectedInvoice] = useState();

  useEffect(() => {
    if (!isDialogOpen) return;

    resetForm();
    setSelectedInvoice();
    if (selectedAppointment && selectedAppointment?.invoiceId !== null) {
      fetchInvoice(selectedAppointment.invoiceId);
      setFormMode("view");
    } else {
      setFormMode("add");
    }
  }, [selectedAppointment]);

  const handleCreatingInvoice = async () => {
    console.log(selectedAppointment);

    const invoice = {
      invoiceDate: selectedDate,
      serviceDescription,
      totalAmount, // Total amount for the invoice
      DoctorId: selectedAppointment.doctor.id,
      PatientId: selectedAppointment.patient.id,
      // Appointment: selectedAppointment,
      appointmentId: selectedAppointment.id,
      InvoiceNumber: Math.ceil(Math.random() * 1000000),
      invoiceItems: [
        // {
        //   description: "Medication",
        //   unitPrice: 50.0,
        //   quantity: 1,
        //   totalPrice: 50.0,
        // },
      ],
    };
    const response = await axios.post(
      `/api/invoices/appointment/${selectedAppointment.id}`,
      invoice
    );
    console.log("🚀 ~ handleCreatingInvoice ~ response:", response);
    if (response) {
      const data = response.data.value;
      onClose();
      // setIsAddingDialogOpen(false);
      // fetchAll();
      toast.success(
        `Invoice been created correctly for appointment on ${selectedAppointment.date} at ${selectedAppointment.time} `
      );
      resetForm();
    } else {
      console.error("Failed to create appointment");
    }
  };

  const fetchInvoice = async (id) => {
    if (id === null) return;

    const response = await axios.get(`api/invoices/${id}`);

    if (response && response.data) {
      const invoiceVal = response.data?.value;
      console.log("🚀 ~ fetchInvoice ~ response:", response);
      setSelectedDate(invoiceVal?.invoiceDate);
      setServiceDescription(invoiceVal?.serviceDescription);
      setTotalAmount(invoiceVal?.totalAmount);
      setInvoiceItems(invoiceVal?.invoiceItems);
      setSelectedInvoice(invoiceVal);
    } else {
      console.error("Failed to fetch invoice ");
    }
  };

  const resetForm = () => {
    setFormMode("add");
    setSelectedDate(toDateInputValue(new Date()));
    setServiceDescription("");
    setTotalAmount(0);
  };

  useEffect(() => {
    // fetchPatients();
    // fetchAllSpecialties();
  }, []);

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>{formMode === "view" ? "Invoice" : "Add New Invoice"}</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Please fill in the details for your new Invoice.</DialogContentText> */}
        {formMode === "view" ? (
          <>
            <SoftBox mt={2} mb={3} px={3}>
              <SoftBox mb={2}>
                <SoftTypography variant="body2">Date:</SoftTypography>
                <SoftTypography rows={4}>{formatDate(selectedDate)}</SoftTypography>
              </SoftBox>
              <SoftBox mb={2}>
                <SoftTypography variant="body2">Description:</SoftTypography>
                <SoftTypography rows={4}>{serviceDescription}</SoftTypography>
              </SoftBox>
              <SoftBox mb={2}>
                <SoftTypography variant="body2">Total Amount:</SoftTypography>
                <SoftTypography rows={4}>{totalAmount}</SoftTypography>
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
                <SoftTypography variant="body2">Description:</SoftTypography>
                <SoftInput
                  multiline
                  rows={4}
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                />
              </SoftBox>

              <SoftBox mb={2}>
                <SoftTypography variant="body2">Total Amount:</SoftTypography>
                <SoftInput
                  value={totalAmount}
                  type="number"
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
              </SoftBox>
              <SoftBox mt={4} display="flex" justifyContent="space-between">
                <SoftButton onClick={onClose}>Cancel</SoftButton>
                <SoftButton
                  variant="contained"
                  color="primary"
                  onClick={handleCreatingInvoice}
                  disabled={!selectedDate || !serviceDescription || !totalAmount}
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

export default CreateInvoiceDialog;
