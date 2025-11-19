import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { User, CreditCard, Settings, LogOut } from "lucide-react";

const AdminUserNav = () => {

  if (!localStorage.getItem("admin1")) {
    window.location.href = "/login-admin";
}

const logout = async () => {
  localStorage.removeItem("admin1");
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
          <p className="text-light fw-semibold mb-0">John Doe</p>
          <p className="text-muted small mb-0">john.doe@example.com</p>
        </div>

        {/* Log Out */}
        <Dropdown.Item
          as={Link}
        onClick={logout}
          className="text-light d-flex align-items-center gap-2 py-2"
        >
          <LogOut  size={16} /> Log out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AdminUserNav;
