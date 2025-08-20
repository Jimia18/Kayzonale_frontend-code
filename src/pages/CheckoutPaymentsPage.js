import React, { useState } from "react";
import { Container, Row, Col, Card, ListGroup, Button, Form } from "react-bootstrap";
import { useCart } from "../components/cartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutPaymentsPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  const handlePayment = () => {
    if (paymentMethod === "mobile_money" && phoneNumber.trim().length < 9) {
      toast.error("Please enter a valid Mobile Money number");
      return;
    }

    toast.success(`Payment successful via ${paymentMethod.replace("_", " ")}`);
    clearCart();
    navigate("/ThankYou", { state: { paymentMethod, phoneNumber } });
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Checkout & Payment</h2>
      <Row className="g-4">
        {/* Cart Items */}
        <Col md={7}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Order Items</Card.Title>
              <ListGroup variant="flush">
                {cartItems.length === 0 && <ListGroup.Item>Your cart is empty</ListGroup.Item>}
                {cartItems.map(item => (
                  <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{item.title}</strong>
                      <div className="mt-1">
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="me-2"
                        >
                          -
                        </Button>
                        <span>{item.quantity || 1}</span>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="ms-2"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div>
                      UGX {(item.price * (item.quantity || 1)).toLocaleString()}
                      <Button
                        size="sm"
                        variant="outline-danger"
                        className="ms-2"
                        onClick={() => removeFromCart(item.id)}
                      >
                       <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Payment Methods */}
        <Col md={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>UGX {getTotal().toLocaleString()}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between border-top mt-2">
                  <strong>Total</strong>
                  <strong>UGX {getTotal().toLocaleString()}</strong>
                </ListGroup.Item>
              </ListGroup>

              <Form className="mt-3">
                <Form.Check
                  type="radio"
                  label="Cash on Delivery"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={e => setPaymentMethod(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Mobile Money"
                  value="mobile_money"
                  checked={paymentMethod === "mobile_money"}
                  onChange={e => setPaymentMethod(e.target.value)}
                />
                {paymentMethod === "mobile_money" && (
                  <Form.Group className="mt-2">
                    <Form.Label>Mobile Money Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. 0775123456"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                    />
                  </Form.Group>
                )}
                <Form.Check
                  type="radio"
                  label="Credit/Debit Card"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={e => setPaymentMethod(e.target.value)}
                />
              </Form>

              <Button
                variant="success"
                className="w-100 mt-4"
                onClick={handlePayment}
                disabled={cartItems.length === 0}
              >
                Confirm Payment
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPaymentsPage;
