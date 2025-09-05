import React from "react";
import { Card, Button, Badge, Row, Col } from "react-bootstrap";
import { useCart } from "../components/cartContext";

const ProductCard = ({ product, viewMode }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const cartItem = cartItems.find((item) => item.id === product.id);

  // Image URL handling
  const imageUrl = product.image
    ? product.image.startsWith("http") || product.image.startsWith("/static")
      ? product.image
      : `http://localhost:5000/${product.image.replace(/^\/+/, "")}`
    : "/images/business card.jpg";

  // Render buttons for cart quantity
  const CartControls = () => (
    <div className="d-flex align-items-center gap-2 mt-2">
      <Button variant="primary" onClick={() => addToCart(product)}>
        Add to Cart
      </Button>
      {cartItem && (
        <>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
          >
            -
          </Button>
          <Badge bg="primary" pill>
            {cartItem.quantity}
          </Badge>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
          >
            +
          </Button>
        </>
      )}
    </div>
  );

  if (viewMode === "grid") {
    return (
      <Card className="h-100 shadow-sm interactive-card">
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={product.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body className="text-center">
          <Card.Title>{product.title}</Card.Title>
          <Card.Text className="fw-bold">UGX {product.price.toLocaleString()}</Card.Text>
          <CartControls />
        </Card.Body>
      </Card>
    );
  }

  // List view
  return (
    <Card className="h-100 shadow-sm p-2">
      <Row className="g-3 align-items-center">
        <Col md={4}>
          <Card.Img
            src={imageUrl}
            alt={product.title}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text className="fw-bold">UGX {product.price.toLocaleString()}</Card.Text>
            <Card.Text className="text-muted small">Category: {product.category}</Card.Text>
            <CartControls />
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductCard;
