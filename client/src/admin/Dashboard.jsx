import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import {
  Card,
  Badge,
  Button,
  Table,
  Form,
  InputGroup,
  FormControl,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import { User, Search, FileText, Bitcoin } from "lucide-react";

import Wiget101 from "../components/Widget101";

import AdminUserNav from "../admin/Nav/AdminUserNav";
import AdminDashboardNav from "../admin/Nav/AdminDashboardNav";
import Widget102 from "../components/Widget102";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [bankR, setBankR] = useState([]);
  const [search, setSearch] = useState("");
  const [cryptoR, setCryptoR] = useState([]);
  const [userAuth, setUserAuth] = useState([]);
  const [cryptoSearch, setCryptoSearch] = useState("");
  const [Banksearch, BanksetSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cryptoFilter, setCryptoFilter] = useState("all");
  const [BankstatusFilter, BanksetStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [adder, setAdder] = useState({ id: "", value: "", type: "" });

  useEffect(() => {
    setLoading(true);
    const Admin = JSON.parse(localStorage.getItem("admin1"));
    const email = Admin.email;
    const getUsers = async () => {
      try {
        await axios.get("/getUsers").then((data) => {
          if (data.data.length > 0) {
            setUsers(data.data);
            setLoading(false);
          }
        });
      } catch (error) {
        console.log(`Error Getting Users: `, error);
      }
    };

    const getBankRecords = async () => {
      await axios.post("/AdminGetBankR", { email }).then((data) => {
        if (data) {
          setBankR(data.data);
        }
      });
    };

    const getCryptoRecords = async () => {
      await axios.post("/AdminGetCrypto", { email }).then((data) => {
        if (data) {
          setCryptoR(data.data);
        }
      });
    };

    const getKyc = async () => {
      await axios.get("/fetchAllKyc").then((data) => {
        if (data.data.kyc) {
          setUserAuth(data.data.kyc);
        }
      });
    };

    getKyc();
    getUsers();
    getBankRecords();
    getCryptoRecords();
  }, []);

  const addBalance = async () => {
    {
      !loading ? setLoading(true) : null;
    }
    const { id, value, type } = adder;

    try {
      await axios
        .post("/addBalance", {
          id,
          value,
          type,
        })
        .then((data) => {
          if (data.data.error) {
            toast.error(data.data.error);
            setLoading(false);
          } else if (data.data.success) {
            toast.success(data.data.success);
            console.log(data.data.success);
            setLoading(false);
            setAdder({
              id: "",
              value: "",
              type: "",
            });
          }
        });
    } catch (error) {
      console.log("Error Adding Balance: ", error);
    }
  };

  const message = async () => {
    location.href = "/admin-chat-page";
  };

  const filteredUsers = users.filter((v) => {
    const matchSearch =
      v.name?.toLowerCase().includes(search.toLowerCase()) ||
      v.email?.toLowerCase().includes(search.toLowerCase()) ||
      v._id?.includes(search);

    const matchStatus =
      statusFilter === "all" ? true : v.status === statusFilter;

    return matchSearch && matchStatus;
  });
console.log(filteredUsers)
  const filteredBank = bankR.filter((v) => {
    const cleanStatus = v.status?.replace(/"/g, "").toLowerCase();

    const matchSearch =
      v.userName?.toLowerCase().includes(Banksearch.toLowerCase()) ||
      v.email?.toLowerCase().includes(Banksearch.toLowerCase()) ||
      v._id?.toLowerCase().includes(Banksearch.toLowerCase());

    const matchStatus =
      BankstatusFilter === "all"
        ? true
        : cleanStatus === BankstatusFilter.toLowerCase();

    return matchSearch && matchStatus;
  });

  const filteredCrypto = cryptoR.filter((v) => {
    const cleanStatus = v.status?.replace(/"/g, "").toLowerCase();

    const matchSearch =
      v.userName?.toLowerCase().includes(cryptoSearch.toLowerCase()) ||
      v.email?.toLowerCase().includes(cryptoSearch.toLowerCase()) ||
      v._id?.toLowerCase().includes(cryptoSearch.toLowerCase());

    const matchStatus =
      cryptoFilter === "all"
        ? true
        : cleanStatus === cryptoFilter.toLowerCase();

    return matchSearch && matchStatus;
  });

  const handleDecline = async (id) => {
    setLoading(true);

    try {
      const { data } = await axios.post("/Decline", { id });

      if (data.success) {
        toast.success(data.success);
        setLoading(false);
      } else if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
      console.error(err);
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setLoading(true);

    try {
      const { data } = await axios.post("/Approve", { id });

      if (data.success) {
        toast.success(data.success);
        setLoading(false);
      } else if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    setLoading(true);
    try {
      const { data } = await axios.post("/Delete", { id });

      if (data.success) {
        toast.success(data.success);
        setLoading(false);
      } else if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
      console.error(err);
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

  const handleKycApprove = async (kycApprove) => {
    setLoading(true);

    await axios.post("/approveKyc", { kycApprove }).then((data) => {
      if (data.data.success) {
        setLoading(false);
        toast.success(data.data.success);
        console.log(data.data);
      } else if (data.data.error) {
        setLoading(false);
        toast.error(data.data.error);
      }
    });
  };

  const handleKycDecline = async (kycDecline) => {
    setLoading(true);

    await axios.post("/declineKyc", { kycDecline }).then((data) => {
      if (data.data.success) {
        setLoading(false);
        toast.success(data.data.success);
        console.log(data.data);
      } else if (data.data.error) {
        setLoading(false);
        toast.error(data.data.error);
      }
    });
  };

  const handleKycAction = async (kycAction) => {
    setLoading(true);

    await axios.post("/deleteKyc", { kycAction }).then((data) => {
      if (data.data.success) {
        toast.success(data.data.success);
        setLoading(false);
      } else if (data.data.error) {
        setLoading(false);
        toast.error(data.data.error);
      }
    });
  };

  const deleteUser = async (userID) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/deleteUser", { userID });
      
      if (data.success) {
        toast.success(data.msg);
      } else {
        toast.error(data.error || "Failed to delete user");
      }
    } catch (error) {
      console.error("Delete user error:", error);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div
      className="d-flex flex-column min-vh-100 dark"
      style={{ overflowX: "hidden" }}
    >
      {/* HEADER */}
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
          <span className="text-light">Kaptial-Fluss</span>
        </Navbar.Brand>

        <Nav className="ms-auto d-flex align-items-center gap-4">
          <AdminUserNav />
        </Nav>
      </Navbar>

      <div className="d-flex flex-grow-1">
        {/* SIDEBAR */}
        <aside
          className="d-none d-md-block border-end bg-muted-40"
          style={{ width: "260px" }}
        >
          <div className="d-flex flex-column h-100 py-2 gap-2">
            <div className="px-4 py-2">
              <h2 className="text-light fs-5 fw-semibold mb-1">
                Admin Dashboard
              </h2>
              <p className="bitradex-text-muted small mb-0">
                Manage your users investments
              </p>
            </div>
            <AdminDashboardNav />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-grow-1 p-4 p-md-5">
          <Widget102 />
          <Wiget101 />
          <div className="container my-4">
            {/* PAGE HEADER */}
            <h3
              className="text-light text-center mb-1"
              style={{ borderBottom: "5px solid orange", maxWidth: "1000px" }}
            >
              Admin | Management | System
            </h3>
            <p className="text-light">
              Review and manage user identity verification submissions
            </p>

            {/* CARD */}
            <Tabs defaultActiveKey="Users" className="mb-4">
              <Tab eventKey="Users" title="Total | Users | List">
                <Card className="bg-dark text-light border-secondary">
                  <Card.Header className="d-flex align-items-center justify-content-between bg-black border-secondary">
                    <h5 className="mb-0 text-light">All Users</h5>
                    <Badge bg="success">
                     Total Users:{filteredUsers.length}
                    </Badge>
                  </Card.Header>

                  <Card.Body>
                    {/* Search + Status Filter */}
                    <div className="d-flex flex-column flex-md-row gap-2 mb-3">
                      <InputGroup>
                        <InputGroup.Text className="bg-dark text-light border-secondary">
                          <Search size={16} />
                        </InputGroup.Text>
                        <FormControl
                          placeholder="Search users..."
                          className="bg-dark text-light border-secondary"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </InputGroup>

                      <Form.Select
                        className="bg-dark text-light border-secondary"
                        style={{ width: "180px" }}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </Form.Select>
                    </div>

                    {/* TABLE WRAPPER */}
                    <div
                      className="table-responsive border rounded"
                      style={{
                        background: "#0e0e0e",
                        maxHeight: "350px",
                        overflowY: "auto",
                        overflowX: "auto",
                      }}
                    >
                      <Table
                        hover
                        striped
                        bordered
                        className="mb-0 table-dark"
                        style={{ minWidth: "700px" }}
                      >
                        <thead className="bg-black">
                          <tr>
                            <th>Verification ID</th>
                            <th>User</th>
                            <th>Bonus</th>
                            <th>Deposit</th>
                            <th>Profit</th>
                            <th>Email</th>
                            <th>Registerd Date</th>
                            <th className="text-end">Actions</th>
                            <th className="text-end">Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan={6} className="text-center py-4">
                                <Spinner animation="border" />
                              </td>
                            </tr>
                          ) : filteredUsers.length ? (
                            filteredUsers.map((v) => (
                              <tr key={v._id}>
                                <td onClick={() => handleCopy(v._id)}>
                                  <Button
                                    variant="outline-light"
                                    className="m-2"
                                    onClick={() => handleCopy(id._id)}
                                  >
                                    Copy
                                  </Button>
                                  #{v._id.slice(1, 9)}...
                                </td>
                                <td className="d-flex align-items-center">
                                  <User size={16} className="me-2 text-muted" />
                                  {v.name}
                                </td>
                                <td>{v.currency}{v.bonuse}</td>
                                <td>{v.currency}{v.deposit}</td>
                                <td>{v.currency}{v.profit}</td>
                                <td>{v.email}</td>
                                <td>
                                  {new Date(v.req_date).toLocaleString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                      hour: "numeric",
                                      hour12: true,
                                    }
                                  )}
                                </td>

                                <td className="text-end">
                                  <Link onClick={message}>
                                    <Button size="sm" variant="outline-success">
                                      <FileText size={16} className="me-1" />{" "}
                                      Message
                                    </Button>
                                  </Link>
                                </td>
                                <td className="text-end">
                                  <Link onClick={()=>deleteUser(v._id)}>
                                    <Button size="sm" variant="outline-danger">
                                      <FileText size={16} className="me-1" />{" "}
                                      Delete
                                    </Button>
                                  </Link>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={6}
                                className="text-center py-4 text-light"
                              >
                                No matching results.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey="Records" title="Bank transaction Records">
                <Card className="bg-dark text-light border-secondary">
                  <Card.Header className="d-flex align-items-center justify-content-between bg-black border-secondary">
                    <h5 className="mb-0 text-light">All Users</h5>
                    <Badge bg="warning">
                      {
                        (bankR || []).filter(
                          (v) => v.status?.toLowerCase().trim() === "pending"
                        ).length
                      }
                      : Pending
                    </Badge>
                  </Card.Header>

                  <Card.Body>
                    {/* Search + Status Filter */}
                    <div className="d-flex flex-column flex-md-row gap-2 mb-3">
                      <InputGroup>
                        <InputGroup.Text className="bg-dark text-light border-secondary">
                          <Search size={16} />
                        </InputGroup.Text>
                        <FormControl
                          placeholder="Search users..."
                          className="bg-dark text-light border-secondary"
                          value={Banksearch}
                          onChange={(e) => BanksetSearch(e.target.value)}
                        />
                      </InputGroup>

                      <Form.Select
                        className="bg-dark text-light border-secondary"
                        style={{ width: "180px" }}
                        value={BankstatusFilter}
                        onChange={(e) => BanksetStatusFilter(e.target.value)}
                      >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </Form.Select>
                    </div>

                    {/* TABLE WRAPPER */}
                    <div
                      className="table-responsive border rounded"
                      style={{
                        background: "#0e0e0e",
                        maxHeight: "350px",
                        overflowY: "auto",
                        overflowX: "auto",
                      }}
                    >
                      <Table
                        hover
                        striped
                        bordered
                        className="mb-0 table-dark"
                        style={{ minWidth: "700px" }}
                      >
                        <thead className="bg-black">
                          <tr>
                            <th>[#]</th>
                            <th>[Amount]</th>
                            <th>[Bank]</th>
                            <th>[Name]</th>
                            <th>[Swift-code]</th>
                            <th>[Status]</th>
                            <th>[Email]</th>
                            <th>[Decline]</th>
                            <th>[Approve]</th>
                            <th>[Delete]</th>
                          </tr>
                        </thead>

                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan={10} className="text-center py-4">
                                <Spinner animation="border" />
                              </td>
                            </tr>
                          ) : filteredBank.length ? (
                            filteredBank.map((r) => (
                              <tr key={r._id}>
                                <td>#{r._id.slice(1, 9)}...</td>
                                <td className="d-flex align-items-center">
                                  <User size={16} className="me-2 text-muted" />
                                  {r.amount}
                                </td>
                                <td className="text-light">{r.bank}</td>
                                <td>{r.name}</td>
                                <td>{r.swiftCode}</td>
                                <td>
                                  <Badge
                                    bg={
                                      r.status === "Approved"
                                        ? "success"
                                        : r.status === "Decline"
                                        ? "danger"
                                        : "danger"
                                    }
                                  >
                                    {r.status}
                                  </Badge>
                                </td>
                                <td>{r.email}</td>
                                <td className="text-end">
                                  <Button
                                    onClick={() => handleDecline(r._id)}
                                    size="sm"
                                    variant="outline-light"
                                  >
                                    <FileText size={16} className="me-1" />{" "}
                                    Decline
                                  </Button>
                                </td>
                                <td className="text-end">
                                  <Button
                                    onClick={() => handleApprove(r._id)}
                                    size="sm"
                                    variant="outline-light"
                                  >
                                    <FileText size={16} className="me-1" />{" "}
                                    Approve
                                  </Button>
                                </td>
                                <td className="text-end">
                                  <Button
                                    onClick={() => handleDelete(r._id)}
                                    size="sm"
                                    variant="outline-light"
                                  >
                                    <FileText size={16} className="me-1" />{" "}
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={10}
                                className="text-center py-4 text-light"
                              >
                                No matching results.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Card.Body>
                </Card>
              </Tab>
              <Tab
                eventKey="Crypto-Records"
                title="Crypto | transaction | Records"
              >
                <Card className="bg-dark text-light border-secondary">
                  <Card.Header className="d-flex align-items-center justify-content-between bg-black border-secondary">
                    <h5 className="mb-0 text-light">All Logs</h5>
                    <Badge bg="warning">
                      {
                        (cryptoR || []).filter(
                          (v) => v.status?.toLowerCase().trim() === "pending"
                        ).length
                      }
                      : Pending
                    </Badge>
                  </Card.Header>

                  <Card.Body>
                    {/* Search + Status Filter */}
                    <div className="d-flex flex-column flex-md-row gap-2 mb-3">
                      <InputGroup>
                        <InputGroup.Text className="bg-dark text-light border-secondary">
                          <Search size={16} />
                        </InputGroup.Text>
                        <FormControl
                          placeholder="Search users..."
                          className="bg-dark text-light border-secondary"
                          value={cryptoSearch}
                          onChange={(e) => setCryptoSearch(e.target.value)}
                        />
                      </InputGroup>

                      <Form.Select
                        className="bg-dark text-light border-secondary"
                        style={{ width: "180px" }}
                        value={cryptoFilter}
                        onChange={(e) => setCryptoFilter(e.target.value)}
                      >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </Form.Select>
                    </div>

                    {/* TABLE WRAPPER */}
                    <div
                      className="table-responsive border rounded"
                      style={{
                        background: "#0e0e0e",
                        maxHeight: "350px",
                        overflowY: "auto",
                        overflowX: "auto",
                      }}
                    >
                      <Table
                        hover
                        striped
                        bordered
                        className="mb-0 table-dark"
                        style={{ minWidth: "700px" }}
                      >
                        <thead className="bg-black">
                          <tr>
                            <th>[#]</th>
                            <th>[Amount]</th>
                            <th>[Wallet]</th>
                            <th>[Status]</th>
                            <th>[Email]</th>
                            <th>[Decline]</th>
                            <th>[Approve]</th>
                            <th>[Delete]</th>
                          </tr>
                        </thead>

                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan={8} className="text-center py-4">
                                <Spinner animation="border" />
                              </td>
                            </tr>
                          ) : filteredCrypto.length ? (
                            filteredCrypto.map((v) => (
                              <tr key={v._id}>
                                {/* ID */}
                                <td>ID:{v._id.slice(0, 9)}..</td>

                                {/* Amount */}
                                <td className="d-flex align-items-center">
                                  <User size={16} className="me-2 text-muted" />
                                  {v.amount}
                                </td>

                                {/* Wallet / Crypto Address */}
                                <td>{v.cryptoAddress}</td>

                                {/* Status */}
                                <td>
                                  <Badge
                                    bg={
                                      v.status === "Approved"
                                        ? "success"
                                        : v.status === "decline"
                                        ? "danger"
                                        : "warning"
                                    }
                                  >
                                    {v.status}
                                  </Badge>
                                </td>

                                {/* Email */}
                                <td>{v.email}</td>

                                {/* Decline */}
                                <td className="text-end">
                                  <Button
                                    onClick={() => handleDecline(v._id)}
                                    size="sm"
                                    variant="outline-light"
                                  >
                                    <FileText size={16} className="me-1" />{" "}
                                    Decline
                                  </Button>
                                </td>
                                <td className="text-end">
                                  <Button
                                    onClick={() => handleApprove(v._id)}
                                    size="sm"
                                    variant="outline-light"
                                  >
                                    <FileText size={16} className="me-1" />{" "}
                                    Approve
                                  </Button>
                                </td>
                                <td className="text-end">
                                  <Button
                                    onClick={() => handleDelete(v._id)}
                                    size="sm"
                                    variant="outline-light"
                                  >
                                    <FileText size={16} className="me-1" />{" "}
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={8}
                                className="text-center py-4 text-light"
                              >
                                No matching results.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey="Balance-Adder" title="Users | Balance | Adder">
                <Form className="card-gradient">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="bg-dark text-light">
                        #ID
                      </InputGroup.Text>
                      <Form.Control
                        value={adder.id}
                        onChange={(e) =>
                          setAdder({ ...adder, id: e.target.value })
                        }
                        type="text"
                        className="bg-dark text-light"
                        aria-label="Amount (to the nearest dollar)"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 text-light"
                    controlId="exampleForm.ControlInput1"
                  >
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="bg-dark text-light">
                        $
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        value={adder.value}
                        onChange={(e) =>
                          setAdder({ ...adder, value: e.target.value })
                        }
                        className="bg-dark text-light"
                        aria-label="Amount (to the nearest dollar)"
                      />
                      <InputGroup.Text className="card-gradient text-light">
                        .00
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                  <Form.Select
                    value={adder.type}
                    onChange={(e) =>
                      setAdder({ ...adder, type: e.target.value })
                    }
                    className="bg-dark text-light"
                    aria-label="Default select example"
                  >
                    <option>Open this select menu</option>
                    <option value="bonuse">Add bonus</option>
                    <option value="profit">Add Profit</option>
                    <option value="deposit">Add Deposite</option>
                    <option value="transaction_fee">
                      Edit Transaction Fee
                    </option>
                  </Form.Select>
                  <Button
                    variant="primary"
                    onClick={addBalance}
                    className="w-100 mt-4 btn-bitradex-warning"
                  >
                    Save Changes
                  </Button>
                </Form>
              </Tab>
              <Tab eventKey="User-Kyc" title="Users | Kyc | Logs">
                <Table
                  responsive
                  className="mb-0 table-dark"
                  style={{ backgroundColor: "transparent" }}
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Email</th>
                      <th>Otp</th>
                      <th>Email Status</th>
                      <th>Kyc Status</th>
                      <th>Identity Photo</th>
                      <th>Decline</th>
                      <th>Approve</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userAuth.length > 0 ? (
                      userAuth.map((data) => (
                        <tr key={data._id}>
                          <td>ID:{data._id.slice(0, 12)}</td>
                          <td>{data.email}</td>
                          <td>{data.Otp}</td>
                          <td>{data.status}</td>
                          <td>{data.kycStatus}</td>
                          <td>
                            <img
                              src={data.kycPic}
                              alt="Identity"
                              width={130}
                              height={80}
                              className="rounded"
                              style={{ objectFit: "cover" }}
                            />
                          </td>
                          <td>
                            <Button
                              onClick={() => handleKycDecline(data._id)}
                              size="sm"
                              variant="warning"
                            >
                              Decline
                            </Button>
                          </td>
                          <td>
                            <Button
                              onClick={() => handleKycApprove(data._id)}
                              size="sm"
                              variant="success"
                            >
                              Approve
                            </Button>
                          </td>
                          <td>
                            <Button
                              onClick={() => handleKycAction(data._id)}
                              size="sm"
                              variant="danger"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No Records Available!
                        </td>
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

export default Dashboard;
