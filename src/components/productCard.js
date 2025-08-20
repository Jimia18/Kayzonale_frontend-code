import React from "react";
import { Card, Button} from "react-bootstrap";

const ProductCard = ({ product, AddToCart, viewMode }) => {
  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.src = "/images/default-product.png";
    e.target.onerror = null; // Prevent infinite loop
  };

  if (viewMode === "list") {
    return (
      <Card className="mb-3">
        <div className="d-flex">
          <div style={{ width: "200px" }}>
            <Card.Img
              variant="top"
              src={product.image}
              onError={handleImageError}
              style={{ height: "200px", objectFit: "cover" }}
            />
          </div>
          <Card.Body className="flex-grow-1">
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <span className="h5">${product.price}</span>
              <Button variant="primary" onClick={() => AddToCart(product)}>
                Add to Cart
              </Button>
            </div>
          </Card.Body>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={product.image}
        onError={handleImageError}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <Card.Text className="flex-grow-1">{product.description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="h5">${product.price}</span>
          <Button variant="primary" onClick={() => AddToCart(product)}>
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;