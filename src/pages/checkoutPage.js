import React from "react";
import { useCart } from "../components/cartContext";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, ListGroup } from "react-bootstrap";

const CheckoutPage = () => {
  const { cartItems, getTotal } = useCart();
  const navigate = useNavigate();

  return (
    <Container className="my-4">
      <h2>Checkout</h2>
      <Row>
        <Col md={8}>
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                {item.name} - {item.quantity} × ${item.price} = $
                {item.price * item.quantity}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <h4>Total: ${getTotal()}</h4>
          <Button
            className="w-100 mt-3"
            onClick={() => navigate("/payments")}
          >
            Proceed to Payment
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
