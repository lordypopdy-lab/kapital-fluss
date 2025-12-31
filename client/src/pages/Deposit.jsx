import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useState, useEffect } from "react";

import {
  Tabs,
  Tab,
  Card,
  Form,
  Button,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { Bitcoin, Wallet, CreditCard, QrCode } from "lucide-react";

import UserNav from "../components/Nav/UserNav";
import DashboardNav from "../components/Nav/DashboardNav";

const Deposit = () => {
  const [user, setUser] = useState([]);
  const [balance, setBalance] = useState(0);
  const [walletAddress, setWalletAddress] = React.useState("");

  const walletMap = {
    bitcoin: "1Bk67rKUfXRRCRPrtXFeeyGQ5Vn3J7Zrht",
    ethereum: "0x81df9918f6e00ae1f866258335dd5aa2684f92b1",
    usdt: "TG2mu1G75JW8KsqvBjbxWPNxxrb8ni7CAk",
    trc20: "TAjZkvRtK5cdoG11udBx628Ncw8mPSh2Sc"
  };

  if (!localStorage.getItem("user")) {
    window.location.href = "/login";
  }

  useEffect(()=>{

    const newU = localStorage.getItem("user");
    const newUser = JSON.parse(newU);
    const email = newUser.email;

    const getUser = async () => {
      await axios.post("/getUser", { email }).then((data) => {
        if (data) {
          setUser(data.data);
          const tBalance =
            data.data.deposit + data.data.profit + data.data.bonuse;
          setBalance(tBalance.toFixed(3));
        }
      });
    };
    getUser();
  },[])


const bankDeposit = async () => {
  toast.success("Coming Soon!, Use Crypto method!")
}

  const copyToClipboard = () => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    toast.success(`Copied!`)
  };

  return (
    <div className="d-flex flex-column min-vh-100 dark">
      {/* ---------- HEADER ---------- */}
      <UserNav />

      {/* ---------- BODY ---------- */}
      <div style={{marginTop: "70px"}} className="d-flex flex-grow-1">
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
            <DashboardNav />
            <div style={{ marginTop: "-10px" }} className="flex-grow-1"></div>
          </div>
        </aside>

        {/* ---------- MAIN CONTENT ---------- */}
        <main className="flex-grow-1 p-4 p-md-5">
          <div className="container my-4">
            <div className="mb-4">
              <h3
                style={{ borderBottom: "5px solid orange", width: "250px" }}
                className="text-light"
              >
                Deposit Funds
              </h3>
              <p className="text-light">
                Add funds to your account using your preferred payment method
              </p>
            </div>

            <Tabs defaultActiveKey="crypto" className="mb-4">
              <Tab
                eventKey="crypto"
                style={{ width: "100%" }}
                title="Cryptocurrency"
              >
                <Card className="bg-dark text-light mb-4">
                  <Card.Header>
                    <Card.Title>Deposit with Cryptocurrency</Card.Title>
                    <Card.Subtitle className="text-light">
                      Send crypto directly to your Crypto wallet
                    </Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      {/* Amount Input */}
                      <Form.Group className="mb-3" controlId="cryptoAmount">
                        <Form.Label>Amount <span className="text-warning">-</span> {user && user.currency}</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>{user && user.currency}</InputGroup.Text>
                          <Form.Control
                            className=""
                            type="number"
                            placeholder="0.00"
                          />
                        </InputGroup>
                        <Form.Text className="text-light">
                          Minimum deposit: {user && user.currency}10.00
                        </Form.Text>
                      </Form.Group>

                      {/* Select Cryptocurrency */}
                      <Form.Group className="mb-3">
                        <Form.Label>Select cryptocurrency</Form.Label>
                        <Row className="g-3">
                          <Col md={3}>
                            <Form.Check
                              type="radio"
                              label={
                                <>
                                  <Bitcoin
                                    onChange={() =>
                                      setWalletAddress(walletMap.bitcoin)
                                    }
                                    className="mb-1 me-2"
                                    style={{ color: "orange" }}
                                  />{" "}
                                  Bitcoin
                                </>
                              }
                              name="cryptoMethod"
                              id="bitcoin"
                              onChange={() =>
                                setWalletAddress(walletMap.bitcoin)
                              }
                            />
                          </Col>
                          <Col md={3}>
                            <Form.Check
                              type="radio"
                              label={
                                <>
                                  <Wallet
                                    onChange={() =>
                                      setWalletAddress(walletMap.usdt)
                                    }
                                    className="mb-1 me-2"
                                    style={{ color: "orange" }}
                                  />{" "}
                                  Ethereum
                                </>
                              }
                              name="cryptoMethod"
                              id="ethereum"
                              onChange={() =>
                                setWalletAddress(walletMap.ethereum)
                              }
                            />
                          </Col>
                          <Col md={3}>
                            <Form.Check
                              type="radio"
                              label={
                                <>
                                  <Wallet
                                    onChange={() =>
                                      setWalletAddress(walletMap.trc20)
                                    }
                                    className="mb-1 me-2"
                                    style={{ color: "orange" }}
                                  />{" "}
                                  TRON(trc20)
                                </>
                              }
                              name="cryptoMethod"
                              id="trx"
                              onChange={() =>
                                setWalletAddress(walletMap.trc20)
                              }
                            />
                          </Col>
                          <Col md={3}>
                            <Form.Check
                              type="radio"
                              label={
                                <>
                                  <CreditCard
                                    onChange={() =>
                                      setWalletAddress(walletMap.usdt)
                                    }
                                    className="mb-1 me-2"
                                    style={{ color: "orange" }}
                                  />{" "}
                                  USDT
                                </>
                              }
                              name="cryptoMethod"
                              id="usdt"
                              onChange={() => setWalletAddress(walletMap.usdt)}
                            />
                          </Col>
                        </Row>
                      </Form.Group>

                      {/* QR Code Section */}
                      <Card className="text-center bg-black text-dark mb-3">
                        <Card.Body>
                          <QrCode size={128} className="mb-3 text-light" />
                          <p className="text-success">
                            Scan QR code or copy address
                          </p>
                          <InputGroup>
                            <Form.Control readOnly value={walletAddress} />
                            <Button
                              variant="outline-light"
                              onClick={copyToClipboard}
                            >
                              Copy
                            </Button>
                          </InputGroup>
                        </Card.Body>
                      </Card>

                      {/* Important Notes */}
                      <Card className="bg-black text-light">
                        <Card.Body>
                          <h5>Important Notes:</h5>
                          <ul>
                            <li>
                              <span className="m-2" style={{ color: "orange" }}>
                                ✔
                              </span>{" "}
                              Send only the selected cryptocurrency to this
                              address
                            </li>
                            <li>
                              <span className="m-2" style={{ color: "orange" }}>
                                ✔
                              </span>{" "}
                              Minimum deposit amount is {user && user.currency}10.00
                            </li>
                            <li>
                              <span className="m-2" style={{ color: "orange" }}>
                                ✔
                              </span>{" "}
                              Deposits typically confirm within 30 minutes
                            </li>
                            <li>
                              <span className="m-2" style={{ color: "orange" }}>
                                ✔
                              </span>{" "}
                              Contact support if you encounter any issues
                            </li>
                          </ul>
                        </Card.Body>
                      </Card>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="fiat" title="Bank / Card">
                <Card className="bg-dark text-light">
                  <Card.Header>
                    <Card.Title>Deposit with Bank or Card</Card.Title>
                    <Card.Subtitle className="text-light">
                      Add funds using your bank account or credit/debit card
                    </Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      {/* Amount Input */}
                      <Form.Group className="mb-3" controlId="fiatAmount">
                        <Form.Label>Amount {user && user.currency}</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>{user && user.currency}</InputGroup.Text>
                          <Form.Control type="number" placeholder="0.00" />
                        </InputGroup>
                        <Form.Text className="text-light">
                          Minimum deposit: {user && user.currency}10.00
                        </Form.Text>
                      </Form.Group>

                      {/* Payment Method */}
                      <Form.Group className="mb-3">
                        <Form.Label>Select payment method</Form.Label>
                        <Row className="g-3">
                          <Col md={6}>
                            <Form.Check
                              type="radio"
                              label={
                                <>
                                  <CreditCard
                                    className="mb-1 me-2"
                                    style={{ color: "orange" }}
                                  />{" "}
                                  Credit/Debit Card
                                </>
                              }
                              name="fiatMethod"
                              id="card"
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Check
                              type="radio"
                              label={
                                <>
                                  <Wallet
                                    className="mb-1 me-2"
                                    style={{ color: "orange" }}
                                  />{" "}
                                  Bank Transfer
                                </>
                              }
                              name="fiatMethod"
                              id="bank"
                            />
                          </Col>
                        </Row>
                      </Form.Group>

                      {/* Card Details */}
                      <Row className="g-3 mb-3">
                        <Col md={6}>
                          <Form.Group controlId="cardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control placeholder="1234 5678 9012 3456" />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="cardName">
                            <Form.Label>Name on Card</Form.Label>
                            <Form.Control placeholder="John Doe" />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="g-3 mb-3">
                        <Col md={6}>
                          <Form.Group controlId="expiry">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control placeholder="MM/YY" />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="cvc">
                            <Form.Label>CVC</Form.Label>
                            <Form.Control placeholder="123" />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button
                        variant="primary"
                        onClick={bankDeposit}
                        className="w-100 btn-bitradex-warning"
                      >
                        Deposit Funds
                      </Button>
                    </Form>
                  </Card.Body>
                  <Card.Footer className="text-light text-center">
                    Your payment information is securely processed and never
                    stored on our servers.
                  </Card.Footer>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Deposit;
