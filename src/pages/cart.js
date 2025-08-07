import React from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { useCart } from '../components/cartContext';

function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <Container className="my-5">
      <h2>Your Cart</h2>
      <ListGroup>
        {cart.map((item, i) => (
          <ListGroup.Item key={i} className="d-flex justify-content-between">
            <span>{item.title}</span>
            <Button variant="danger" onClick={() => removeFromCart(i)}>Remove</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default CartPage;
