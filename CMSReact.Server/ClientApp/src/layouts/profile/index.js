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
import ProfilesList from "examples/Lists/ProfilesList";
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
import { useEffect, useState } from "react";
import { getUserData } from "utils";
import axios from "utils/Axios";
function Overview() {
  const [userAppointments, setUserAppointments] = useState([]);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const user = getUserData();
    setUserData(user);
  }, []);

  const fetchUserAppointments = async () => {
    try {
      const response = await axios.get(`/api/appointments/user/${userData.username}`);
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
                type: userData.type,
                createdAt: userData.createdAt,
              }}
              social={[
                {
                  link: "https://www.facebook.com/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
          {/* <Grid item xs={12} xl={4}>
            <ProfilesList title="conversations" profiles={profilesListData} />
          </Grid> */}
        </Grid>
      </SoftBox>
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
              {userAppointments.map((appointment) => (
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
              ))}

              <Grid item xs={12} md={6} xl={3}>
                <PlaceholderCard title={{ variant: "h5", text: "Add Appointment" }} outlined />
              </Grid>
            </Grid>
          </SoftBox>
        </Card>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
