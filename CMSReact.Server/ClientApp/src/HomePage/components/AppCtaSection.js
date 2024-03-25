import { useState } from "react";
import axios from "utils/Axios"; // Adjust the path if needed

// react-router-dom components
import { Link } from "react-router-dom";

// components
import Button from "react-bootstrap/Button";

import ctaBanner from "assets/images/cta-banner.png";
import checkIcon from "assets/images/check.gif";

function AppCtaSection(props) {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [appointmentDay, setAppointmentDay] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [comment, setComment] = useState("");

  const [isBooked, setIsBooked] = useState(false);
  const handleBooking = () => {
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
    }, 5000);
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
          <p className="section-subtitle">Book Dentail Appointment</p>

          <h2 className="h2 section-title">We Are open And Welcoming Patients</h2>

          <article className="d-flex flex-column align-items-end">
            {isBooked ? (
              <div className="w-100 d-flex justify-content-center flex-column align-items-center bg-white border p-4  text-center rounded">
                <img width="50" height="50" src={checkIcon} alt="instagram-check-mark" />
                <p className="text-dark mt-3" style={{ fontSize: "16px" }}>
                  Thanks for booking. We are looking forward to seeing you soon.
                </p>
              </div>
            ) : (
              <div className="gap-3 mb-3">
                <div className="row mb-3">
                  <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                  <Input
                    label="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Input
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
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
              </div>
            )}

            <button className="btn btn-primary py-4 mt-3" onClick={handleBooking}>
              Book
            </button>
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
