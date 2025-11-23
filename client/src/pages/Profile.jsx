import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import FadeLoader from "react-spinners/FadeLoader";

import { Card, Form, Button, Row, Col, Image } from "react-bootstrap";
import UserNav from "../components/Nav/UserNav";
import DashboardNav from "../components/Nav/DashboardNav";

const Profile = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user?.profile_pic || null);
  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [addressInfo, setAddressInfo] = useState({
    Street_Address: "",
    city: "",
    state_province: "",
    zip_code: "",
    country: "",
  });
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const newU = localStorage.getItem("user");
  const newUser = JSON.parse(newU);
  const id = newUser._id;

  useEffect(() => {
    const newU = localStorage.getItem("user");
    const newUser = JSON.parse(newU);
    const email = newUser.email;

    const getUser = async () => {
      await axios.post("/getUser", { email }).then((data) => {
        if (data) {
          setUser(data.data);
        }
      });
    };
    getUser();
  }, []);

  const updatePersonalDetails = async () => {
    setLoading(true);
    const { firstName, lastName, email, phoneNumber } = personalDetails;

    if (!firstName) {
      setLoading(false);
      toast.error("Enter First Name!");
      return;
    }

    if (!lastName) {
      setLoading(false);
      toast.error("Enter Last Name!");
      return;
    }

    if (!email) {
      setLoading(false);
      toast.error("Enter Email!");
      return;
    }

    if (!phoneNumber) {
      setLoading(false);
      toast.error("Enter Phone Number!");
      return;
    }

    try {
      const res = await axios.post("/updatepersonaldetails", {
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
      });

      if (res.data.status === "error") {
        setLoading(false);
        toast.error(res.data.message);
      }

      if (res.data.status === "success") {
        setLoading(false);
        toast.success("Personal Details Updated Successfully!");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setPersonalDetails({
          firstName,
          lastName,
          email,
          phoneNumber,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  const updateAddressInfo = async () => {
    setLoading(true);
    const { Street_Address, city, state_province, zip_code, country } =
      addressInfo;

    if (!Street_Address) {
      setLoading(false);
      toast.error("Enter Street Address!");
      return;
    }
    if (!city) {
      setLoading(false);
      toast.error("Enter City Name!");
      return;
    }
    if (!state_province) {
      setLoading(false);
      toast.error("Enter State/Province!");
      return;
    }
    if (!zip_code) {
      setLoading(false);
      toast.error("Enter ZIP Code!");
      return;
    }
    if (!country) {
      setLoading(false);
      toast.error("Enter Country Name!");
      return;
    }

    try {
      const res = await axios.post("/updateAddressInfo", {
        id,
        Street_Address,
        city,
        state_province,
        zip_code,
        country,
      });

      if (res.data.status === "success") {
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Address Information Updated Successfully!");
        setAddressInfo({
          Street_Address: "",
          city: "",
          state_province: "",
          zip_code: "",
          country: "",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  const ressetPassword = async () => {
    setLoading(true);
    const { current, newPassword, confirmPassword } = password;

    if (!current) {
      toast.error("Enter Current Password!");
      setLoading(true);
      return;
    }
    if (!newPassword) {
      toast.error("Enter New-Password!");
      setLoading(true);
      return;
    }
    if (!confirmPassword) {
      toast.error("Enter Confirm Password!");
      setLoading(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Confirm password must match new password!");
      return;
    }

    try {
      const res = await axios.post("/ressetPassword", {
        id,
        current,
        newPassword,
      });

      if (res.data.status === "success") {
        toast.success("Password Updated Successfully");
        setPassword({
          current: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(res.data.message || "Password update failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      toast.error("Only JPG or PNG images allowed");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image size must be less than 3MB");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      toast.error("Choose an image first");
      return;
    }

    const formData = new FormData();
    formData.append("profile_pic", selectedFile);
    formData.append("id", id);

    const res = await axios.post("/uploadProfilePic", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data.status === "success") {
      toast.success("Profile picture updated");
      setPreview(res.data.profile_pic); // base64 returned
    } else {
      toast.error(res.data.message);
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
                className="text-light"
                style={{ borderBottom: "5px solid orange", width: "150px" }}
              >
                Profile
              </h3>
              <p className="text-light">
                Manage your personal information and account settings
              </p>
            </div>

            <Row className="g-4 mb-4">
              {/* Personal Information */}
              <Col md={6}>
                <Card className="bg-dark text-light">
                  <Card.Header>
                    <Card.Title>Personal Information</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Update your personal details
                    </Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      {/* Avatar */}
                      <div className="text-center mb-4">
                        <Image
                          src={user && user.profile_pic}
                          roundedCircle
                          width={96}
                          height={96}
                          className="mb-2"
                        />
                        <input
                          type="file"
                          className="d-block mx-auto mt-2"
                          onChange={handleFileChange}
                        />
                        <button
                          className="btn btn-warning mt-3"
                          onClick={uploadImage}
                        >
                          Upload
                        </button>
                      </div>

                      <Row className="mb-3 g-3">
                        <Col>
                          <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              value={personalDetails.firstName}
                              onChange={(e) =>
                                setPersonalDetails({
                                  ...personalDetails,
                                  firstName: e.target.value,
                                })
                              }
                              placeholder={user && user.firstName}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              value={personalDetails.lastName}
                              onChange={(e) =>
                                setPersonalDetails({
                                  ...personalDetails,
                                  lastName: e.target.value,
                                })
                              }
                              placeholder={user && user.lastName}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
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
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          value={personalDetails.email}
                          onChange={(e) =>
                            setPersonalDetails({
                              ...personalDetails,
                              email: e.target.value,
                            })
                          }
                          type="email"
                          placeholder={user && user.email}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          value={personalDetails.phoneNumber}
                          onChange={(e) =>
                            setPersonalDetails({
                              ...personalDetails,
                              phoneNumber: e.target.value,
                            })
                          }
                          placeholder={user && user.phoneNumber}
                        />
                      </Form.Group>

                      <Button
                        onClick={updatePersonalDetails}
                        variant="primary"
                        className="w-100 btn-bitradex-warning"
                      >
                        Save Changes
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>

              {/* Address Information */}
              <Col md={6}>
                <Card className="bg-dark text-light">
                  <Card.Header>
                    <Card.Title>Address Information</Card.Title>
                    <Card.Subtitle className="text-muted">
                      Update your address details
                    </Card.Subtitle>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Street Address</Form.Label>
                        <Form.Control
                          value={addressInfo.Street_Address}
                          onChange={(e) =>
                            setAddressInfo({
                              ...addressInfo,
                              Street_Address: e.target.value,
                            })
                          }
                          placeholder={user && user.streetAddress}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          value={addressInfo.city}
                          onChange={(e) =>
                            setAddressInfo({
                              ...addressInfo,
                              city: e.target.value,
                            })
                          }
                          placeholder={user && user.city}
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
                      <Row className="mb-3 g-3">
                        <Col>
                          <Form.Group controlId="state">
                            <Form.Label>State / Province</Form.Label>
                            <Form.Control
                              value={addressInfo.state_province}
                              onChange={(e) =>
                                setAddressInfo({
                                  ...addressInfo,
                                  state_province: e.target.value,
                                })
                              }
                              placeholder={user && user.state_province}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="zipCode">
                            <Form.Label>ZIP / Postal Code</Form.Label>
                            <Form.Control
                              value={addressInfo.zip_code}
                              onChange={(e) =>
                                setAddressInfo({
                                  ...addressInfo,
                                  zip_code: e.target.value,
                                })
                              }
                              placeholder={user && user.zip_code}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          value={addressInfo.country}
                          onChange={(e) =>
                            setAddressInfo({
                              ...addressInfo,
                              country: e.target.value,
                            })
                          }
                          placeholder={user && user.country}
                        />
                      </Form.Group>

                      <Button
                        onClick={updateAddressInfo}
                        variant="primary"
                        className="w-100 btn-bitradex-warning"
                      >
                        Save Changes
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Security Settings */}
            <Card className="bg-dark text-light">
              <Card.Header>
                <Card.Title>Security Settings</Card.Title>
                <Card.Subtitle className="text-muted">
                  Manage your account security and password
                </Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="currentPassword">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      value={password.current}
                      onChange={(e) =>
                        setPassword({ ...password, current: e.target.value })
                      }
                      type="password"
                      placeholder="Enter current password"
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
                  <Form.Group className="mb-3" controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      value={password.newPassword}
                      onChange={(e) =>
                        setPassword({
                          ...password,
                          newPassword: e.target.value,
                        })
                      }
                      type="password"
                      placeholder="Enter new password"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      value={password.confirmPassword}
                      onChange={(e) =>
                        setPassword({
                          ...password,
                          confirmPassword: e.target.value,
                        })
                      }
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </Form.Group>

                  <Button
                    onClick={ressetPassword}
                    variant="primary"
                    className="w-100 btn-bitradex-warning"
                  >
                    Change Password
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="text-muted text-center">
                Your password must be at least 8 characters long and include
                uppercase, lowercase, numbers, and special characters.
              </Card.Footer>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
