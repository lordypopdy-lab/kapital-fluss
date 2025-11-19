import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {
  LayoutDashboard,
  CircleArrowDown,
  CircleArrowUp,
  User,
  LogOut
} from "lucide-react";

const DashboardNav = () => {
  const { pathname } = useLocation();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/deposit", label: "Deposit", icon: CircleArrowDown },
    { to: "/withdraw", label: "Withdraw", icon: CircleArrowUp },
    { to: "/profile", label: "Profile", icon: User },
  ];

  const logout = async () => {
    localStorage.removeItem("user");
    location.href = "/login"
  }

  return (
    <nav className="d-flex bg-black flex-column gap-2 px-3">

      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.to;

        return (
          <Link key={item.to} to={item.to} className="text-decoration-none">
            <Button
              variant={active ? "secondary" : "outline-secondary"}
              className="w-100 d-flex align-items-center gap-2 justify-content-start border-0 text-light"
              style={{
                backgroundColor: active ? "#2a2a2a" : "transparent"
              }}
            >
              <Icon size={18} />
              {item.label}
            </Button>
          </Link>
        );
      })}

      <Link onClick={logout} className="text-decoration-none mt-2">
        <Button
          variant="outline-secondary"
          className="w-100 d-flex align-items-center gap-2 justify-content-start border-0 text-light"
        >
          <LogOut className="text-danger" size={18} />
          Logout
        </Button>
      </Link>

    </nav>
  );
};

export default DashboardNav;
