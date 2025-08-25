import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  Tab,
  Tabs,
  ListGroup,
  Badge,
  Modal
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";

const ClientProfilePage = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact: "",
    user_type: "client"
  });
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState("");
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  // Fetch orders when the orders tab is activated
  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchUserData = async () => {
    try {
      const response = await api.get("/user/profile");
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setError("Failed to load profile data");
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      // This endpoint would need to be implemented in your backend
      const response = await api.get("/orders/my-orders");
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to load order history");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError("");

    try {
      // Use the edit endpoint with the user's ID
      const response = await api.put(`/users/edit/${userData.user_id}`, userData);
      setUserData(response.data.user);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      setError(error.response?.data?.error || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setChangingPassword(true);
    setError("");

    if (passwordData.new_password !== passwordData.confirm_password) {
      setError("New passwords do not match");
      setChangingPassword(false);
      return;
    }

    try {
      // Use the edit endpoint with password field
      const payload = {
        password: passwordData.new_password,
        current_password: passwordData.current_password
      };
      
      await api.put(`/users/edit/${userData.user_id}`, payload);
      toast.success("Password updated successfully!");
      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: ""
      });
    } catch (error) {
      console.error("Failed to update password:", error);
      setError(error.response?.data?.error || "Failed to update password");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete(`/users/delete/${userData.id}`);
      toast.info("Your account has been deleted");
      // Clear local storage and redirect to home
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
      setError(error.response?.data?.error || "Failed to delete account");
      setShowDeleteModal(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "danger";
      case "Processing":
        return "info";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading your profile...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h2 className="mb-4">My Profile</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Tabs
            activeKey={activeTab}
            onSelect={(tab) => setActiveTab(tab)}
            className="mb-4"
          >
            <Tab eventKey="profile" title="Profile Information">
              <Card>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="first_name"
                            value={userData.first_name}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="last_name"
                            value={userData.last_name}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="contact"
                            value={userData.contact}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <div className="d-flex justify-content-between">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={updating}
                      >
                        {updating ? "Updating..." : "Update Profile"}
                      </Button>
                      
                      <Button 
                        variant="outline-danger" 
                        onClick={() => setShowDeleteModal(true)}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Tab>
            
            <Tab eventKey="security" title="Security">
              <Card>
                <Card.Body>
                  <h5>Change Password</h5>
                  <Form onSubmit={handlePasswordSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="current_password"
                        value={passwordData.current_password}
                        onChange={handlePasswordChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="new_password"
                        value={passwordData.new_password}
                        onChange={handlePasswordChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirm_password"
                        value={passwordData.confirm_password}
                        onChange={handlePasswordChange}
                        required
                      />
                    </Form.Group>
                    <Button 
                      variant="primary" 
                      type="submit"
                      disabled={changingPassword}
                    >
                      {changingPassword ? "Updating..." : "Update Password"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Tab>
            
            <Tab eventKey="orders" title="Order History">
              <Card>
                <Card.Body>
                  {orders.length === 0 ? (
                    <div className="text-center py-4">
                      <p>You haven't placed any orders yet.</p>
                      <Button variant="primary" onClick={() => navigate("/products")}>
                        Browse Products
                      </Button>
                    </div>
                  ) : (
                    <ListGroup variant="flush">
                      {orders.map(order => (
                        <ListGroup.Item key={order.order_id} className="px-0">
                          <Row className="align-items-center">
                            <Col md={3}>
                              <strong>Order #{order.order_id}</strong>
                              <div className="text-muted small">
                                {formatDate(order.created_at)}
                              </div>
                            </Col>
                            <Col md={3}>
                              <Badge bg={getStatusVariant(order.status)}>
                                {order.status}
                              </Badge>
                            </Col>
                            <Col md={3}>
                              UGX {order.total_amount?.toLocaleString()}
                            </Col>
                            <Col md={3} className="text-end">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => navigate(`/order-details/${order.order_id}`)}
                              >
                                View Details
                              </Button>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
      
      {/* Delete Account Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
          <p className="text-danger">
            <strong>Warning:</strong> All your data, including order history, will be permanently deleted.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete My Account
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ClientProfilePage;