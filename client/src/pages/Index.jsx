import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Check,
  Bitcoin,
  DollarSign,
  Shield,
} from "lucide-react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import BitRadexNav from "../components/BitRadexNav";
import Widget101 from "../components/Widget101";

const Index = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] dark">
      {/* HEADER */}
      {/* <header className="px-4 lg:px-6 h-14 flex items-center border-bottom">
        <Link to="/" className="flex items-center justify-center">
          <Bitcoin className="h-6 w-6 text-bitradex-orange" />
          <span className="ml-2 text-xl font-bold text-light">BitRadex</span>
        </Link>

        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm text-light hover:underline" to="#features">Features</Link>
          <Link className="text-sm text-light hover:underline" to="#testimonials">Testimonials</Link>
          <Link className="text-sm text-light hover:underline" to="#pricing">Pricing</Link>
          <Link className="text-sm text-light hover:underline" to="/login">Login</Link>
          <Link className="text-sm text-bitradex-orange hover:underline" to="/signup">Sign Up</Link>
        </nav>
      </header> */}

      <BitRadexNav />

      {/* MAIN CONTENT */}
      <main className="flex-1" style={{ marginTop: "80px" }}>
        {/* HERO */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <Container>
            <Row className="align-items-center">
              <Col lg={5} className="mt-4 mt-lg-0">
                <img
                  src="https://tradevister.vercel.app/img/box-3.gif"
                  alt="Hero"
                  style={{ width: "320px" }}
                  className="img-fluid rounded"
                />
              </Col>
              <Col lg={7} className="text-light">
                <h1 style={{ fontSize: "70px" }}>
                  Invest in Crypto with Confidence
                </h1>
                <p className="mt-3 bitradex-text-muted">
                  Our platform provides secure, transparent, and profitable
                  cryptocurrency investment opportunities.
                </p>

                <div className="d-flex gap-2 mt-4">
                  <Link to="/signup">
                    <Button size="lg" className="btn-bitradex-warning border-0">
                      Get Started
                      <ArrowRight className="ms-2 h-4 w-4" />
                    </Button>
                  </Link>

                  <Link to="#features">
                    <Button size="lg" variant="outline-light">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <Widget101 />

        {/* FEATURES */}
        <section
          id="features"
          style={{ marginTop: "90px" }}
          className="py-12 md:py-24 lg:py-32 dark"
        >
          <Container>
            <h2 style={{ fontSize: "30px" }} className="text-center text-light">
              <span
                style={{
                  fontSize: "16px",
                  padding: "1px",
                  paddingLeft: "59px",
                  paddingRight: "59px",
                  borderRadius: "7px",
                  background: "rgb(242, 109, 7)",
                }}
              >
                Features
              </span>
              <br />
              Everything You Need to Invest in Crypto
            </h2>
            <p className="text-center bitradex-text-muted mb-5">
              Our platform provides all the tools and features you need to
              invest in cryptocurrency with confidence.
            </p>

            <Row style={{ marginTop: "-40px" }} className="g-4">
              <Col lg={4}>
                <Card className="p-4 bg-black border">
                  <div className="d-flex justify-content-center mb-3">
                    <Shield className="h-6 w-6 text-bitradex-orange" />
                  </div>
                  <h3 className="text-light text-center">Secure Platform</h3>
                  <p className="bitradex-text-muted text-center">
                    Industry-leading security protecting your investments.
                  </p>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="p-4 bg-black border">
                  <div className="d-flex justify-content-center mb-3">
                    <BarChart3 className="h-6 w-6 text-bitradex-orange" />
                  </div>
                  <h3 className="text-light text-center">Advanced Analytics</h3>
                  <p className="bitradex-text-muted text-center">
                    Real-time market data & insights.
                  </p>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="p-4 bg-black border">
                  <div className="d-flex justify-content-center mb-3">
                    <DollarSign className="h-6 w-6 text-bitradex-orange" />
                  </div>
                  <h3 className="text-light text-center">Low Fees</h3>
                  <p className="bitradex-text-muted text-center">
                    Transparent & competitive pricing.
                  </p>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* TESTIMONIALS */}
        <section
          style={{ marginTop: "70px" }}
          id="testimonials"
          className="py-12 md:py-24 lg:py-32 dark p-4"
        >
          <Container>
            <h2 style={{ fontSize: "30px" }} className="text-center text-light">
              <span
                style={{
                  fontSize: "16px",
                  padding: "1px",
                  paddingLeft: "59px",
                  paddingRight: "59px",
                  borderRadius: "7px",
                  background: "rgb(242, 109, 7)",
                }}
              >
                Testimonials
              </span>
              <br />
              What Our Investors Say
            </h2>
            <p className="text-center bitradex-text-muted mb-5">
              Don't just take our word for it. Here's what our users have to say
              about their experience.
            </p>

            <Row className="mt-5 g-4">
              <Col lg={6}>
                <Card className="p-4 bg-black border">
                  <p className="bitradex-text-muted">
                  "I've tried several crypto investment platforms, but BitRadex stands out with its security features, low fees, and excellent customer support."
                  </p>
                  <div className="d-flex align-items-center mt-3">
                    <div
                      className="rounded-circle bg-muted"
                      style={{ width: 40, height: 40 }}
                    ></div>
                    <div className="ms-3">
                      <p className="text-light">
                        <img
                          style={{ borderRadius: "50%" }}
                          width={40}
                          height={40}
                          src="https://media.istockphoto.com/id/1135381120/photo/portrait-of-a-young-woman-outdoors-smiling.jpg?s=612x612&w=0&k=20&c=T5dukPD1r-o0BFqeqlIap7xzw07icucetwKaEC2Ms5M="
                          className="m-1"
                          alt="logo"
                          srcset=""
                        />{" "}
                        Sarah Miller
                      </p>
                      <p className="bitradex-text-muted small">
                        Investor since 2021
                      </p>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col lg={6}>
                <Card className="p-4 bg-black border">
                  <p className="bitradex-text-muted">
                  "BitRadex has transformed the way I invest in cryptocurrency. The platform is intuitive, secure, and provides all the tools I need to make informed decisions."
                  </p>
                  <div className="d-flex align-items-center mt-3">
                    <div
                      className="rounded-circle bg-muted"
                      style={{ width: 40, height: 40 }}
                    ></div>
                    <div className="ms-3">
                    <p className="text-light">
                        <img
                          style={{ borderRadius: "50%" }}
                          width={40}
                          height={40}
                          src="https://img.freepik.com/free-photo/portrait-cute-smiling-boy-cafe_23-2148436234.jpg?semt=ais_hybrid&w=740&q=80"
                          className="m-1"
                          alt="logo"
                          srcset=""
                        />{" "}
                        Alex Johnson
                      </p>
                      <p className="bitradex-text-muted small">
                        Investor since 2022
                      </p>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* PRICING */}
        <section
          style={{ marginTop: "70px" }}
          id="pricing"
          className="py-12 md:py-24 lg:py-32 bg-muted"
        >
          <Container>
            <h2 style={{ fontSize: "30px" }} className="text-center text-light">
              <span
                style={{
                  fontSize: "16px",
                  padding: "1px",
                  paddingLeft: "59px",
                  paddingRight: "59px",
                  borderRadius: "7px",
                  background: "rgb(242, 109, 7)",
                }}
              >
                Pricing
              </span>
              <br />
              Simple, Transparent Pricing
            </h2>
            <p className="text-center bitradex-text-muted mb-5">
              Choose the plan that works best for your investment goals.
            </p>
            <Row className="mt-5 g-4">
              {/* Basic */}
              <Col lg={4}>
                <Card className="p-4 border bg-black border-0">
                  <h3 className="text-2xl text-light">Basic</h3>
                  <p className="bitradex-text-muted">For new investors.</p>
                  <h2 className="mt-3 text-light">
                    $0 <span className="bitradex-text-muted">/month</span>
                  </h2>
                  <ul className="mt-3 bitradex-text-muted">
                    <li>
                      {" "}
                      <Check className="h-5 w-5 text-bitradex-orange m-2" />
                      Advanced analytics
                    </li>
                    <li> Basic analytics</li>
                    <li>
                      {" "}
                      <Check className="h-5 w-5 text-bitradex-orange m-2" />
                      Advanced analytics
                    </li>
                    <li> Up to 5 investments</li>
                    <li>
                      {" "}
                      <Check className="h-5 w-5 text-bitradex-orange m-2" />
                      Advanced analytics
                    </li>
                    <li> Standard support</li>
                  </ul>
                  <Link to="/signup" className="mt-4 d-block">
                    <Button className="w-100 btn-bitradex-warning border-0">
                      Get Started
                    </Button>
                  </Link>
                </Card>
              </Col>

              {/* Pro */}
              <Col lg={4}>
                <Card className="p-4 border bg-black border-0">
                  <h3 className="text-2xl text-light">Pro</h3>
                  <p className="bitradex-text-muted">For serious investors.</p>
                  <h2 className="mt-3 text-light">
                    $29 <span className="bitradex-text-muted">/month</span>
                  </h2>

                  <ul className="mt-3 bitradex-text-muted">
                    <li>
                      {" "}
                      <Check className="h-5 w-5 text-bitradex-orange m-2" />
                      Advanced analytics
                    </li>
                    <li> Unlimited investments</li>
                    <li>
                      {" "}
                      <Check className="h-5 w-5 text-bitradex-orange m-2" />
                      Advanced analytics
                    </li>
                    <li> Priority support</li>
                    <li>
                      {" "}
                      <Check className="h-5 w-5 text-bitradex-orange m-2" />
                      Advanced analytics
                    </li>
                    <li> Lower fees</li>
                  </ul>

                  <Link to="/signup" className="mt-4 d-block">
                    <Button className="w-100 btn-bitradex-warning border-0">
                      Get Started
                    </Button>
                  </Link>
                </Card>
              </Col>

              {/* Enterprise */}
              <Col lg={4}>
                <Card className="p-4 border bg-black border-0">
                  <h3 className="text-2xl text-light">Enterprise</h3>
                  <p className="bitradex-text-muted">For institutions.</p>
                  <h2 className="mt-3 text-light">
                    Custom <span className="bitradex-text-muted">/month</span>
                  </h2>

                  <ul className="mt-3 bitradex-text-muted">
                    <li>
                      {" "}
                      <Check className="h-5 w-5 text-bitradex-orange m-2" />
                      Advanced analytics
                    </li>
                    <li> Custom analytics</li>
                    <li>
                      {" "}
                      <Check className="h-5 w-5 text-bitradex-orange m-2" />
                      Advanced analytics
                    </li>
                    <li> Account manager</li>
                    <li>
                      {" "}
                      <Check className="h-5 w-5 text-bitradex-orange m-2" />
                      Advanced analytics
                    </li>
                    <li> 24/7 premium support</li>
                    <li>
                      {" "}
                      <Check className="h-5 w-5 text-bitradex-orange m-2" />
                      Advanced analytics
                    </li>
                    <li> Lowest fees</li>
                  </ul>

                  <Link to="/contact" className="mt-4 d-block">
                    <Button
                      variant="outline-light"
                      className="w-100 btn-bitradex-warning"
                    >
                      Contact Sales
                    </Button>
                  </Link>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* CTA */}
        <section
          style={{ marginTop: "70px" }}
          className="py-12 md:py-24 lg:py-32"
        >
          <Container className="text-center">
            <h2 className="text-3xl font-bold text-light">
              Ready to Start Investing?
            </h2>
            <p className="bitradex-text-muted mt-2">
              Join thousands of investors on BitRadex.
            </p>

            <Link to="/signup">
              <Button
                size="lg"
                style={{ marginBottom: "50px", marginTop: "-12px" }}
                className=" btn-bitradex-warning border-0"
              >
                Create Your Account
                <ArrowRight className="ms-2 h-4 w-4" />
              </Button>
            </Link>
          </Container>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-3 border-top text-center">
        <p className="bitradex-text-muted small">
          © {new Date().getFullYear()} BitRadex. All rights reserved.
        </p>
        <div className="d-flex justify-content-center gap-3 small">
          <Link to="/terms" className="text-light">
            Terms
          </Link>
          <Link to="/privacy" className="text-light">
            Privacy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Index;
