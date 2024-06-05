import { useEffect, useState } from "react";
import { getUserData } from "utils";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import axios from "utils/Axios";

function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState();

  useEffect(() => {
    const user = getUserData();
    if (!user) {
      navigate("/sign-in");
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("/api/dashboard");
      console.log(
        "🚀 ~ fetchDashboardData ~ response:",
        response?.data?.value?.invoiceCharts.totalAmountChart
      );
      setDashboardData(response?.data?.value);
    } catch (error) {
      console.error("Fetching dashboard data failed:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      {!dashboardData?.userCounts ? (
        <></>
      ) : (
        <>
          <SoftBox py={3}>
            <SoftBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} xl={3}>
                  <MiniStatisticsCard
                    title={{ text: "Total Users" }}
                    count={dashboardData?.userCounts?.TotalUsers}
                    icon={{ color: "info", component: "people" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={3}>
                  <MiniStatisticsCard
                    title={{ text: "Approved Users" }}
                    count={dashboardData?.userCounts?.Approved}
                    icon={{ color: "info", component: "people" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={3}>
                  <MiniStatisticsCard
                    title={{ text: "Pending Users" }}
                    count={dashboardData?.userCounts?.Pending}
                    icon={{ color: "info", component: "people" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={3}>
                  <MiniStatisticsCard
                    title={{ text: "Rejected Users" }}
                    count={dashboardData?.userCounts?.Rejected}
                    icon={{ color: "info", component: "people" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={3}>
                  <MiniStatisticsCard
                    title={{ text: "Doctors" }}
                    count={dashboardData?.userCounts?.Doctors}
                    icon={{ color: "info", component: "people" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} xl={3}>
                  <MiniStatisticsCard
                    title={{ text: "Patients" }}
                    count={dashboardData?.userCounts?.Patients}
                    icon={{ color: "info", component: "people" }}
                  />
                </Grid>
              </Grid>
            </SoftBox>
            <SoftBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={7}>
                  <ReportsBarChart
                    title="Analytics"
                    chart={dashboardData?.invoiceCharts.totalAmountChart.chart}
                    items={[
                      {
                        icon: { color: "info", component: "touch_app" },
                        label: "Appointments",
                        progress: {
                          content: dashboardData?.appointments.length,
                        },
                      },
                      {
                        icon: { color: "warning", component: "payment" },
                        label: "Income",
                        progress: {
                          content: `${dashboardData?.totalAmountInInvoices} EGP`,
                        },
                      },
                      {
                        icon: { color: "error", component: "extension" },
                        label: "Specialities",
                        progress: { content: dashboardData?.specialities.length },
                      },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} lg={5}>
                  <GradientLineChart
                    title="Invoices / Month"
                    description={<SoftBox display="flex" alignItems="center"></SoftBox>}
                    height="20.25rem"
                    chart={dashboardData?.invoiceCharts.invoiceCountChart}
                  />
                </Grid>
              </Grid>
            </SoftBox>
          </SoftBox>
        </>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
