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

const routes = [
  {
    type: "hide",
    name: "Home",
    key: "home",
    route: "/",
    component: <Home />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Appointments",
    key: "appointments",
    route: "/appointments",
    icon: <Office size="12px" />,
    component: <Appointments />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    route: "/users",
    icon: <Cube size="12px" />,
    component: <Users />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Invoices",
    key: "invoices",
    route: "/invoices",
    icon: <Document size="12px" />,
    component: <Invoices />,
    noCollapse: true,
  },
  { type: "title", title: "Settings", key: "settings-pages" },
  {
    type: "collapse",
    name: "Specialties",
    key: "specialties",
    route: "/specialties",
    icon: <Document size="12px" />,
    component: <Specialties />,
    noCollapse: true,
  },
  {
    type: "hide",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "hide",
    name: "Profile",
    key: "profile",
    route: "/user/:userId",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "hide",
    name: "Sign In",
    key: "sign-in",
    route: "/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "hide",
    name: "Sign Up",
    key: "sign-up",
    route: "/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
];

export default routes;
