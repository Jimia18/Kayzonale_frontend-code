// // src/components/ProductCard.jsx
// import React from "react";
// import { Card, Button } from "react-bootstrap";

// const ProductCard = ({ product, onAddToCart }) => (
//   <Card className="h-100 shadow-sm">
//     <Card.Img variant="top" src={product.image} />
//     <Card.Body>
//       <Card.Title>{product.title}</Card.Title>
//       <Card.Text>{product.description}</Card.Text>
//       <h5>UGX {product.price.toLocaleString()}</h5>
//       <Button variant="primary" onClick={() => onAddToCart(product)}>
//         Add to Cart
//       </Button>
//     </Card.Body>
//   </Card>
// );

// export default ProductCard;


import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>UGX {product.price.toLocaleString()}</Card.Text>
        <Card.Text>
          <small className="text-muted">{product.category}</small>
        </Card.Text>
        <Button
          variant="primary"
          className="w-100"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
