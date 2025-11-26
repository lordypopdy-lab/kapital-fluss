import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Button, Image } from "react-bootstrap";
import {
  User,
  CreditCard,
  Settings,
  LogOut,
  Bitcoin,
  UserCheck,
  Wallet2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useTonWallet, TonConnectButton } from "@tonconnect/ui-react";

const UserNav = () => {
  const wallet = useTonWallet();
  const [user, setUser] = useState({});

  if (!localStorage.getItem("user")) {
    window.location.href = "/login";
  }

  useEffect(() => {
    const newU = localStorage.getItem("user");
    const newUser = JSON.parse(newU);
    const email = newUser.email;
    const getU = JSON.parse(localStorage.getItem("user"));
    setUser(getU);

    const getUser = async () => {
      await axios.post("/getUser", { email }).then((data) => {
        if (data) {
          setUser(data.data);
        }
      });
    };
    getUser();
  }, []);

  const logout = async () => {
    localStorage.removeItem("user");
    location.href = "/login";
  };

  const copyToClipboard = (walletAddress) => {
    navigator.clipboard.writeText(walletAddress);
    toast.success(`Copied!`)
  };


  return (
    <Navbar
      style={{ position: "fixed", width: "100%", zIndex: "1", top: "0" }}
      expand="lg"
      className="bg-black text-light"
    >
      <Container fluid>
        <h4
          style={{ fontSize: "20px", marginLeft: "" }}
          className="display-4 mt-2 ls-3"
        >
          <Bitcoin style={{ color: "orange" }} /> Kapital-Fluss
        </h4>

        <Navbar.Toggle aria-controls="navbarScroll" />
         <Navbar.Collapse id="navbarScroll">
          <Nav
           className="d-block d-md-none"
            style={{ maxHeight: "250px" }}
            navbarScroll
          >
            <Nav.Link className="text-light" href="/dashboard">
              <User className="text-light" /> Dashboard
            </Nav.Link>
            <Nav.Link className="text-light" href="/deposit">
              <Wallet2 className="text-light" /> Deposit
            </Nav.Link>
            <Nav.Link className="text-light" href="/deposit">
              <UserCheck className="text-light" /> Profile
            </Nav.Link>
            <Nav.Link className="text-light" href="/withdraw">
              <CreditCard className="text-light" /> Withdraw
            </Nav.Link>
            <Nav.Link className="text-light" href="/profile">
              <Settings className="text-light" /> Account Settings
            </Nav.Link>
            <TonConnectButton>
              <Link to="#" className="text-decoration-none">
                <Button
                  variant="secondary"
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
            </TonConnectButton> 
            <Nav.Link className="text-light" onClick={logout} href="#">
              <LogOut className="text-danger m-1" />
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>


        <div className="d-none d-md-block">
        <Image
          src={user && user.profile_pic}
          roundedCircle
          width={46}
          height={46}
          className="mb-2"
          style={{ objectFit: "cover", marginRight: "9px", marginTop: "4px" }}
        />
        </div>
      </Container>
    </Navbar>
  );
};

export default UserNav;
