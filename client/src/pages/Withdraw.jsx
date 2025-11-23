import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import FadeLoader from "react-spinners/FadeLoader";

import {
  Tabs,
  Tab,
  Card,
  Form,
  Button,
  Row,
  Col,
  Table,
  InputGroup,
} from "react-bootstrap";
import { Bitcoin, Wallet, CreditCard } from "lucide-react";

import UserNav from "../components/Nav/UserNav";
import DashboardNav from "../components/Nav/DashboardNav";

const Withdraw = () => {
  const [user, setUser] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [cryptoR, setcryptoR] = useState([]);
  const [bankR, setBankR] = useState([]);
  const [dataCrypto, setdataCrypto] = useState({
    value: 0,
    walletAddress: "",
  });
  const [data, setData] = useState({
    value: 0,
    bank_name: "",
    account_name: "",
    account_number: "",
    swift_code: "",
  });

  useEffect(() => {
    const newU = localStorage.getItem("user");
    const newUser = JSON.parse(newU);
    const email = newUser.email;
    const ID = newUser._id;

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
    const getCryptoRecords = async () => {
      await axios.post("/getCryptoRecords", { email }).then((data) => {
        if (data) {
          setcryptoR(data.data);
        }
      });
    };
    const getBankRecords = async () => {
      await axios.post("/getBankRecords", { email }).then((data) => {
        if (data) {
          setBankR(data.data);
        }
      });
    };
    getUser();
    getBankRecords();
    getCryptoRecords();
  }, []);

  const cyptoWithrawal = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = user.email;
    const { value, walletAddress } = dataCrypto;

    try {
      await axios
        .post("/withdrawCrypto", {
          email,
          value,
          walletAddress,
        })
        .then((data) => {
          if (data.data.success) {
            toast.success(data.data.success);
            setLoading(false);
            setdataCrypto({
              value: "",
              walletAddress: "",
            });
          } else if (data.data.error) {
            toast.error(data.data.error);
            setLoading(false);
          }
        });
    } catch (error) {
      console.log("Crypto withdrawal failed: ", error);
    }
  };

  const handleWithdraw = async () => {
    setLoading(true);
    const email = user.email;
    const { value, bank_name, account_name, account_number, swift_code } = data;

    try {
      await axios
        .post("/withdrawBank", {
          email,
          value,
          bank_name,
          account_name,
          account_number,
          swift_code,
        })
        .then((data) => {
          if (data.data.success) {
            toast.success(data.data.success);
            setLoading(false);
            setData({
              value: 0,
              bank_name: "",
              account_name: "",
              account_number: "",
              swift_code: "",
            });
          } else if (data.data.error) {
            setLoading(false);
            toast.error(data.data.error);
          }
        });
    } catch (error) {
      console.log("Withrawal failed: ", error);
    }
  };

  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Copied successfully!");
    } catch (err) {
      toast.error("Failed to copy!");
    }
  };

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
                Withdraw Funds
              </h3>
              <p className="text-light">
                Withdraw your funds to your preferred destination
              </p>
            </div>
            <Tabs defaultActiveKey="crypto" className="mb-4">
              <Tab eventKey="crypto" title="Cryptocurrency">
                <Card className="bg-dark text-light mb-4">
                  <Card.Header>
                    <Card.Title>Withdraw to Cryptocurrency Wallet</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Send your funds to an external cryptocurrency wallet
                    </Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={cyptoWithrawal}>
                      {/* Amount */}
                      <Form.Group className="mb-3" controlId="cryptoAmount">
                        <Form.Label>Amount {user && user.currency}</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>$</InputGroup.Text>
                          <Form.Control
                            value={dataCrypto.value}
                            onChange={(e) =>
                              setdataCrypto({
                                ...dataCrypto,
                                value: e.target.value,
                              })
                            }
                            type="number"
                            placeholder="0.00"
                          />
                        </InputGroup>
                        <Row className="mt-1">
                          <Col className="text-muted small">
                            Minimum withdrawal: $60.00
                          </Col>
                          <Col className="text-end small">
                            Available:{" "}
                            <span className="fw-medium">
                              {user && user.currency}
                              {balance && balance}
                            </span>
                          </Col>
                        </Row>
                      </Form.Group>
                      <FadeLoader
                        color="#36d7b7"
                        loading={isLoading}
                        speedMultiplier={3}
                        style={{
                          textAlign: "center",
                          position: "absolute",
                          left: "50%",
                          zIndex: "1",
                          top: "46%",
                        }}
                      />
                      {/* Select Cryptocurrency */}
                      <Form.Group className="mb-3">
                        <Form.Label>Select cryptocurrency</Form.Label>
                        <Row className="g-3">
                          <Col md={4}>
                            <Form.Check
                              type="radio"
                              label={
                                <>
                                  <Bitcoin className="mb-1 me-2" /> Bitcoin
                                </>
                              }
                              name="cryptoMethod"
                              id="bitcoin-withdraw"
                            />
                          </Col>
                          <Col md={4}>
                            <Form.Check
                              type="radio"
                              label={
                                <>
                                  <Wallet className="mb-1 me-2" /> Ethereum
                                </>
                              }
                              name="cryptoMethod"
                              id="ethereum-withdraw"
                            />
                          </Col>
                          <Col md={4}>
                            <Form.Check
                              type="radio"
                              label={
                                <>
                                  <CreditCard className="mb-1 me-2" /> USDT
                                </>
                              }
                              name="cryptoMethod"
                              id="usdt-withdraw"
                            />
                          </Col>
                        </Row>
                      </Form.Group>

                      {/* Wallet Address */}
                      <Form.Group className="mb-3" controlId="walletAddress">
                        <Form.Label>Wallet Address</Form.Label>
                        <Form.Control
                          value={dataCrypto.walletAddress}
                          onChange={(e) =>
                            setdataCrypto({
                              ...dataCrypto,
                              walletAddress: e.target.value,
                            })
                          }
                          placeholder="Enter wallet address..."
                        />
                        <Form.Text className="text-muted">
                          Double-check your wallet address before submitting
                        </Form.Text>
                      </Form.Group>

                      {/* Withdrawal Summary */}
                      <Card className="bg-secondary text-dark mb-3">
                        <Card.Body>
                          <h5>Withdrawal Summary:</h5>
                          <Row className="mb-1">
                            <Col className="text-muted small">Amount:</Col>
                            <Col className="text-end">
                              {user?.currency ? user.currency + " " : ""}
                              {dataCrypto?.value
                                ? Number(dataCrypto.value).toFixed(2)
                                : "0.00"}
                            </Col>
                          </Row>
                          <Row className="mb-1">
                            <Col className="text-muted small">Network Fee:</Col>
                            <Col className="text-end">
                              ${user && user.transaction_fee}
                            </Col>
                          </Row>
                          <hr />
                          <Row className="fw-medium">
                            <Col>Total:</Col>
                            <Col className="text-end">
                              {user?.currency ? user.currency + " " : ""}
                              {dataCrypto?.value
                                ? (
                                    Number(dataCrypto.value) +
                                    Number(user?.transaction_fee || 0)
                                  ).toFixed(2)
                                : "0.00"}
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>

                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100 btn-bitradex-warning"
                      >
                        Withdraw Funds
                      </Button>
                    </Form>
                  </Card.Body>
                  <Card.Footer className="text-muted text-center">
                    Withdrawals typically process within 24 hours. First-time
                    withdrawals may require additional verification.
                  </Card.Footer>
                </Card>
              </Tab>
              <Tab eventKey="fiat" title="Bank Account">
                <Card className="bg-dark text-light">
                  <Card.Header>
                    <Card.Title>Withdraw to Bank Account</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Transfer your funds to your linked bank account
                    </Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      {/* Amount */}
                      <Form.Group className="mb-3" controlId="fiatAmount">
                        <Form.Label>
                          Amount <span className="text-warning">-</span>{" "}
                          {user.currency && user.currency}
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text>$</InputGroup.Text>
                          <Form.Control
                            type="number"
                            value={data.value}
                            onChange={(e) =>
                              setData({ ...data, value: e.target.value })
                            }
                            placeholder="0.00"
                          />
                          <FadeLoader
                            color="#36d7b7"
                            loading={isLoading}
                            speedMultiplier={3}
                            style={{
                              textAlign: "center",
                              position: "absolute",
                              left: "50%",
                              zIndex: "1",
                            }}
                          />
                        </InputGroup>
                        <Row className="mt-1">
                          <Col className="text-muted small">
                            Minimum withdrawal: $50.00
                          </Col>
                          <Col className="text-end small">
                            Available:{" "}
                            <span className="fw-medium">
                              {user.currency && user.currency}{" "}
                              {balance && balance}
                            </span>
                          </Col>
                        </Row>
                      </Form.Group>

                      {/* Bank Details */}
                      <Row className="g-3 mb-3">
                        <Col md={6}>
                          <Form.Group controlId="bankName">
                            <Form.Label>Bank Name</Form.Label>
                            <Form.Control
                              value={data.bank_name}
                              onChange={(e) =>
                                setData({ ...data, bank_name: e.target.value })
                              }
                              placeholder="Enter bank name"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="accountName">
                            <Form.Label>Account Holder Name</Form.Label>
                            <Form.Control
                              value={data.account_name}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  account_name: e.target.value,
                                })
                              }
                              placeholder="Enter account holder name"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="g-3 mb-3">
                        <Col md={6}>
                          <Form.Group controlId="accountNumber">
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control
                              value={data.account_number}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  account_number: e.target.value,
                                })
                              }
                              placeholder="Enter account number"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="routingNumber">
                            <Form.Label>Routing Number</Form.Label>
                            <Form.Control
                              value={data.swift_code}
                              onChange={(e) =>
                                setData({ ...data, swift_code: e.target.value })
                              }
                              placeholder="Enter routing number"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* Withdrawal Summary */}
                      <Card className="bg-secondary text-dark mb-3">
                        <Card.Body>
                          <h5>Withdrawal Summary:</h5>
                          <Row className="mb-1">
                            <Col className="text-muted small">Amount:</Col>
                            <Col className="text-end">
                              {user?.currency ? user.currency + " " : ""}
                              {data?.value
                                ? Number(data.value).toFixed(2)
                                : "0.00"}
                            </Col>
                          </Row>
                          <Row className="mb-1">
                            <Col className="text-muted small">
                              Processing Fee:
                            </Col>
                            <Col className="text-end">
                              ${user && user.transaction_fee}
                            </Col>
                          </Row>
                          <hr />
                          <Row className="fw-medium">
                            <Col>Total:</Col>
                            <Col className="text-end">
                              {user?.currency ? user.currency + " " : ""}
                              {dataCrypto?.value
                                ? (
                                    Number(data.value) +
                                    Number(user?.transaction_fee || 0)
                                  ).toFixed(2)
                                : "0.00"}
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>

                      <Button
                        onClick={handleWithdraw}
                        variant="primary"
                        className="w-100 btn-bitradex-warning"
                      >
                        Withdraw Funds
                      </Button>
                    </Form>
                  </Card.Body>
                  <Card.Footer className="text-muted text-center">
                    Bank withdrawals typically take 3-5 business days.
                    First-time withdrawals may require additional verification.
                  </Card.Footer>
                </Card>
              </Tab>
              <Tab eventKey="Records" title="Bank transaction Records">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>[#]</th>
                      <th>[Amount]</th>
                      <th>[Bank]</th>
                      <th>[Name]</th>
                      <th>[Swift-code]</th>
                      <th>[Status]</th>
                      <th>[Email]</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bankR.length >= 0 ? (
                      bankR.map((data) => (
                        <tr key={data._id}>
                          <td>ID{data._id.slice(1, 10)}</td>
                          <td>
                            {user.currency}
                            {data.amount}
                          </td>
                          <td>{data.bank}</td>
                          <td>{data.name}</td>
                          <td>{data.swiftCode}</td>
                          <td>{data.status}</td>
                          <td>{data.email}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="text-center text-light">
                          No Records Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Tab>
              <Tab eventKey="Crypto-Records" title="Crypto transaction Records">
                <Table responsive>
                  <thead>
                    <tr>
                      <th>[#]</th>
                      <th>[Amount]</th>
                      <th>[Wallet]</th>
                      <th>[Status]</th>
                      <th>[Email]</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptoR.length >= 0 ? (
                      cryptoR.map((data) => (
                        <tr key={data._id}>
                          <td>ID:{data._id.slice(1, 10)}</td>
                          <td>
                            {user.currency}
                            {data.amount}
                          </td>
                          <td onClick={() => handleCopy(data.cryptoAddress)}>
                            {data.cryptoAddress.slice(1, 10)}
                          </td>
                          <td>{data.status}</td>
                          <td>{data.email}</td>
                          <td></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="text-center">No Records Available</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Tab>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Withdraw;
