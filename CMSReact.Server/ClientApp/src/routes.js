//   React layouts
import Home from "./HomePage/HomePage";
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import Appointments from "layouts/appointments";
import Invoices from "layouts/invoices";
import Users from "layouts/users";
import Specialties from "layouts/specialties";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

//   React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";
import SpaceShip from "examples/Icons/SpaceShip";
import { getUserData } from "utils";

// allowedRoles:
// ["all"] : All Roles
// [] : None
// ["Patient"] : Patient
// ["Doctor"] : Doctor
// Admin is allowed in all

const routes = [
  {
    type: "hide",
    name: "Home",
    key: "home",
    route: "/",
    component: <Home />,
    allowedRoles: ["all"],
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
    allowedRoles: ["user"],
  },
  {
    type: "collapse",
    name: "Appointments",
    key: "appointments",
    route: "/appointments",
    icon: <Office size="12px" />,
    component: <Appointments />,
    noCollapse: true,
    allowedRoles: ["approved_user"],
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    route: "/users",
    icon: <Cube size="12px" />,
    component: <Users />,
    noCollapse: true,
    allowedRoles: [],
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: <Billing />,
  //   noCollapse: true,
  //   allowedRoles: ["approved_user"],
  // },
  // {
  //   type: "collapse",
  //   name: "Invoices",
  //   key: "invoices",
  //   route: "/invoices",
  //   icon: <Document size="12px" />,
  //   component: <Invoices />,
  //   noCollapse: true,
  //   allowedRoles: ["approved_user"],
  // },
  { type: "title", title: "Settings", key: "settings-pages" },
  {
    type: "collapse",
    name: "Specialties",
    key: "specialties",
    route: "/specialties",
    icon: <Document size="12px" />,
    component: <Specialties />,
    noCollapse: true,
    allowedRoles: [],
  },
  {
    type: "hide",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
    allowedRoles: ["user"],
  },
  {
    type: "hide",
    name: "user",
    key: "user",
    route: "/user/:userId",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
    allowedRoles: [],
  },
  {
    type: "hide",
    name: "Sign In",
    key: "sign-in",
    route: "/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
    allowedRoles: ["all"],
  },
  {
    type: "hide",
    name: "Sign Up",
    key: "sign-up",
    route: "/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
    allowedRoles: ["all"],
  },
];

const checkIsAuthorized = (route) => {
  if (route?.allowedRoles?.includes("all")) return true;

  const userData = getUserData();
  const isSignedIn = userData?.id;
  // if (!userData) {
  //   if (
  //     window.location.pathname !== "/sign-up" ||
  //     window.location.pathname !== "/sign-in" ||
  //     window.location.pathname !== "/"
  //   )
  //     window.location.replace("/sign-in");

  //   return false;
  // }

  if (!isSignedIn) return false;

  if (route?.allowedRoles?.includes("user")) return true;

  const isDoctor = userData.isDoctor;
  const isAdmin = userData.isAdmin;
  const isApproved = userData.status === "Approved";

  if (isAdmin) return true;

  console.log("🚀 ~ checkIsAuthorized ~ isApproved:", isApproved);
  if (!isApproved) {
    // if (window.location.pathname !== "/profile") window.location.replace("/profile");
    return route.key === "profile";
  }

  if (route?.allowedRoles?.includes("approved_user")) return true;

  // if()
  // if (userData.status === 'pending') return 'pending'; // Pending user can only see profile
  // return userData.isDoctor ? 'doctor' : 'patient'; // Approved with role flag

  return false;
};

const authorizedRoutes = routes.filter(checkIsAuthorized);

console.log({ routes, authorizedRoutes: authorizedRoutes });

export default authorizedRoutes;
