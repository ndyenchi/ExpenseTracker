import { NavLink } from "@mantine/core";
import { IconChartPie, IconHome, IconList } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: IconHome, label: "Tổng quan", to: "/" },
  { icon: IconList, label: "Giao dịch", to: "/expenses" },
  { icon: IconChartPie, label: "Thống kê", to: "/stats" },
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
