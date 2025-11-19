import React from "react";
import { Link } from "react-router-dom";
import { Bitcoin } from "lucide-react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import UserNav from "./UserNav";
import DashboardNav from "./DashboardNav";
import { useEffect, useState } from "react";
import Dashboard from "../../pages/Dashboard";

const DashboardLayout = () => {

  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user"));
    setUser(getUser);
  }, []);
  return (
    <div className="d-flex flex-column min-vh-100 dark">
      {/* ---------- HEADER ---------- */}
      <Navbar
        expand="sm"
        className="sticky-top z-10 border-bottom bg-black px-3"
        style={{ height: "64px" }}
      >
        <Navbar.Brand
          as={Link}
          to="/dashboard"
          className="d-flex align-items-center gap-2 fw-semibold"
        >
          <Bitcoin className="h-6 w-6" style={{color: "orange"}} />
          <span className="text-light">BitRadex</span>
        </Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center gap-4">
        <h6 className="text-light">Welcome Back <span className="text-warning">-</span> <span className="text-light">{user && user.name}!</span> </h6>
          <UserNav />
        </Nav>
      </Navbar>

      {/* ---------- BODY ---------- */}
      <div className="d-flex flex-grow-1">
        {/* ---------- SIDEBAR ---------- */}
        <aside
          className="d-none d-md-block border-end bg-muted-40"
          style={{ width: "260px" }}
        >
          <div className="d-flex flex-column h-100 py-2 gap-2">
            <div className="px-4 py-2">
              <h2 className="text-light fs-5 fw-semibold mb-1">Dashboard</h2>
              <p className="bitradex-text-muted small mb-0">
                Manage your crypto investments
              </p>
            </div>

            <div style={{marginTop: "-10px"}} className="flex-grow-1">
              <DashboardNav />
            </div>
          </div>
        </aside>

        {/* ---------- MAIN CONTENT ---------- */}
        <main className="flex-grow-1 p-4 p-md-5">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
