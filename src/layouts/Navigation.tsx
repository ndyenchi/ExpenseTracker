import { IconHome, IconPlus, IconList, IconChartPie } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "@mantine/core";

const navItems = [
  { icon: IconHome, label: "Dashboard", to: "/" },
  { icon: IconPlus, label: "Add Expense", to: "/add" },
  { icon: IconList, label: "Expenses", to: "/expenses" },
  { icon: IconChartPie, label: "Statistics", to: "/stats" },
];

export const Navigation = ({ close }: { close: () => void }) => {
  const location = useLocation();

  return (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          component={Link}
          to={item.to}
          label={item.label}
          leftSection={<item.icon size={20} stroke={1.5} />}
          active={location.pathname === item.to}
          onClick={close}
          variant="light"
          mb={4}
          style={{ borderRadius: "var(--mantine-radius-md)" }}
        />
      ))}
    </>
  );
};
