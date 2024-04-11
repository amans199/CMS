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

export const getColorOfStatus = (status) => {
  return {
    Approved: "success",
    Pending: "warning",
    Rejected: "danger",
  }[status];
};
