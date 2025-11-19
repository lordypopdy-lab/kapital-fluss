import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { Card, Form, Button, Row, Col, Image } from "react-bootstrap";
import UserNav from "../components/Nav/UserNav";
import DashboardNav from "../components/Nav/DashboardNav";

import { Bitcoin, Wallet, CreditCard } from "lucide-react";


const Profile = () => {
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
          <Bitcoin className="h-6 w-6" style={{ color: "orange" }} />
          <span className="text-light">BitRadex</span>
        </Navbar.Brand>

        <Nav className="ms-auto d-flex align-items-center gap-4">
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
            <DashboardNav />
            <div style={{ marginTop: "-10px" }} className="flex-grow-1"></div>
          </div>
        </aside>

        {/* ---------- MAIN CONTENT ---------- */}
        <main className="flex-grow-1 p-4 p-md-5">
        <div className="container my-4">
      <div className="mb-4">
        <h3 className="text-light" style={{borderBottom: "5px solid orange", width: "150px"}}>Profile</h3>
        <p className="text-light">Manage your personal information and account settings</p>
      </div>

      <Row className="g-4 mb-4">
        {/* Personal Information */}
        <Col md={6}>
          <Card className="bg-dark text-light">
            <Card.Header>
              <Card.Title>Personal Information</Card.Title>
              <Card.Subtitle className="text-muted">Update your personal details</Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <Form>
                {/* Avatar */}
                <div className="text-center mb-4">
                  <Image
                    src="/placeholder.svg"
                    roundedCircle
                    width={96}
                    height={96}
                    className="mb-2"
                  />
                  <Button variant="outline-light" size="sm" className="d-block mx-auto mt-2">
                    Change Avatar
                  </Button>
                </div>

                <Row className="mb-3 g-3">
                  <Col>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control placeholder="John" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control placeholder="Doe" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="john.doe@example.com" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control placeholder="+1 234 567 890" />
                </Form.Group>

                <Button variant="primary" className="w-100 btn-bitradex-warning">Save Changes</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Address Information */}
        <Col md={6}>
          <Card className="bg-dark text-light">
            <Card.Header>
              <Card.Title>Address Information</Card.Title>
              <Card.Subtitle className="text-muted">Update your address details</Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Street Address</Form.Label>
                  <Form.Control placeholder="123 Main St" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control placeholder="New York" />
                </Form.Group>

                <Row className="mb-3 g-3">
                  <Col>
                    <Form.Group controlId="state">
                      <Form.Label>State / Province</Form.Label>
                      <Form.Control placeholder="NY" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="zipCode">
                      <Form.Label>ZIP / Postal Code</Form.Label>
                      <Form.Control placeholder="10001" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control placeholder="USA" />
                </Form.Group>

                <Button variant="primary" className="w-100 btn-bitradex-warning">Save Changes</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Security Settings */}
      <Card className="bg-dark text-light">
        <Card.Header>
          <Card.Title>Security Settings</Card.Title>
          <Card.Subtitle className="text-muted">Manage your account security and password</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="currentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" placeholder="Enter current password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Enter new password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm new password" />
            </Form.Group>

            <Button variant="primary" className="w-100 btn-bitradex-warning">Change Password</Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          Your password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.
        </Card.Footer>
      </Card>
    </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
