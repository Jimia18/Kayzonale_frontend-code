import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ product, onAddToCart, viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <Card className="mb-3">
        <Row className="g-0">
          <Col md={4}>
            <Card.Img 
              src={product.image} 
              alt={product.title}
              style={{ height: '200px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text className="text-muted">{product.category}</Card.Text>
              <Card.Text>{product.description}</Card.Text>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="fw-bold h4">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-muted text-decoration-line-through ms-2">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <Button 
                  variant="primary" 
                  onClick={() => onAddToCart(product)}
                >
                  <FiShoppingCart className="me-1" />
                  Add to Cart
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  }

  // Default grid view
  return (
    <Card className="h-100">
      <Card.Img 
        variant="top" 
        src={product.image} 
        style={{ height: '200px', objectFit: 'cover' }} 
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <Card.Text className="text-muted">{product.category}</Card.Text>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div>
            <span className="fw-bold">${product.price}</span>
            {product.originalPrice && (
              <small className="text-muted text-decoration-line-through ms-2">
                ${product.originalPrice}
              </small>
            )}
          </div>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => onAddToCart(product)}
          >
            <FiShoppingCart />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;