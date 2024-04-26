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
