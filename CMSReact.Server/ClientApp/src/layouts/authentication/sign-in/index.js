import { useEffect, useState } from "react";
import axios from "utils/Axios"; // Adjust the path if needed
import { saveUser, getUserData } from "utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

//   React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserData();
    if (user) {
      // navigate("/dashboard");
      window.location.replace("/dashboard");
    }
  }, []);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSignIn = async () => {
    if (!email || !password) return;

    const user = {
      email,
      password,
    };

    try {
      const response = await axios.post("/api/auth/login", user);

      if (response?.data?.id) {
        const user = response?.data;
        saveUser(user);
        toast(`Hi ${user.username}, You have logged in successfully`);
        // navigate("/dashboard");
        window.location.replace("/dashboard");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth onClick={handleSignIn}>
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
