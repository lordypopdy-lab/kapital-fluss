import axios from "axios";
import { useState, useEffect } from "react";

import {
  Card,
  Button,
  Row,
  Col,
  Tabs,
  Tab,
  Container,
  Table,
} from "react-bootstrap";
import { DollarSign, Bitcoin, Coins, LineChart, Check } from "lucide-react";

import Widget102 from "../components/Widget102";
import Widget101 from "../components/Widget101";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  const [balance, setBalance] = useState(0);
  const [priceBackup, setPriceBack] = useState({});
  const [pricesTicker, setPricesTicker] = useState({});
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [userVerification, setVerificationStatus] = useState({});

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

          const formattedBalance = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(tBalance);

          setBalance(formattedBalance);
        }
      });
    };

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

    const FavTokens = () => {
      const socket = new WebSocket(
        "wss://bitclub-websocket.onrender.com/ws/ticker"
      );

      socket.onopen = () => {
        console.log("✅ MarkPrice WebSocket connected");
      };

      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        const symbol = msg.symbol?.toUpperCase();
        if (!symbol) return;

        setPricesTicker((prev) => ({
          ...prev,
          [symbol]: {
            ...(prev[symbol] || {}),
            ...msg,
          },
        }));
      };

      socket.onerror = (err) => {
        console.error("❌ MarkPrice WebSocket error:", err);
      };

      socket.onclose = () => {
        console.warn("🔌 MarkPrice WebSocket disconnected");
      };

      return () => socket.close();
    };

    getUser();
    getUserVerification();

    const cleanup = FavTokens();

    return cleanup;
  }, []);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  const verifyID = async () => {
    console.log("Start Verif");
    location.href = "https://kapital-kyc.vercel.app";
  };

  const formatVolume = (value) => {
    const num = Number(value || 0);
    if (num >= 1e12) return (num / 1e12).toFixed(5) + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(5) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(5) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(5) + "K";
    return num.toFixed(2);
  };

  return (
    <Container fluid className="d-flex flex-column gap-4">
      <Widget102 />

      {/* KYC ALERT */}

      {userVerification.kycStatus === "Approved" ? (
        ""
      ) : userVerification.kycStatus === "Inreview" ? (
        <div className="alert alert-warning p-2" role="alert">
          <h6 className="text-warning fw-bold mb-1">
            <Check /> Identity Verification Required
          </h6>
          <span className="bitradex-text-muted">
            Complete your identity verification to unlock full platform
            features.
          </span>
          <Button
            onClick={verifyID}
            style={{ float: "right" }}
            variant="outline"
            size="sm"
            className="btn btn-primary"
          >
            Data Inreview!
          </Button>
        </div>
      ) : (
        <div className="alert alert-warning p-2" role="alert">
          <h6 className="text-warning fw-bold mb-1">
            <Check /> Identity Verification Required
          </h6>
          <span className="bitradex-text-muted">
            Complete your identity verification to unlock full platform
            features.
          </span>
          <Button
            onClick={verifyID}
            style={{ float: "right" }}
            variant="outline"
            size="sm"
            className="btn btn-danger"
          >
            Verify Now
          </Button>
        </div>
      )}

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
                    <span className="text-600">{user && user.currency}</span>
                    {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(user?.profit || 0)}
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
                    {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(user?.deposit || 0)}
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
                    {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(user?.bonuse || 0)}
                  </>
                ) : (
                  "******"
                )}
              </div>
              {parseFloat(balance.toString().replace(/,/g, "")) > 0 ? (
                <p className="text-xs text-success">Investment in Progress..</p>
              ) : (
                <p className="text-xs text-light">No investments yet</p>
              )}
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
                {/* ALL COINS */}
                <Tab eventKey="all" title="All Coins">
                  <div className="row text-sm text-light fw-medium py-2">
                    <div className="col">Coin</div>
                    <div className="col text-end text-light">Price</div>
                    <div className="col text-end text-light">24h Change</div>
                    <div className="col text-end text-light">Volume</div>
                  </div>

                  <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    {Object.keys(pricesTicker)
                      .sort()
                      .slice(0, 100) 
                      .map((symbol) => {
                        const coin = pricesTicker[symbol];
                        if (!coin) return null;

                        const price = parseFloat(coin.lastPrice).toLocaleString(
                          undefined,
                          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                        );
                        const changePercent = parseFloat(
                          coin.priceChangePercent
                        );
                        const isPositive = changePercent >= 0;
                        const volume = parseFloat(coin.volume).toLocaleString();

                        return (
                          <div key={symbol} className="row py-2">
                            <div className="col d-flex text-light align-items-center">
                              <Coins
                                className="me-2 h-4 w-4"
                                style={{ color: "orange" }}
                              />
                              {symbol.toUpperCase()}
                            </div>
                            <div className="col text-end text-light">
                              ${price}
                            </div>
                            <div
                              className={`col text-end ${
                                isPositive ? "text-success" : "text-danger"
                              }`}
                            >
                              {isPositive ? "+" : "-"}
                              {Math.abs(changePercent).toFixed(2)}%
                            </div>
                            <div className="col text-end text-light">
                              {volume}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </Tab>

                <Tab eventKey="trending" title="Trending">
                  <div className="row text-sm text-light fw-medium py-2">
                    <div className="col">Coin</div>
                    <div className="col text-end text-light">Price</div>
                    <div className="col text-end text-light">24h Change</div>
                    <div className="col text-end text-light">Volume</div>
                  </div>

                  <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    {Object.keys(pricesTicker)
                      .sort(
                        (a, b) =>
                          parseFloat(pricesTicker[b].volume) -
                          parseFloat(pricesTicker[a].volume)
                      )
                      .slice(0, 10) // top 10 trending
                      .map((symbol) => {
                        const coin = pricesTicker[symbol];
                        if (!coin) return null;

                        const price = parseFloat(coin.lastPrice).toLocaleString(
                          undefined,
                          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                        );
                        const changePercent = parseFloat(
                          coin.priceChangePercent
                        );
                        const isPositive = changePercent >= 0;
                        const volume = parseFloat(coin.volume).toLocaleString();

                        return (
                          <div key={symbol} className="row py-2">
                            <div className="col d-flex text-light align-items-center">
                              <Coins
                                className="me-2 h-4 w-4"
                                style={{ color: "orange" }}
                              />
                              {symbol.toUpperCase()}
                            </div>
                            <div className="col text-end text-light">
                              ${price}
                            </div>
                            <div
                              className={`col text-end ${
                                isPositive ? "text-success" : "text-danger"
                              }`}
                            >
                              {isPositive ? "+" : "-"}
                              {Math.abs(changePercent).toFixed(2)}%
                            </div>
                            <div className="col text-end text-light">
                              {volume}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </Tab>

                <Tab eventKey="gainers" title="Gainers">
                  <div className="row text-sm text-light fw-medium py-2">
                    <div className="col">Coin</div>
                    <div className="col text-end text-light">Price</div>
                    <div className="col text-end text-light">24h Change</div>
                    <div className="col text-end text-light">Volume</div>
                  </div>

                  <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    {Object.keys(pricesTicker)
                      .sort(
                        (a, b) =>
                          parseFloat(pricesTicker[b].priceChangePercent) -
                          parseFloat(pricesTicker[a].priceChangePercent)
                      )
                      .slice(0, 10) // top 10 gainers
                      .map((symbol) => {
                        const coin = pricesTicker[symbol];
                        if (!coin) return null;

                        const price = parseFloat(coin.lastPrice).toLocaleString(
                          undefined,
                          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                        );
                        const changePercent = parseFloat(
                          coin.priceChangePercent
                        );
                        const isPositive = changePercent >= 0;
                        const volume = parseFloat(coin.volume).toLocaleString();

                        return (
                          <div key={symbol} className="row py-2">
                            <div className="col d-flex text-light align-items-center">
                              <Coins
                                className="me-2 h-4 w-4"
                                style={{ color: "orange" }}
                              />
                              {symbol.toUpperCase()}
                            </div>
                            <div className="col text-end text-light">
                              ${price}
                            </div>
                            <div
                              className={`col text-end ${
                                isPositive ? "text-success" : "text-danger"
                              }`}
                            >
                              {isPositive ? "+" : "-"}
                              {Math.abs(changePercent).toFixed(2)}%
                            </div>
                            <div className="col text-end text-light">
                              {volume}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </Tab>

                <Tab eventKey="losers" title="Losers">
                  <div className="row text-sm text-light fw-medium py-2">
                    <div className="col">Coin</div>
                    <div className="col text-end text-light">Price</div>
                    <div className="col text-end text-light">24h Change</div>
                    <div className="col text-end text-light">Volume</div>
                  </div>

                  <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    {Object.keys(pricesTicker)
                      .sort(
                        (a, b) =>
                          parseFloat(pricesTicker[a].priceChangePercent) -
                          parseFloat(pricesTicker[b].priceChangePercent)
                      )
                      .slice(0, 10) // top 10 losers
                      .map((symbol) => {
                        const coin = pricesTicker[symbol];
                        if (!coin) return null;

                        const price = parseFloat(coin.lastPrice).toLocaleString(
                          undefined,
                          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                        );
                        const changePercent = parseFloat(
                          coin.priceChangePercent
                        );
                        const isPositive = changePercent >= 0;
                        const volume = parseFloat(coin.volume).toLocaleString();

                        return (
                          <div key={symbol} className="row py-2">
                            <div className="col d-flex text-light align-items-center">
                              <Coins
                                className="me-2 h-4 w-4"
                                style={{ color: "orange" }}
                              />
                              {symbol.toUpperCase()}
                            </div>
                            <div className="col text-end text-light">
                              ${price}
                            </div>
                            <div
                              className={`col text-end ${
                                isPositive ? "text-success" : "text-danger"
                              }`}
                            >
                              {isPositive ? "+" : "-"}
                              {Math.abs(changePercent).toFixed(2)}%
                            </div>
                            <div className="col text-end text-light">
                              {volume}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          {/* GETTING STARTED CARD */}
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
              {/* Steps Content */}
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
