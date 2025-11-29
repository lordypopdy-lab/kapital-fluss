import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState({});
  const messagesEndRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      window.location.href = "/login";
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/chat/${user._id}`);
        setMessages(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !user?._id) return;

    try {
      const res = await axios.post("/send", {
        sender: user._id,
        receiver: "admin",
        message: input,
      });

      setMessages((prev) => [...prev, res.data.data]);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickMessage = (index) => {
    setShowOptions((prev) => ({ ...prev, [index]: true }));

    setTimeout(() => {
      setShowOptions((prev) => ({ ...prev, [index]: false }));
    }, 5000);
  };

  const handleDeleteMessage = async (msgId, index) => {
    try {
      await axios.delete(`/delete/${msgId}`);
      setMessages((prev) => prev.filter((_, idx) => idx !== index));
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
    <Container
      fluid
      className="p-3 d-flex flex-column vh-100"
      style={{ background: "#001f3f" }}
    >
      <Row className="flex-grow-1 overflow-auto mb-3">
        <Col md={{ span: 8, offset: 2 }}>
          <Card
            className="shadow-lg border-0 h-100"
            style={{ borderRadius: "15px", background: "#00264d" }}
          >
            <Card.Body
              className="d-flex flex-column"
              style={{ overflowY: "auto", padding: "20px" }}
            >
              {messages.length === 0 ? (
                <p
                  className="text-center text-warning mt-4"
                  style={{ fontSize: "1rem" }}
                >
                  No messages yet. Start chatting...
                </p>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`d-flex flex-column ${
                      msg.sender === user._id
                        ? "align-items-end"
                        : "align-items-start"
                    }`}
                  >
                    <div
                      className="d-flex align-items-end p-3 my-2 rounded shadow-sm"
                      style={{
                        maxWidth: "75%",
                        background:
                          msg.sender === user._id ? "#ffdc00" : "#003366",
                        color: msg.sender === user._id ? "#001f3f" : "#fff",
                        borderRadius: "15px",
                        boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
                        cursor: "pointer",
                      }}
                      onClick={() => handleClickMessage(i)}
                    >
                      {msg.sender !== user._id && (
                        <Image
                          width={30}
                          height={30}
                          src="data:image/png;base64,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"
                          roundedCircle
                          className="me-2"
                        />
                      )}

                      <div>
                        <div style={{ fontWeight: "500" }}>{msg.message}</div>

                        {showOptions[i] && (
                          <div className="d-flex flex-column align-items-end mt-1">
                            <small
                              className="d-block text-end"
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
              )}
              <div ref={messagesEndRef} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              style={{ borderRadius: "20px", border: "none", padding: "12px" }}
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
        </Col>
      </Row>
    </Container>
  );
}
