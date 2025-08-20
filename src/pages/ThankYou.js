import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Container, Card, ListGroup, Button } from "react-bootstrap";

const ThankYouPage = () => {
  const location = useLocation();
  const method = location.state?.paymentMethod || "your chosen method";
  const cartItems = location.state?.cartItems || [];

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  return (
    <Container className="my-5 d-flex flex-column align-items-center">
      <Card className="shadow-lg p-4 text-center" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-success mb-3">🎉 Thank You for Your Order!</h2>
        <p className="mb-3">
          You selected <strong>{method.replace("_", " ")}</strong> as your payment method.
        </p>

        {cartItems.length > 0 && (
          <ListGroup variant="flush" className="mb-3 text-start">
            {cartItems.map(item => (
              <ListGroup.Item key={item.id} className="d-flex justify-content-between">
                <span>{item.title} x {item.quantity}</span>
                <span>UGX {(item.price * (item.quantity || 1)).toLocaleString()}</span>
              </ListGroup.Item>
            ))}
            <ListGroup.Item className="d-flex justify-content-between fw-bold border-top">
              <span>Total</span>
              <span>UGX {getTotal().toLocaleString()}</span>
            </ListGroup.Item>
          </ListGroup>
        )}

        <Button as={Link} to="/shop" variant="primary" className="w-100">
          Continue Shopping
        </Button>
      </Card>
    </Container>
  );
};

export default ThankYouPage;
