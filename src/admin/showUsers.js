import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Spinner, Modal, Form } from "react-bootstrap";
import DashboardLayout from "./dashboardLayout";
import AdminSidebar from "../components/AdminSidebar";
import axios from "axios";
import { toast } from "react-toastify";

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const token =
    localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
  const userType =
    localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  useEffect(() => {
    if (!token || userType !== "admin") {
      toast.error("Access denied. Only admins can access this page.");
      navigate("/");
    }
  }, [token, userType, navigate]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error.response || error.message);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token && userType === "admin") {
      fetchUsers();
    }
  }, [fetchUsers, token, userType]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      setUsers((prev) => prev.filter((user) => user.id !== id));

      await axios.delete(`http://localhost:5000/api/v1/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User deleted successfully");
    } catch (err) {
      console.error("❌ Delete error:", err);
      fetchUsers();

      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error(err.response?.data?.error || "Failed to delete user");
      }
    }
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setShowEditModal(true);
  };

  return (
    <DashboardLayout
      title="Users"
      description="Manage all registered Users"
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      isMobile={isMobile}
      SidebarComponent={AdminSidebar}
    >
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Type</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.contact}</td>
                    <td>{user.type}</td>
                    <td>{new Date(user.created_at).toLocaleString()}</td>
                    <td>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="me-2"
                        onClick={() => openEditModal(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Edit User Modal */}
          {editUser && (
            <EditUserModal
              user={editUser}
              show={showEditModal}
              onHide={() => setShowEditModal(false)}
              onUpdate={fetchUsers}
              token={token}
            />
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default UsersPage;

// ---------------- EditUserModal Component ----------------

const EditUserModal = ({ user, show, onHide, onUpdate, token }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    contact: user.contact,
    user_type: user.type,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/v1/users/edit/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User updated successfully");
      onHide();
      onUpdate(); // refresh user list
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.error || "Failed to update user");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="firstName" className="mb-2">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="lastName" className="mb-2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="contact" className="mb-2">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="user_type" className="mb-2">
            <Form.Label>User Type</Form.Label>
            <Form.Select
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="client">Client</option>
              <option  value= "staff">Staff</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
