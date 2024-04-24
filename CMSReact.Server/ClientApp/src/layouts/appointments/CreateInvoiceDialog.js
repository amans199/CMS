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
  const [serviceDescription, setServiceDescription] = useState("---");
  const [totalAmount, setTotalAmount] = useState(0);
  const [invoiceItems, setInvoiceItems] = useState([]);

  const handleCreatingInvoice = async () => {
    console.log(selectedAppointment);
    const app = {
      id: 2,
      date: "2024-04-18",
      time: "21:31",
      createdAt: "2024-04-21T08:53:03.7843505",
      reason: "---",
      comment: "",
      status: 3,
      rejectionReason: "",
      originalAppointmentId: null,
      appointmentUsers: [
        {
          id: 0,
          appointmentId: 0,
          appointment: null,
          userId: 2,
          user: {
            id: 2,
            createdAt: "2024-04-20T19:09:27.3202175",
            username: "Test Surgery Doctor 1",
            email: "test_surgery_doctor_1@gmail.com",
            passwordHash: "51v15d5v1df5vdf!@#@#@",
            fullName: "",
            gender: "",
            phone: "",
            address: "",
            dateOfBirth: "",
            profilePicture: "",
            isAdmin: false,
            isDoctor: true,
            status: "Approved",
            specialityId: 2,
            appointmentUsers: [],
          },
          isDoctor: true,
        },
        {
          id: 0,
          appointmentId: 0,
          appointment: null,
          userId: 6,
          user: {
            id: 6,
            createdAt: "2024-04-20T19:33:29.53409",
            username: "Patient2",
            email: "Patient2@gmail.com",
            passwordHash: "51v15d5v1df5vdf!@#@#@",
            fullName: "",
            gender: "",
            phone: "",
            address: "",
            dateOfBirth: "",
            profilePicture: "",
            isAdmin: false,
            isDoctor: false,
            status: "Approved",
            specialityId: 0,
            appointmentUsers: [],
          },
          isDoctor: false,
        },
      ],
      prescriptionId: null,
      prescription: null,
      invoiceId: null,
      invoice: null,
      doctor: {
        id: 2,
        createdAt: "2024-04-20T19:09:27.3202175",
        username: "Test Surgery Doctor 1",
        email: "test_surgery_doctor_1@gmail.com",
        passwordHash: "51v15d5v1df5vdf!@#@#@",
        fullName: "",
        gender: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        profilePicture: "",
        isAdmin: false,
        isDoctor: true,
        status: "Approved",
        specialityId: 2,
        appointmentUsers: [],
      },
      patient: {
        id: 6,
        createdAt: "2024-04-20T19:33:29.53409",
        username: "Patient2",
        email: "Patient2@gmail.com",
        passwordHash: "51v15d5v1df5vdf!@#@#@",
        fullName: "",
        gender: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        profilePicture: "",
        isAdmin: false,
        isDoctor: false,
        status: "Approved",
        specialityId: 0,
        appointmentUsers: [],
      },
    };
    const invoice = {
      invoiceDate: selectedDate,
      serviceDescription,
      totalAmount, // Total amount for the invoice
      DoctorName: selectedAppointment.doctor.username,
      PatientName: selectedAppointment.patient.username,
      // Appointment: selectedAppointment,
      appointmentId: selectedAppointment.id,
      InvoiceNumber: Math.random(),
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
    } else {
      console.error("Failed to create appointment");
    }
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
            <SoftTypography variant="body2">Total Amount:</SoftTypography>
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
