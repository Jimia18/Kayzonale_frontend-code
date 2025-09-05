import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, Button, Form, Modal } from "react-bootstrap";
import { useCart } from "../components/cartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import axios from "axios";  

const CheckoutPaymentsPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingNotes, setShippingNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientInfo, setClientInfo] = useState(null);
  const [guestInfo, setGuestInfo] = useState({ name: "", phone: "", address: "" });
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const navigate = useNavigate();

  // Fetch client info for logged-in users
  useEffect(() => {
    const fetchClientInfo = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
        const response =  await axios.get(`${API_BASE_URL}/user/profile`);
        setClientInfo(response.data);
      } catch (error) {
        console.warn("No logged-in user, proceeding as guest");
      }
    };
    fetchClientInfo();
  }, []);

  // Calculate total
  const getTotal = () => cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  // Phone validation
  const validatePhoneNumber = (number) => /^(077|078|075|070|074)\d{7}$/.test(number);

  // Card validation
  const validateCardDetails = () => {
    const { number, expiry, cvv, name } = cardDetails;
    return number.length >= 16 && expiry.length === 5 && cvv.length >= 3 && name;
  };

  // Create order
  const createOrder = async () => {
    try {
      const payload = {
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity || 1,
          price: item.price,
        })),
        payment: paymentMethod,
        guest_info: clientInfo ? null : guestInfo,
        shipping_notes: shippingNotes,
      };
      const response = await api.post("/orders/checkout", payload);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.response?.data?.error || "Order creation failed");
    }
  };

  // Process payment
  const processPayment = async (orderId, amount) => {
    try {
      let reference = "";
      if (paymentMethod === "mobile") reference = phoneNumber;
      else if (paymentMethod === "card") reference = `CARD-${cardDetails.number.slice(-4)}`;
      else reference = `CASH-${Date.now()}`;

      const payload = { order_id: orderId, amount, method: paymentMethod, reference };
      const response = await api.post("/api/v1/payments/checkout", payload);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.response?.data?.error || "Payment processing failed");
    }
  };

  // Checkout handler
  const handleCheckout = async () => {
    if (!cartItems.length) return toast.error("Your cart is empty");

    // Guest validation
    if (!clientInfo) {
      const { name, phone, address } = guestInfo;
      if (!name || !phone || !address) return toast.error("Please fill in your delivery info");
      if (!validatePhoneNumber(phone)) return toast.error("Please enter a valid Ugandan phone number");
    }

    if (paymentMethod === "mobile" && !validatePhoneNumber(phoneNumber)) return toast.error("Invalid mobile money number");
    if (paymentMethod === "card" && !validateCardDetails()) return toast.error("Invalid card details");

    setLoading(true);
    try {
      const orderResponse = await createOrder();
      const { order_id, total_amount } = orderResponse;

      if (paymentMethod !== "cash") await processPayment(order_id, total_amount);

      toast.success(
        paymentMethod === "cash"
          ? "Order placed! Prepare cash for delivery."
          : `Payment of UGX ${total_amount.toLocaleString()} processed successfully!`
      );

      clearCart();
      navigate("/ThankYou", { state: { orderId: order_id, totalAmount: total_amount, paymentMethod } });

    } catch (error) {
      toast.error(error.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCardPayment = () => {
    if (validateCardDetails()) {
      setShowCardModal(false);
      handleCheckout();
    } else toast.error("Please enter valid card details");
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Checkout & Payment</h2>

      {!clientInfo && (
        <Card className="mb-3 p-3 border rounded">
          <h6>Guest Delivery Info</h6>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Name"
              value={guestInfo.name}
              onChange={e => setGuestInfo({ ...guestInfo, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="e.g., 0775123456"
              value={guestInfo.phone}
              onChange={e => setGuestInfo({ ...guestInfo, phone: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Delivery Address"
              value={guestInfo.address}
              onChange={e => setGuestInfo({ ...guestInfo, address: e.target.value })}
            />
          </Form.Group>
        </Card>
      )}

      <Row className="g-4">
        <Col md={7}>
          {/* Cart Items */}
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Order Items</Card.Title>
              <ListGroup variant="flush">
                {cartItems.length === 0 && (
                  <ListGroup.Item className="text-center py-4">
                    <p>Your cart is empty</p>
                    <Button variant="primary" onClick={() => navigate("/products")}>
                      Continue Shopping
                    </Button>
                  </ListGroup.Item>
                )}
                {cartItems.map(item => (
                  <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center py-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image || "/placeholder-image.jpg"}
                        alt={item.title}
                        style={{ width: "60px", height: "60px", objectFit: "cover", marginRight: "15px" }}
                      />
                      <div>
                        <strong>{item.title}</strong>
                        <p className="mb-0 text-muted">UGX {item.price.toLocaleString()} each</p>
                        <div className="mt-2">
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            disabled={item.quantity <= 1}
                            className="me-2"
                          >-</Button>
                          <span className="px-2">{item.quantity || 1}</span>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="ms-2"
                          >+</Button>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <strong>UGX {(item.price * (item.quantity || 1)).toLocaleString()}</strong>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        className="ms-3"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="bi bi-trash"></i> Remove
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          {/* Payment & Delivery */}
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Payment & Delivery</Card.Title>

              {clientInfo && (
                <div className="mb-3 p-2 border rounded">
                  <h6>Delivery Information</h6>
                  <p className="mb-0">{clientInfo.name}<br />{clientInfo.address}<br />{clientInfo.phone && `Phone: ${clientInfo.phone}`}</p>
                  <Button variant="outline-primary" size="sm" className="mt-2">Edit Information</Button>
                </div>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Delivery Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Optional notes for delivery"
                  value={shippingNotes}
                  onChange={e => setShippingNotes(e.target.value)}
                />
              </Form.Group>

              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item className="d-flex justify-content-between"><span>Subtotal</span><span>UGX {getTotal().toLocaleString()}</span></ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between"><span>Delivery Fee</span><span>UGX 5,000</span></ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between border-top mt-2"><strong>Total</strong><strong>UGX {(getTotal() + 5000).toLocaleString()}</strong></ListGroup.Item>
              </ListGroup>

              <h6 className="mb-3">Payment Method</h6>
              <Form>
                <div className="mb-2">
                  <Form.Check type="radio" name="paymentMethod" id="cash" label={<div><span>Cash on Delivery</span><small className="d-block text-muted">Pay when you receive your order</small></div>} value="cash" checked={paymentMethod === "cash"} onChange={e => setPaymentMethod(e.target.value)} />
                </div>
                <div className="mb-2">
                  <Form.Check type="radio" name="paymentMethod" id="mobile" label={<div><span>Mobile Money</span><small className="d-block text-muted">Pay instantly with Mobile Money</small></div>} value="mobile" checked={paymentMethod === "mobile"} onChange={e => setPaymentMethod(e.target.value)} />
                  {paymentMethod === "mobile" && (
                    <Form.Group className="mt-2 ps-4">
                      <Form.Label>Mobile Money Number</Form.Label>
                      <Form.Control type="tel" placeholder="e.g., 0775123456" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} isInvalid={phoneNumber && !validatePhoneNumber(phoneNumber)} />
                      <Form.Text className="text-muted">Enter your MTN, Airtel, or Africell number</Form.Text>
                    </Form.Group>
                  )}
                </div>
                <div className="mb-2">
                  <Form.Check type="radio" name="paymentMethod" id="card" label={<div><span>Credit/Debit Card</span><small className="d-block text-muted">Pay securely with your card</small></div>} value="card" checked={paymentMethod === "card"} onChange={e => setPaymentMethod(e.target.value)} />
                </div>
              </Form>

              <Button
                variant="success"
                size="lg"
                className="w-100 mt-4 py-2"
                onClick={() => paymentMethod === "card" ? setShowCardModal(true) : handleCheckout()}
                disabled={cartItems.length === 0 || loading}
              >
                {loading ? (<><span className="spinner-border spinner-border-sm me-2"></span>Processing...</>) : `Confirm Order - UGX ${(getTotal() + 5000).toLocaleString()}`}
              </Button>

              <div className="text-center mt-3"><small className="text-muted">By completing your purchase, you agree to our Terms of Service</small></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Card Modal */}
      <Modal show={showCardModal} onHide={() => setShowCardModal(false)}>
        <Modal.Header closeButton><Modal.Title>Enter Card Details</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="text" placeholder="1234 5678 9012 3456" value={cardDetails.number} onChange={e => setCardDetails({...cardDetails, number: e.target.value})} maxLength={16} />
            </Form.Group>
            <Row>
              <Col md={6}><Form.Group className="mb-3"><Form.Label>Expiry Date</Form.Label><Form.Control type="text" placeholder="MM/YY" value={cardDetails.expiry} onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})} maxLength={5} /></Form.Group></Col>
              <Col md={6}><Form.Group className="mb-3"><Form.Label>CVV</Form.Label><Form.Control type="text" placeholder="123" value={cardDetails.cvv} onChange={e => setCardDetails({...cardDetails, cvv: e.target.value})} maxLength={3} /></Form.Group></Col>
            </Row>
            <Form.Group className="mb-3"><Form.Label>Cardholder Name</Form.Label><Form.Control type="text" placeholder="John Doe" value={cardDetails.name} onChange={e => setCardDetails({...cardDetails, name: e.target.value})} /></Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCardModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleCardPayment}>Process Payment</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CheckoutPaymentsPage;
