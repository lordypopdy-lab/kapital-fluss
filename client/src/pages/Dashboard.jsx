import axios from "axios";
import { useState, useEffect } from "react";

import { Card, Button, Row, Col, Tabs, Tab, Container } from "react-bootstrap";
import { DollarSign, Bitcoin, Coins, LineChart, Check } from "lucide-react";

import Widget102 from "../components/Widget102";
import Widget101 from "../components/Widget101";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState([]);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  if (!localStorage.getItem("user")) {
    window.location.href = "/login";
  }

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
    getUser();
  }, []);
  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  return (
    <Container fluid className="d-flex flex-column gap-4">
      <Widget102 />

      {/* KYC ALERT */}
      <div className="alert alert-warning p-2" role="alert">
        <h6 className="text-warning fw-bold mb-1">
          <Check /> Identity Verification Required
        </h6>
        <span className="bitradex-text-muted">
          Complete your identity verification to unlock full platform features.
        </span>
        <Button
          style={{ float: "right" }}
          variant="outline"
          size="sm"
          className="btn btn-danger"
        >
          Verify Now
        </Button>
      </div>
      {/* BALANCE CARDS */}
      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card className="bg-black shadow-light">
            <Card.Header className="d-flex justify-content-between align-items-center pb-2">
              <span className="text-sm text-light fw-medium">
                Total Balance
              </span>
              <DollarSign className="h-4 w-4" style={{ color: "orange" }} />
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div className="fs-2 text-light fw-bold">
                  {isBalanceVisible ? (
                    <>
                      <span className="text-600">{user && user.currency}</span>
                      {balance}
                    </>
                  ) : (
                    "******"
                  )}
                </div>

                <span
                  onClick={toggleBalanceVisibility}
                  style={{
                    cursor: "pointer",
                    fontSize: "22px",
                    color: "white",
                  }}
                  aria-label={
                    isBalanceVisible ? "Hide Balance" : "Show Balance"
                  }
                >
                  <FontAwesomeIcon
                    icon={isBalanceVisible ? faEye : faEyeSlash}
                  />
                </span>
              </div>
              <p className="text-xs text-light">Current portfolio value</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="bg-black shadow-light">
            <Card.Header className="d-flex justify-content-between align-items-center pb-2">
              <span className="text-sm text-light fw-medium">
                Profit Balance
              </span>
              <Bitcoin className="h-4 w-4" style={{ color: "orange" }} />
            </Card.Header>
            <Card.Body>
              <div className="fs-2 text-light fw-bold">
                {isBalanceVisible ? (
                  <>
                    <span className="text-600">{user?.currency}</span>
                    {user?.profit?.toFixed(3)}
                  </>
                ) : (
                  "******"
                )}
              </div>
              <p className="text-xs text-success">$0.00</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="bg-black shadow-light">
            <Card.Header className="d-flex justify-content-between align-items-center pb-2">
              <span className="text-sm text-light fw-medium">
                Deposit Balance
              </span>
              <Coins className="h-4 w-4" style={{ color: "orange" }} />
            </Card.Header>
            <Card.Body>
              <div className="fs-2 text-light fw-bold">
                {isBalanceVisible ? (
                  <>
                    <span className="text-600">{user && user.currency}</span>
                      {user?.deposit?.toFixed(3)}
                  </>
                ) : (
                  "******"
                )}
              </div>
              <p className="text-xs text-success">$0.00</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="bg-black shadow-light">
            <Card.Header className="d-flex justify-content-between align-items-center pb-2">
              <span className="text-sm text-light fw-medium">Bonuse/Loss</span>
              <LineChart className="h-4 w-4" style={{ color: "orange" }} />
            </Card.Header>
            <Card.Body>
              <div className="fs-2 text-light fw-bold text-light">
                {isBalanceVisible ? (
                  <>
                    <span className="text-600">{user && user.currency}</span>
                    {user?.bonuse?.toFixed(3)}
                  </>
                ) : (
                  "******"
                )}
              </div>
              <p className="text-xs text-light">No investments yet</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* MARKET OVERVIEW + GETTING STARTED */}
      <Row className="g-4">
        <Col lg={7}>
          <Card className="bg-black shadow">
            <Card.Header>
              <h5
                style={{ borderBottom: "5px solid orange", width: "200px" }}
                className="mb-0 text-light"
              >
                Market Overview
              </h5>
            </Card.Header>

            <Card.Body>
              <Tabs defaultActiveKey="all" className="mb-3">
                <Tab eventKey="all" title="All Coins">
                  <div className="row text-sm text-light fw-medium py-2">
                    <div className="col">Coin</div>
                    <div className="col text-end text-light">Price</div>
                    <div className="col text-end text-light">24h Change</div>
                    <div className="col text-end text-light">Market Cap</div>
                  </div>

                  <div className="row py-2">
                    <div className="col d-flex text-light align-items-center">
                      <Bitcoin
                        className="me-2 h-4 w-4"
                        style={{ color: "orange" }}
                      />
                      Bitcoin
                    </div>
                    <div className="col text-end text-light">$28,439.32</div>
                    <div className="col text-end text-success">+2.5%</div>
                    <div className="col text-end text-light">$542.8B</div>
                  </div>

                  <div className="row py-2">
                    <div className="col d-flex text-light align-items-center">
                      <Coins
                        className="me-2 h-4 w-4"
                        style={{ color: "orange" }}
                      />
                      Ethereum
                    </div>
                    <div className="col text-end text-light">$2,273.81</div>
                    <div className="col text-end text-success">+3.2%</div>
                    <div className="col text-end text-light">$273.4B</div>
                  </div>
                </Tab>

                <Tab eventKey="trending" title="Trending">
                  <div className="h-40 d-flex align-items-center justify-content-center text-light">
                    Trending coins will be displayed here
                  </div>
                </Tab>

                <Tab eventKey="gainers" title="Gainers">
                  <div className="h-40 d-flex align-items-center justify-content-center text-light">
                    Top gainers will be displayed here
                  </div>
                </Tab>

                <Tab eventKey="losers" title="Losers">
                  <div className="h-40 d-flex align-items-center justify-content-center text-light">
                    Top losers will be displayed here
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="bg-black shadow-light">
            <Card.Header>
              <h5
                style={{ borderBottom: "5px solid orange", width: "200px" }}
                className="mb-2 text-light"
              >
                Getting Started
              </h5>
              <p className="text-light small">
                Steps to begin your investment journey
              </p>
            </Card.Header>

            <Card.Body>
              {/* STEPS */}
              <div className="rounded border p-3 mb-3">
                <div className="d-flex align-items-center">
                  <div className="w-6 h-6 rounded-circle bg-bitradex-orange text-white d-flex justify-content-center align-items-center small text-light fw-bold">
                    ✔
                  </div>
                  <h6 className="ms-2 mb-0 text-sm text-light fw-medium">
                    Complete Your Profile
                  </h6>
                </div>

                <p className="mt-2 text-xs text-light">
                  Update your profile information to unlock all features.
                </p>
              </div>

              <div className="rounded border p-3 mb-3">
                <div className="d-flex align-items-center">
                  <div className="w-6 h-6 rounded-circle bg-bitradex-orange text-white d-flex justify-content-center align-items-center small text-light fw-bold">
                    ✔
                  </div>
                  <h6 className="ms-2 mb-0 text-sm text-light fw-medium">
                    Verify Your Identity
                  </h6>
                </div>

                <p className="mt-2 text-xs text-light">
                  Complete KYC verification to enable deposits and withdrawals.
                </p>
              </div>

              <div className="rounded border p-3 bg-muted">
                <div className="d-flex align-items-center">
                  <div className="w-6 h-6 rounded-circle bg-green-500 text-white d-flex justify-content-center align-items-center small">
                    ✔
                  </div>
                  <h6 className="ms-2 mb-0 text-sm text-light fw-medium">
                    Welcome Bonus Received
                  </h6>
                </div>

                <p className="mt-2 text-xs text-light">
                  You've received a{" "}
                  <span
                    style={{
                      background: "orange",
                      color: "black",
                      height: "50px",
                      width: "60px",
                      borderRadius: "60%",
                      padding: "3px",
                    }}
                  >
                    $50
                  </span>{" "}
                  welcome bonus to start your investment journey!
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Widget101 />
      </Row>
    </Container>
  );
};

export default Dashboard;
