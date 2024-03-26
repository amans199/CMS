/* eslint-disable react/prop-types */
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

function Function({ job, org }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {job}
      </SoftTypography>
      <SoftTypography variant="caption" color="secondary">
        {org}
      </SoftTypography>
    </SoftBox>
  );
}

function History() {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" color="secondary">
        History
      </SoftTypography>
    </SoftBox>
  );
}

const authorsTableData = {
  columns: [
    { name: "patient", align: "left" },
    { name: "doctor", align: "left" },
    { name: "status", align: "center" },
    { name: "date", align: "center" },
    { name: "history", align: "center" },
    { name: "paid", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      patient: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
      doctor: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
      function: <Function job="Manager" org="Organization" />,
      paid: (
        <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      status: (
        <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      date: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          23/04/18
        </SoftTypography>
      ),
      history: <History />,
      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </SoftTypography>
      ),
    },
    {
      patient: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
      doctor: <Author image={team3} name="Alexa Liras" email="alexa@creative-tim.com" />,
      function: <Function job="Programator" org="Developer" />,
      paid: (
        <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      status: (
        <SoftBadge
          variant="gradient"
          badgeContent="offline"
          color="secondary"
          size="xs"
          container
        />
      ),
      date: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          11/01/19
        </SoftTypography>
      ),
      history: <History />,
      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </SoftTypography>
      ),
    },
    {
      patient: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
      doctor: <Author image={team4} name="Laurent Perrier" email="laurent@creative-tim.com" />,
      function: <Function job="Executive" org="Projects" />,
      paid: (
        <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      status: (
        <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      date: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          19/09/17
        </SoftTypography>
      ),
      history: <History />,
      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </SoftTypography>
      ),
    },
    {
      patient: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
      doctor: <Author image={team3} name="Michael Levi" email="michael@creative-tim.com" />,
      function: <Function job="Programator" org="Developer" />,
      paid: (
        <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      status: (
        <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      date: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          24/12/08
        </SoftTypography>
      ),
      history: <History />,
      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </SoftTypography>
      ),
    },
    {
      patient: <Author image={team2} name="Richard Gran" email="richard@creative-tim.com" />,
      doctor: <Author image={team2} name="Richard Gran" email="richard@creative-tim.com" />,
      function: <Function job="Manager" org="Executive" />,
      paid: (
        <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      status: (
        <SoftBadge
          variant="gradient"
          badgeContent="offline"
          color="secondary"
          size="xs"
          container
        />
      ),
      date: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          04/10/21
        </SoftTypography>
      ),
      history: <History />,
      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </SoftTypography>
      ),
    },
    {
      patient: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
      doctor: <Author image={team4} name="Miriam Eric" email="miriam@creative-tim.com" />,
      function: <Function job="Programtor" org="Developer" />,
      paid: (
        <SoftBadge variant="gradient" badgeContent="online" color="success" size="xs" container />
      ),
      status: (
        <SoftBadge
          variant="gradient"
          badgeContent="offline"
          color="secondary"
          size="xs"
          container
        />
      ),
      date: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          14/09/20
        </SoftTypography>
      ),
      history: <History />,
      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </SoftTypography>
      ),
    },
  ],
};

export default authorsTableData;
