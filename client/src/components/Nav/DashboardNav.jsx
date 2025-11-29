import React from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {
  LayoutDashboard,
  CircleArrowDown,
  CircleArrowUp,
  User,
  LogOut,
  MessageCircle,
  Wallet2,
} from "lucide-react";
import { useTonWallet, useTonConnectUI } from "@tonconnect/ui-react";

const DashboardNav = () => {
  const { pathname } = useLocation();
  const wallet = useTonWallet();

  const [tonConnectUI] = useTonConnectUI();

  const handleConnect = () => {
    tonConnectUI.connectWallet();
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/deposit", label: "Deposit", icon: CircleArrowDown },
    { to: "/withdraw", label: "Withdraw", icon: CircleArrowUp },
    { to: "/chat", label: "Chat", icon: MessageCircle },
    { to: "/profile", label: "Profile", icon: User },
  ];

  const logout = async () => {
    localStorage.removeItem("user");
    location.href = "/login";
  };

  const copyToClipboard = (walletAddress) => {
    navigator.clipboard.writeText(walletAddress);
    toast.success(`Copied!`)
  };

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
                backgroundColor: active ? "#2a2a2a" : "transparent",
              }}
            >
              <Icon size={18} />
              {item.label}
            </Button>
          </Link>
        );
      })}
      <Link to="#" className="text-decoration-none">
        <Button
          variant="secondary"
          onClick={handleConnect}
          className="w-100 d-flex align-items-center gap-2 justify-content-start border-0 text-light"
          style={{
            backgroundColor: "2a2a2a",
          }}
        >
          <Wallet2 style={{ color: "orange" }} />
          {wallet ? (
            <span onClick={()=>copyToClipboard(wallet.account.address)}>{wallet.account.address.slice(2, 12)}...</span>
          ) : (
            <span>Connect Wallet</span>
          )}
        </Button>
      </Link>

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
