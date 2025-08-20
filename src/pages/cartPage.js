import React from "react";
import { Container, Row, Col, Card, Button, Image, Form } from "react-bootstrap";
import { useCart } from "../components/cartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <Container className="py-5">
      <h2 className="mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/shop">Continue shopping</Link></p>
      ) : (
        <Row>
          <Col md={8}>
            {cart.map((item) => (
              <Card className="mb-3" key={item.id}>
                <Card.Body className="d-flex align-items-center">
                  <Image src={item.image} rounded width={80} height={80} className="me-3" />
                  <div className="flex-grow-1">
                    <h5>{item.name}</h5>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        style={{ width: "80px" }}
                      />
                      <Button
                        variant="link"
                        className="text-danger ms-3"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div>
                    UGX {(item.price * item.quantity).toFixed(2)}
                  </div>
                </Card.Body>
              </Card>
            ))}

            <Button variant="secondary" onClick={clearCart}>Clear Cart</Button>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h4>Order Summary</h4>
                <p>Subtotal: UGX {subtotal.toFixed(2)}</p>
                {/* You can add delivery fees, tax, etc. here */}
                <hr />
                <h5>Total: UGX {subtotal.toFixed(2)}</h5>
                <Link to="/checkout">
                  <Button variant="success" className="w-100 mt-3">
                    Proceed to Checkout
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;
