import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Image,
} from "react-bootstrap";

export default function AdminChatPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showTime, setShowTime] = useState({});
  const messagesEndRef = useRef(null);

  if (!localStorage.getItem("admin1")) {
    window.location.href = "/login-admin";
}

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/getUsers");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/chat/${selectedUser._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !selectedUser) return;

    try {
      const res = await axios.post("/send", {
        sender: "admin",
        receiver: selectedUser._id,
        message: input,
      });
      setMessages([...messages, res.data.data]);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickMessage = (index, msg) => {
    setShowTime((prev) => ({ ...prev, [index]: true }));

    setTimeout(() => {
      setShowTime((prev) => ({ ...prev, [index]: false }));
    }, 3000);
  };

  const handleDeleteMessage = async (msgId, index) => {
    try {
      await axios.delete(`/chat/${msgId}`);
      setMessages(messages.filter((_, i) => i !== index));
    } catch (err) {
      console.error(err);
    }
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <Container fluid className="vh-100 p-3" style={{ background: "#001f3f" }}>
      <Row className="h-100">
        {/* Users list */}
        <Col md={3} className="border-end" style={{ overflowY: "auto" }}>
          <h5 className="text-warning mb-3">Users</h5>
          {users.map((user) => (
            <Card
              key={user._id}
              className={`mb-2 ${
                selectedUser?._id === user._id
                  ? "bg-warning text-dark"
                  : "bg-dark text-white"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedUser(user)}
            >
              <Card.Body className="py-2 px-3">
                <strong>{user.name}</strong>
                <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                  {user.email}
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Chat area */}
        <Col md={9} className="d-flex flex-column">
          <Card
            className="flex-grow-1 shadow-lg border-0"
            style={{ borderRadius: "15px", background: "#00264d" }}
          >
            <Card.Body style={{ overflowY: "auto", padding: "20px" }}>
              {selectedUser ? (
                messages.length === 0 ? (
                  <p className="text-center text-warning mt-4">
                    No messages yet.
                  </p>
                ) : (
                  messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`d-flex flex-column ${
                        msg.sender === "admin"
                          ? "align-items-end"
                          : "align-items-start"
                      }`}
                    >
                      <div
                        className="d-flex align-items-end p-3 my-2 rounded shadow-sm"
                        style={{
                          maxWidth: "70%",
                          background:
                            msg.sender === "admin" ? "#ffdc00" : "#003366",
                          color: msg.sender === "admin" ? "#001f3f" : "#fff",
                          borderRadius: "15px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleClickMessage(i, msg)}
                      >
                        {msg.sender !== "admin" && (
                          <Image
                            width={30}
                            height={30}
                            src={
                              selectedUser?.profile_pic ||
                              "data:image/png;base64,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"
                            }
                            roundedCircle
                            className="me-2"
                          />
                        )}

                        <div>
                          <div style={{ fontWeight: "500" }}>{msg.message}</div>
                          {showTime[i] && (
                            <div className="d-flex flex-column align-items-end mt-1">
                              <small
                                className="text-end"
                                style={{ fontSize: "0.7rem", opacity: 0.7 }}
                              >
                                {formatTime(msg.time)}
                              </small>
                              <Button
                                variant="danger"
                                size="sm"
                                className="mt-1 py-0 px-2"
                                onClick={() => handleDeleteMessage(msg._id, i)}
                              >
                                Delete
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : (
                <p className="text-center text-warning mt-4">
                  Select a user to start chatting.
                </p>
              )}
              <div ref={messagesEndRef} />
            </Card.Body>
          </Card>

          {/* Input field */}
          {selectedUser && (
            <div className="d-flex gap-2 mt-2">
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                style={{
                  borderRadius: "20px",
                  border: "none",
                  padding: "12px",
                }}
              />
              <Button
                variant="warning"
                onClick={handleSend}
                style={{
                  borderRadius: "20px",
                  padding: "10px 25px",
                  fontWeight: "500",
                }}
              >
                Send
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
