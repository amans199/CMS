// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import Invoice from "./Invoice";
import SoftButton from "components/SoftButton";
import { useEffect, useState } from "react";
import axios from "utils/Axios";

function Invoices() {
  const [allInvoices, setAllInvoices] = useState([]);

  useEffect(() => {
    fetchAllInvoices();
  }, []);

  const fetchAllInvoices = async () => {
    try {
      const response = await axios.get("/api/invoices");
      setAllInvoices(response?.data || []);
    } catch (error) {
      console.error("Fetching Specialties failed:", error);
    }
  };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
          <Card>
            <SoftBox
              pt={2}
              px={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <SoftTypography variant="h6" fontWeight="medium">
                Invoices
              </SoftTypography>
              {/* <SoftButton variant="outlined" color="info" size="small">
                view all
              </SoftButton> */}
            </SoftBox>
            <SoftBox p={2}>
              <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                {allInvoices.map((invoice, index) => (
                  <Invoice
                    key={invoice.id}
                    invoice={invoice}
                    noGutter={index === allInvoices.length - 1}
                    // date="March, 01, 2020"
                    // id="#MS-415646"
                    // price="$180"
                  />
                ))}
                {/* <Invoice date="February, 10, 2021" id="#RV-126749" price="$250" />
                <Invoice date="April, 05, 2020" id="#QW-103578" price="$120" />
                <Invoice date="June, 25, 2019" id="#MS-415646" price="$180" />
                <Invoice date="March, 01, 2019" id="#AR-803481" price="$300" noGutter /> */}
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default Invoices;
