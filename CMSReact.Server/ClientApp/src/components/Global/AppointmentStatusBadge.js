import { getColorOfUser, getAppointmentStatus } from "utils";
import SoftBadge from "components/SoftBadge";

// Images
import { getColorOfStatus } from "utils";

const AppointmentStatusBadge = ({ status }) => {
  return (
    <SoftBadge
      variant="gradient"
      badgeContent={getAppointmentStatus(status)}
      color={getColorOfStatus(status)}
      size="xs"
      container
    />
  );
};

export default AppointmentStatusBadge;
