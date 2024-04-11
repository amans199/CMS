import { useEffect, useState } from "react";
import axios from "utils/Axios";
import SoftBadge from "components/SoftBadge";
import { useLocation, Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";

//   React components
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Images
import team2 from "assets/images/team-2.jpg";
import { getColorOfUser } from "utils";
import { getColorOfStatus } from "utils";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { formatDate } from "utils";

function Specialties() {
  const [specialties, setSpecialties] = useState([]);
  const [name, setName] = useState("");
  const [isAddingDialogOpen, setIsAddingDialogOpen] = useState();

  const navigate = useNavigate();

  const columns = [
    { name: "id", align: "center" },
    { name: "name", align: "left" },
    { name: "action", align: "left" },
  ];

  useEffect(() => {
    fetchAllSpecialties();
  }, []);

  const fetchAllSpecialties = async () => {
    try {
      const response = await axios.get("/api/specialties");
      setSpecialties(response?.data || []);
    } catch (error) {
      console.error("Fetching Specialties failed:", error);
    }
  };

  const handleDeleting = async (name, id) => {
    try {
      const response = await axios.delete(`/api/specialties/${id}`);
      toast.success(`Speciality (${name}) deleted successfully`);
    } catch (error) {
      console.error("Deletion failed:", error);
    } finally {
      fetchAllSpecialties();
    }
  };

  const handleAdding = async () => {
    if (!name) return;
    try {
      const response = await axios.post(`/api/specialties`, { name });
      toast.success(`User (${name}) added successfully`);
    } catch (error) {
      console.error("Adding failed:", error);
    } finally {
      fetchAllSpecialties();

      resetData();
      setIsAddingDialogOpen(false);
    }
  };

  const resetData = () => {
    setName();
  };

  const rows = specialties.map((speciality) => ({
    id: <>{speciality.id}</>,
    name: <SoftTypography>{speciality.name}</SoftTypography>,
    action: (
      <>
        <SoftButton
          variant="primary"
          onClick={() => handleDeleting(speciality.name, speciality.id)}
        >
          Delete
        </SoftButton>
      </>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Specialties table</SoftTypography>
              <SoftButton onClick={() => setIsAddingDialogOpen(true)} color="primary">
                Add new specialty
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
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>

      <Dialog open={isAddingDialogOpen}>
        <DialogContent style={{ width: "400px" }}>
          <div className="d-flex flex-row align-items-center justify-content-between pb-3 border-bottom">
            <SoftTypography>Add new speciality</SoftTypography>
            <SoftButton onClick={() => setIsAddingDialogOpen(false)}> Close</SoftButton>
          </div>
          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="div" justifyContent="center" alignItems="center">
              <SoftBox mb={2}>
                <SoftInput
                  placeholder="Title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </SoftBox>

              <div className="d-flex flex-row align-items-center justify-content-between pt-3 border-top">
                <SoftButton onClick={() => setIsAddingDialogOpen(false)}>Cancel</SoftButton>

                <SoftButton onClick={handleAdding} disabled={!name} color="primary">
                  Add
                </SoftButton>
              </div>
            </SoftBox>
          </SoftBox>
        </DialogContent>
      </Dialog>
      <Footer />
    </DashboardLayout>
  );
}

export default Specialties;
