import React from "react";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import { useCart } from "../components/cartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems = [], updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Safely calculate total
  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price * (item.quantity || 1)),
      0
    );
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/CheckoutPaymentsPage");
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Your Cart</h2>
      <Row className="g-4">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Cart Items</Card.Title>
              <ListGroup variant="flush">
                {cartItems.length === 0 && (
                  <ListGroup.Item>Your cart is empty</ListGroup.Item>
                )}
                {cartItems.map(item => (
                  <ListGroup.Item
                    key={item.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.title}</strong>
                      <div className="mt-1">
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity || 1) - 1)
                          }
                          className="me-2"
                        >
                          -
                        </Button>
                        <span>{item.quantity || 1}</span>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity || 1) + 1)
                          }
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

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Summary</Card.Title>
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
              <Button
                variant="primary"
                className="w-100 mt-4"
                onClick={handleProceedToCheckout}
                disabled={cartItems.length === 0}
                
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
