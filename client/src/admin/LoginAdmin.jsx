import React from "react";
import { Bitcoin } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";

const LoginAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  const login = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { email, password } = data;

    await axios
      .post("/adminAuth", {
        email,
        password,
      })
      .then((data) => {
        if (data.data.error) {
          setLoading(false);
          toast.error(data.data.error);
        } else if (data.data.new) {
          toast.success(data.data.new);
          setLoading(false);
          setData({
            email: "",
            password: "",
          });
        } else {
          localStorage.setItem("admin1", JSON.stringify(data.data));
          toast.success("Logged in successfully. Welcome!");
          setData({
            email: "",
            password: "",
          });
          setLoading(false);
          setTimeout(() => {
            window.location.href = "/admin";
          }, 2000);
        }
      });
  };

  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center p-4">
      <Card className="w-100" style={{ maxWidth: "480px", border: "none" }}>
        <Card.Header className="dark text-center">
          <div className="d-flex justify-content-center align-items-center mb-2">
            <Link
              to="/"
              className="d-flex align-items-center text-decoration-none"
            >
              <Bitcoin className="h-6 w-6" style={{ color: "orange" }} />
              <span className="ms-2 fs-4 text-light fw-bold">Kaptil-Fluss</span>
            </Link>
          </div>
          <h5 className="fw-bold text-light mb-1">Admin | Sign in</h5>
          <p style={{ fontSize: "15px" }} className="bitradex-text-muted mb-0">
            Enter your email and password to access your account
          </p>
        </Card.Header>

        <Card.Body className="dark">
          <Form onSubmit={login} className="d-flex flex-column gap-3">
            <Form.Group controlId="email">
              <Form.Label className="bitradex-text-muted">Email</Form.Label>
              <Form.Control
                type="email"
                className="bitradex-input"
                placeholder="john.doe@example.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </Form.Group>

            <FadeLoader
              color="#36d7b7"
              loading={loading}
              speedMultiplier={3}
              style={{
                textAlign: "center",
                position: "absolute",
                left: "50%",
                zIndex: "1",
              }}
            />

            <Form.Group controlId="password">
              <div className="d-flex justify-content-between align-items-center">
                <Form.Label className="bitradex-text-muted">
                  Password
                </Form.Label>
              </div>
              <Form.Control
                type="password"
                placeholder="Enter password"
                className="bitradex-input"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </Form.Group>

            <Button type="submit" className="w-100 p-2 btn-bitradex-warning ">
              Sign in
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginAdmin;
