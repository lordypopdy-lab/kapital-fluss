import React from "react";
import axios from "axios";
import UserNav from "./UserNav";
import DashboardNav from "./DashboardNav";
import { useEffect, useState } from "react";
import Dashboard from "../../pages/Dashboard";

import { UserCheck2 } from "lucide-react";

const DashboardLayout = () => {
  const [userVerification, setVerificationStatus] = useState({});

  useEffect(() => {
    const newU = localStorage.getItem("user");
    const newUser = JSON.parse(newU);
    const email = newUser.email;

    const getUserVerification = async () => {
      try {
        const response = await axios.post("/getUserVerification", { email });

        if (response.data.status === "success") {
          console.log("User verification:", response.data.data);
          setVerificationStatus(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserVerification();
  }, []);
  return (
    <div className="d-flex flex-column min-vh-100 dark">
      {/* ---------- HEADER ---------- */}
      <UserNav />

      {/* ---------- BODY ---------- */}
      <div style={{ marginTop: "70px" }} className="d-flex flex-grow-1">
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
              {userVerification.kycStatus === "Approved" ? (
                <h6 className="text-success">
                  Verified
                  <UserCheck2
                    style={{ marginBottom: "12px" }}
                    className="text-success"
                  />
                </h6>
              ) : userVerification.kycStatus === "Inreview" ? (
                <h6 className="text-warning">Inreview</h6>
              ) : (
                <h6 className="text-danger">Unverified</h6>
              )}
            </div>

            <div style={{ marginTop: "-10px" }} className="flex-grow-1">
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
