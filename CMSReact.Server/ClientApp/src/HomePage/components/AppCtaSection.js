import { useEffect, useState } from "react";
import axios from "utils/Axios"; // Adjust the path if needed

// react-router-dom components
import { Link } from "react-router-dom";

// components
import Button from "react-bootstrap/Button";

import ctaBanner from "assets/images/cta-banner.png";
import checkIcon from "assets/images/check.gif";
import { Form } from "react-bootstrap";
import { getUserData } from "utils";
// import { Select, MenuItem } from "@mui/material";

function AppCtaSection(props) {
  // const [name, setName] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  // const [gender, setGender] = useState("");
  // const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  // const [address, setAddress] = useState("");
  const [appointmentDay, setAppointmentDay] = useState("2024-04-18");
  const [appointmentTime, setAppointmentTime] = useState("17:44");
  const [comment, setComment] = useState("");

  const [isBooked, setIsBooked] = useState(false);

  const [userData, setUserData] = useState();

  useEffect(() => {
    const user = getUserData();

    if (user) {
      setUserData(user);
    }
  }, []);

  const handleBooking = async () => {
    if (!userData?.username || !appointmentDay || !appointmentTime) return;

    try {
      const appointmentData = {
        UserId: userData.id,
        user: {
          ...userData,
          Type: "Patient",
          Gender: "male",
          Address: "lorem",
          FullName: "whatever",
          PasswordHash: "-",
        },
        userName: userData.username,
        time: appointmentTime,
        date: appointmentDay,
        appointment: {
          comment,
        },
      };

      const response = await axios.post("/api/appointments", appointmentData);

      if (response.status === 200) {
        setIsBooked(true);
        setTimeout(() => {
          setIsBooked(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      // Handle error here (e.g., display error message to user)
    }
  };

  return (
    <section className="section cta" id="cta" aria-label="cta">
      <div className="container">
        <figure className="cta-banner">
          <img
            src={ctaBanner}
            width="1056"
            height="1076"
            loading="lazy"
            alt="cta banner"
            className="w-100"
          />
        </figure>

        <div className="cta-content">
          <p className="section-subtitle">Book Appointment</p>

          <h2 className="h2 section-title">
            {userData?.username ? `Hi ${userData.username}, ` : ""}
            We Are open And Welcoming Patients
          </h2>

          <article className="d-flex flex-column ">
            {isBooked ? (
              <div className="w-100 d-flex justify-content-center flex-column align-items-center bg-white border p-4  text-center rounded">
                <img width="50" height="50" src={checkIcon} alt="instagram-check-mark" />
                <p className="text-dark mt-3" style={{ fontSize: "16px" }}>
                  Thanks for booking. We are looking forward to seeing you soon.
                </p>
              </div>
            ) : (
              <div className="gap-3 mb-3">
                {!userData?.username ? (
                  <>
                    <p className="text-dark mt-3" style={{ fontSize: "16px" }}>
                      Hi, You need to sign in or sign up first to book an appointment.
                      <a href="/sign-in" className="btn">
                        Sign in
                      </a>
                      <a href="/sign-up" className="btn">
                        Sign Up
                      </a>
                    </p>
                  </>
                ) : (
                  <>
                    <div className="row mb-3">
                      {/* <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} /> */}
                      {/* <Input
                    label="Date of Birth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  /> */}
                      {/* <Select label="Gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option className="text-dark">Gender</option>
                    <option value="male" className="text-dark">
                      Male
                    </option>
                    <option value="female" className="text-dark">
                      Female
                    </option>
                  </Select> */}

                      {/* <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} /> */}
                      {/* <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
                      {/* <Input
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  /> */}
                      <Input
                        label="Day"
                        type="date"
                        value={appointmentDay}
                        onChange={(e) => setAppointmentDay(e.target.value)}
                      />
                      <Input
                        label="Time"
                        type="time"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                      />
                    </div>
                    <TextArea
                      label="Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </>
                )}
              </div>
            )}

            {userData?.username && (
              <button className="btn btn-primary py-4 mt-3" onClick={handleBooking}>
                Book
              </button>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}

const Input = (props) => {
  const { label, value, onChange, theme = "dark", type = "text" } = props;
  const id = label.replace(" ", "").toLowerCase();
  return (
    <div className="col-md-6 mb-3" data-bs-theme={theme}>
      <label htmlFor={id} className="form-label text-light">
        {label}
      </label>
      <input
        type={type}
        placeholder={label}
        id={id}
        className="border p-2 py-3 form-control"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const Select = (props) => {
  const { label, value, onChange, theme = "dark", type = "text", children } = props;
  const id = label.replace(" ", "").toLowerCase();
  return (
    <div className="col-md-6 mb-3" data-bs-theme={theme}>
      <label htmlFor={id} className="form-label text-light">
        {label}
      </label>
      <Form.Select
        label={label}
        value={value}
        onChange={onChange}
        className="border p-2 py-4 form-control bg-transparent text-lg cursor-pointer"
      >
        {children}
      </Form.Select>
    </div>
  );
};

const TextArea = (props) => {
  const { label, value, onChange, theme = "dark" } = props;
  const id = label.replace(" ", "").toLowerCase();
  return (
    <div className="flex-fill" data-bs-theme={theme}>
      <label htmlFor={id} className="form-label text-light">
        {label}
      </label>
      <textarea
        className="form-control bg-transparent"
        placeholder="Leave a comment here"
        id={id}
        style={{ fontSize: "16px" }}
        onChange={onChange}
      >
        {value}
      </textarea>
    </div>
  );
};

export default AppCtaSection;
