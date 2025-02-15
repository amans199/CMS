// BELOW will be temporary to not waste time on creating the AUTH module in the backend
export const saveUser = (userData) => {
  const user = JSON.stringify(userData);
  localStorage.setItem("user", user);
};

// BELOW will be temporary to not waste time on creating the AUTH module in the backend
export const removeCurrentUser = () => {
  localStorage.removeItem("user");
};

// BELOW will be temporary to not waste time on creating the AUTH module in the backend
export const getUserData = () => {
  const user = localStorage.getItem("user");
  if (!user) return false;
  return JSON.parse(user);
};

export const isLoggedIn = () => {
  const user = localStorage.getItem("user");
  return !!user;
};

export const getColorOfUser = (type) => {
  return {
    Doctor: "primary",
    Patient: "blue",
    Admin: "dark",
  }[type];
};

export const getColorOfStatus = (key) => {
  return {
    Approved: "success",
    Pending: "warning",
    Rejected: "error",
    Done: "dark",
  }[getAppointmentStatus(key)];
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString();
  return formattedDate;
};

export const getAppointmentStatus = (key) => {
  return ["Pending", "Approved", "Rejected", "Done"][key];
};

export const toDateInputValue = (dateObject) => {
  const local = new Date(dateObject);
  local.setMinutes(dateObject.getMinutes() - dateObject.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

export const formatTimeTo12Hour = (time24) => {
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12; // 0 should be converted to 12
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours12}:${formattedMinutes} ${period}`;
};

export const isTimeSlotAvailable = (doctor, selectedDate, selectedTime) => {
  if (!doctor || !selectedDate || !selectedTime) return false;

  const selectedDay = new Date(selectedDate).toLocaleString("en-US", { weekday: "long" });
  const selectedTimeInMinutes = convertTimeToMinutes(selectedTime);

  if (!doctor?.availableWeekDays?.includes(selectedDay)) {
    return false;
  }

  const availableTimeFromInMinutes = convertTimeToMinutes(doctor.availableTimeFrom);
  const availableTimeToInMinutes = convertTimeToMinutes(doctor.availableTimeTo);

  return (
    selectedTimeInMinutes >= availableTimeFromInMinutes &&
    selectedTimeInMinutes <= availableTimeToInMinutes
  );
};

export const convertTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};
