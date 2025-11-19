import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {
  LayoutDashboard,
  LogOut
} from "lucide-react";

const AdminDashboardNav = () => {
  const { pathname } = useLocation();

  const navItems = [
    { to: "#", label: "Dashboard", icon: LayoutDashboard },
  ];

  const logout = async () => {
    localStorage.removeItem("admin1");
    location.href = "/login-admin"
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

      <Link className="text-decoration-none mt-2">
        <Button
        onClick={logout}
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

export default AdminDashboardNav;
