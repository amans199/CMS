import { getColorOfUser } from "utils";

import SoftBadge from "components/SoftBadge";

function Type({ content, color}) {
  return (
    <SoftBadge
      variant="gradient"
      badgeContent={type}
      color={getColorOfUser(type)}
      size="xs"
      container
    />
  );
}

export default Type;
