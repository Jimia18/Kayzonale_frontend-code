import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useCart } from "../components/cartContext"; // adjust path

const ProductCard = ({ product, onEdit, onDelete, isAdmin }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();

  const cartItem = cartItems.find((item) => item.id === product.id);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={
          product.image
            ? `http://localhost:5000/static/uploads/products/${product.image}`
            : "/images/business card.jpg"
        }
        alt={product.title || product.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{product.title || product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>
          <strong>UGX {product.price}</strong>
        </Card.Text>
        <Card.Text className="text-muted small">
          Category: {product.category}
        </Card.Text>

        {isAdmin ? (
          <div className="d-flex justify-content-between flex-wrap">
            <Button variant="warning" size="sm" onClick={() => onEdit(product)}>
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(product.id)}
            >
              Delete
            </Button>
          </div>
        ) : (
          <div className="d-flex align-items-center gap-2">
            <Button variant="primary" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
            {cartItem && (
              <>
                <Button
                  variant="white"
                  style={{ fontSize: "1.5rem", padding: "0.25rem 0.6rem" }}
                  onClick={() =>
                    updateQuantity(product.id, cartItem.quantity - 1)
                  }
                >
                  -
                </Button>
                <Badge bg="primary" pill>
                  {cartItem.quantity}
                </Badge>
                <Button
                  variant="white"
                  style={{ fontSize: "1.5rem", padding: "0.25rem 0.6rem" }}
                  onClick={() =>
                    updateQuantity(product.id, cartItem.quantity + 1)
                  }
                >
                  +
                </Button>
              </>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
