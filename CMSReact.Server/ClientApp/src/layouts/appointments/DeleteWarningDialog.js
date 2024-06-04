import { useEffect, useState } from "react";
import axios from "utils/Axios";
import { getColorOfUser } from "utils";
import AddNewAppointmentDialog from "./AddNewAppointmentDialog";
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

export const DeleteWarningDialog = ({ isOpen, fetchAll, appointmentId, onClose }) => {
  const handleDeleting = async () => {
    if (!appointmentId) return;
    try {
      const response = await axios.post(`/api/appointments/delete/${appointmentId}`);
      toast.success(`Appointment deleted successfully`);
    } catch (error) {
      console.error("Deletion failed:", error);
    } finally {
      onClose();
      fetchAll();
    }
  };

  return (
    <Dialog open={!!isOpen}>
      <DialogTitle>Delete Appointment</DialogTitle>
      <DialogContent>
        <SoftBox mt={2} mb={3} px={0}>
          <SoftBox mt={4} display="flex" justifyContent="space-between" className="gap-3">
            <SoftButton onClick={onClose} className="mr-2">
              Cancel
            </SoftButton>
            <SoftButton className="ml-2" variant="contained" color="error" onClick={handleDeleting}>
              Confirm
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWarningDialog;
