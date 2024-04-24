import { useEffect, useState } from "react";
import { getUserData } from "utils";
import axios from "utils/Axios";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "./components/Header";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { toast } from "react-toastify";
import { formatDate } from "utils";
function Overview() {
  const [userAppointments, setUserAppointments] = useState([]);
  const [userData, setUserData] = useState();
  const [isUserDialogOpen, setIsUserDialogOpen] = useState();

  let { userId } = useParams();

  useEffect(() => {
    const user = getUserData();
    // setUserData(user);
    fetchUserData(userId ? userId : user.id);
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch user appointments:", error);
    }
  };

  const fetchUserAppointments = async () => {
    try {
      const response = await axios.get(`/api/appointments/user/${userId ? userId : userData.id}`);
      setUserAppointments(response.data);
    } catch (error) {
      console.error("Failed to fetch user appointments:", error);
    }
  };
  useEffect(() => {
    if (userData) {
      fetchUserAppointments();
    }
  }, [userData]);

  const handleEditingProfile = () => {
    setIsUserDialogOpen(true);
  };

  if (!userData) return;

  return (
    <DashboardLayout>
      <Header user={userData} />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={6} xl={4}>
            <PlatformSettings />
          </Grid> */}

          <Grid item xs={12} md={6} xl={4}>
            {/* /** address appointments createdAt dateOfBirth email fullName gender id isAdmin */}
            {/* isApproved isDoctor passwordHash phone specialityId username */}
            <ProfileInfoCard
              title="profile information"
              description="Hi"
              info={{
                username: userData.username,
                fullName: userData.fullName,
                gender: userData.gender,
                phone: userData.phone,
                email: userData.email,
                address: userData.address,
                address: userData.dateOfBirth,
                createdAt: formatDate(userData.createdAt),
              }}
              social={[]}
              action={{ onClick: handleEditingProfile, tooltip: "Edit Profile" }}
            />
          </Grid>
          {/* <Grid item xs={12} xl={4}>
            <ProfilesList title="conversations" profiles={profilesListData} />
          </Grid> */}
        </Grid>
      </SoftBox>
      {userData.isApproved ? (
        <SoftBox mb={3}>
          <Card>
            <SoftBox pt={2} px={2}>
              <SoftBox mb={0.5}>
                <SoftTypography variant="h6" fontWeight="medium">
                  Appointments
                </SoftTypography>
              </SoftBox>
            </SoftBox>
            <SoftBox p={2}>
              <Grid container spacing={3}>
                {/* {userAppointments.map((appointment) => (
                <Grid key={appointment.id} item xs={12} md={6} xl={3}>
                  <DefaultProjectCard
                    // image={team3}
                    label={`Appointment #${appointment.id}`}
                    title={`${appointment.date} - ${appointment.time}`}
                    // description={`${appointment.date} - ${appointment.time}`}
                    description={appointment.comment || "-"}
                    // action={{
                    //   type: "internal",
                    //   route: `/appointment/${appointment.id}`, // Link to appointment details page
                    //   color: "info",
                    //   label: "View Appointment",
                    // }}
                    // authors={[
                    //   { image: appointment.authorImage, name: appointment.authorName },
                    //   // Include additional authors as needed
                    // ]}
                  />
                </Grid>
              ))} */}

                <Grid item xs={12} md={6} xl={3}>
                  <PlaceholderCard title={{ variant: "h5", text: "Add Appointment" }} outlined />
                </Grid>
              </Grid>
            </SoftBox>
          </Card>
        </SoftBox>
      ) : (
        <></>
      )}

      <EditProfileDialog
        isUserDialogOpen={isUserDialogOpen}
        setIsUserDialogOpen={setIsUserDialogOpen}
        userData={userData}
        fetchUserData={fetchUserData}
      />

      <Footer />
    </DashboardLayout>
  );
}

const EditProfileDialog = ({ isUserDialogOpen, setIsUserDialogOpen, userData, fetchUserData }) => {
  const [dateOfBirth, setDateOfBirth] = useState(userData.dateOfBirth);
  const [fullName, setFullName] = useState(userData.fullName);
  const [gender, setGender] = useState(userData.gender);
  const [phone, setPhone] = useState(userData.phone);
  const [address, setAddress] = useState(userData.address);
  const [profilePicture, setProfilePicture] = useState(userData.profilePicture);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result;
      // Set the base64String to your state variable or update the request body
      setProfilePicture(base64String);
    };
  };

  const handleUpdatingProfile = async () => {
    const response = await axios.put(`/api/users/update/${userData.id}`, {
      dateOfBirth,
      fullName,
      gender,
      phone,
      address,
      profilePicture,
    });

    if (response) {
      const data = response.data.value;
      setIsUserDialogOpen(false);
      toast.success(`Profile has been updated correctly`);
      fetchUserData(userData.id);
    } else {
      console.error("Failed to update profile");
    }
  };

  return (
    <Dialog open={isUserDialogOpen}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        {/* No need for DialogContentText in this case */}
        <SoftBox mt={2} mb={3} px={3}>
          <SoftBox mb={2}>
            <SoftTypography variant="body2">Full Name:</SoftTypography>
            <SoftInput value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </SoftBox>

          <SoftBox mb={2}>
            <SoftTypography variant="body2">Date of Birth:</SoftTypography>
            <SoftInput
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </SoftBox>

          <SoftBox mb={2}>
            <SoftTypography variant="body2">Gender:</SoftTypography>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </SoftBox>

          <SoftBox mb={2}>
            <SoftTypography variant="body2">Phone Number:</SoftTypography>
            <SoftInput value={phone} onChange={(e) => setPhone(e.target.value)} />
          </SoftBox>

          <SoftBox mb={2}>
            <SoftTypography variant="body2">Address:</SoftTypography>
            <SoftInput
              multiline
              rows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </SoftBox>

          <SoftBox mb={2}>
            <SoftTypography variant="body2">Profile Picture:</SoftTypography>
            {profilePicture ? (
              <img src={profilePicture} height="100" alt="" style={{ maxWidth: "150px" }} />
            ) : (
              ""
            )}
            <input type="file" onChange={(e) => handleProfilePictureChange(e)} />
          </SoftBox>

          <SoftBox mt={4} display="flex" justifyContent="space-between">
            <SoftButton onClick={() => setIsUserDialogOpen(false)}>Cancel</SoftButton>
            <SoftButton
              variant="contained"
              color="primary"
              onClick={handleUpdatingProfile}
              disabled={!fullName || !dateOfBirth || !gender || !phone || !address}
            >
              Update Profile
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </DialogContent>
    </Dialog>
  );
};

export default Overview;
