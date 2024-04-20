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

export const RejectReasonDialog = ({
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

export default RejectReasonDialog;
