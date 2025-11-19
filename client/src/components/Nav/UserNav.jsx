import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { User, CreditCard, Settings, LogOut } from "lucide-react";

import { useEffect, useState } from "react";

const UserNav = () => {
  const [user, setUser] = useState({});

  if (!localStorage.getItem("user")) {
    window.location.href = "/login-admin";
  }

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user"));
    setUser(getUser);
  }, []);

  const logout = async () => {
    localStorage.removeItem("user");
    location.href = "/login-admin"
  }

  return (
    <Dropdown align="end">
      {/* Avatar Button */}
      <Dropdown.Toggle
        variant="dark"
        className="p-0 border-0 rounded-circle"
        style={{
          width: "42px",
          height: "42px",
          overflow: "hidden",
        }}
      >
        <img
          src="/placeholder.svg"
          alt="Avatar"
          className="img-fluid rounded-circle"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Dropdown.Toggle>

      {/* Menu */}
      <Dropdown.Menu
        className="bg-dark text-light shadow"
        style={{
          width: "230px",
          borderRadius: "10px",
          border: "1px solid #333",
        }}
      >
        {/* User Info Section */}
        <div className="px-3 py-3 border-bottom border-secondary">
          <p className="text-light fw-semibold mb-0">{ user && user.name }</p>
          <p className="text-warning small mb-0">john.doe@example.com</p>
        </div>

        {/* Menu Items */}
        <Dropdown.Item
          as={Link}
          to="/profile"
          className="text-light d-flex align-items-center gap-2 py-2"
        >
          <User size={16} /> Profile
        </Dropdown.Item>

        <Dropdown.Item
          as={Link}
          to="/transactions"
          className="text-light d-flex align-items-center gap-2 py-2"
        >
          <CreditCard size={16} /> Transactions
        </Dropdown.Item>

        <Dropdown.Item
          as={Link}
          to="/settings"
          className="text-light d-flex align-items-center gap-2 py-2"
        >
          <Settings size={16} /> Settings
        </Dropdown.Item>

        <Dropdown.Divider className="border-secondary" />

        {/* Log Out */}
        <Dropdown.Item
          as={Link}
          onClick={logout}
          className="text-light d-flex align-items-center gap-2 py-2"
        >
          <LogOut size={16} /> Log out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserNav;
