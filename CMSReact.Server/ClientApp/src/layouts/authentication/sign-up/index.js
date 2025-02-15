import { useEffect, useState } from "react";
import axios from "utils/Axios"; // Adjust the path if needed
import { saveUser, getUserData } from "utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";

//   React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import DatePicker from "react-flatpickr";

function SignUp() {
  const [isDoctor, setIsDoctor] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");

  const [AllSpecialties, setAllSpecialties] = useState([]);

  // const [gender, setGender] = useState("");
  // const [type, setType] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  // const [phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");
  // const [fullName, setFullName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserData();
    if (user) {
      // navigate("/dashboard");
      window.location.replace("/dashboard");
    } else {
      fetchAllSpecialties();
    }
  }, []);

  const fetchAllSpecialties = async () => {
    try {
      const response = await axios.get("/api/specialties");
      setAllSpecialties(response?.data || []);
    } catch (error) {
      console.error("Fetching Users failed:", error);
    }
  };

  // const handleSetAgreement = () => setAgreement(!agreement);

  const handleSignUp = async () => {
    if (!username || !email || !password) return;

    const user = {
      username,
      email,
      password,
      isDoctor,
      ...(isDoctor ? { SpecialityId: specialty } : {}),
    };

    try {
      const response = await axios.post("/api/auth/register", user);

      if (response?.data?.id) {
        const user = response?.data;
        saveUser(user);
        toast(`Hi ${user.username}, You have signed up successfully`);
        // navigate("/profile");
        window.location.replace("/profile");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <div className="d-flex flex-row gap-2 align-items-center justify-content-center">
                <SoftTypography>Patient</SoftTypography>
                <Switch
                  value={isDoctor}
                  onChange={(e) => {
                    setIsDoctor(e.target.checked);
                  }}
                />
                <SoftTypography>Doctor</SoftTypography>
              </div>
            </SoftBox>
            {isDoctor ? (
              <SoftBox mb={2}>
                <select
                  className="form-select"
                  onChange={(e) => {
                    setSpecialty(e.target.value);
                  }}
                >
                  <option selected>Select Specialty</option>
                  {AllSpecialties.map((s) => {
                    return (
                      <option key={s.id} value={s.id} selected={specialty == s}>
                        {s.name}
                      </option>
                    );
                  })}
                </select>
              </SoftBox>
            ) : (
              <></>
            )}
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </SoftBox>
            {/* <SoftBox mb={2}>
              <select label="Gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option>male</option>
                <option>female</option>
              </select>
            </SoftBox>
            <SoftBox mb={2}>
              <select label="Type" value={type} onChange={(e) => setType(e.target.value)}>
                <option>Admin</option>
                <option>Patient</option>
                <option>Doctor</option>
              </select>
            </SoftBox> */}

            {/* <SoftBox mb={2}>
              <SoftInput
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput
                type="text"
                placeholder="FullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <input
                type="date"
                placeholder="DateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </SoftBox> */}

            {/* <SoftBox display="flex" alignItems="center">
              // <Checkbox checked={agreement} onChange={handleSetAgreement} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                // onClick={handleSetAgreement}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox> */}
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth onClick={handleSignUp}>
                sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
