import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  User,
  CreditCard,
  Settings,
  LogOut,
  Bitcoin,
  Contact,
  Wallet2,
} from "lucide-react";

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
    location.href = "/login-admin";
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
          <Bitcoin style={{ color: "orange" }} /> BitRadex
        </h4>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "250px" }}
            navbarScroll
          >
            <Nav.Link className="text-light" href="/dashboard">
              <User className="text-light" /> Dashboard
            </Nav.Link>
            <Nav.Link className="text-light" href="/deposit">
              <Wallet2 className="text-light" /> Deposit
            </Nav.Link>
            <Nav.Link className="text-light" href="/withdraw">
              <CreditCard className="text-light" /> Withdraw
            </Nav.Link>
            <Nav.Link className="text-light" href="/profile">
              <Settings className="text-light" /> Account Settings
            </Nav.Link>
            <Nav.Link className="text-light" onClick={logout} href="#">
              <LogOut className="text-danger m-1" />
              Logout
            </Nav.Link>
            <NavDropdown title="Where to Buy" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Where to Buy</NavDropdown.Item>
              <NavDropdown.Item href="https://bitso.com/">
                Bitso
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://www.binance.com/">
                Binance
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://www.huobi.com/">
                Huob
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://www.okex.com/">
                Oke_x
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://www.coinex.com/">
                CoinEx
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://www.kucoin.com/">
                KuCoin
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://www.bitstamp.net/">
                Bitstamp
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://www.luno.com/">
                Luno
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://remitano.com/">
                Remitano
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://remitano.com/">
                Remitano
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://www.moonpay.com/">
                Moonpay
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://paxful.com/">
                Paxful
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://www.coinbase.com/">
                CoinBase
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://ramp.network/buy">
                Ramp
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://openocean.banxa.com/">
                Banxa
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://www.chainbits.com/">
                Chainbits
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://www.bitcoin.com/">
                Bitcoin
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNav;
