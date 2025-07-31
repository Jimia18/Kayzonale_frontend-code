import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const AddUser = () => {
  const [form, setForm] = React.useState({ name: "", email: "" });
  const [message, setMessage] = React.useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/users", form);
      setMessage("User added successfully!");
      setForm({ name: "", email: "" });
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || "Error adding user.");
      } else {
        setMessage("Error adding user.");
      }
    }
  };

  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="p-4">
      <h4>Add User</h4>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Add User
        </Button>
      </Form>
    </div>
  );
};

export default AddUser;
