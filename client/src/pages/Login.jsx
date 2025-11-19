import React from "react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Bitcoin } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FadeLoader from "react-spinners/FadeLoader";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  const login = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { email, password } = data;

    await axios
      .post("/login", {
        email,
        password,
      })
      .then((data) => {
        if (!data.data.error) {
          localStorage.setItem("user", JSON.stringify(data.data));
          toast.success("Logged in successfully. Welcome!");
          setData({
            email: "",
            password: "",
          });
          setLoading(false);
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        } else {
          setLoading(false);
          toast.error(data.data.error);
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
              <Bitcoin className="h-6 w-6 text-bitradex-orange" />
              <span className="ms-2 fs-4 text-light fw-bold">BitRadex</span>
            </Link>
          </div>
          <h5 className="fw-bold text-light mb-1">Sign in</h5>
          <p style={{ fontSize: "15px" }} className="bitradex-text-muted mb-0">
            Enter your email and password to access your account
          </p>
        </Card.Header>

        <Card.Body className="dark">
          <Form onSubmit={login} className="d-flex flex-column gap-3">
            <Form.Group controlId="email">
              <Form.Label className="bitradex-text-muted">Email</Form.Label>
              <Form.Control
                className="bitradex-input"
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="$Enter email"
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
                <Link
                  to="/forgot-password"
                  className="small text-bitradex-orange text-decoration-underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Form.Control
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                type="password"
                placeholder="Enter Password"
                className="bitradex-input"
              />
            </Form.Group>

            <Button type="submit" className="w-100 p-2 btn-bitradex-warning ">
              Sign in
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="dark border-0 text-center">
          <div className="small text-light mt-2">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-bitradex-orange text-decoration-underline"
            >
              Sign up
            </Link>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Login;
