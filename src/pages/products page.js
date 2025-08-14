import React, { useState } from 'react';
import { Tabs, Tab, Container, Row, Col, Card, Button } from 'react-bootstrap';
import  '../styles/products page.css';

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface ProductSectionProps {
  title: string;
  description: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ 
  title, 
  description, 
  products 
}) => (
  <section className="py-5 bg-light">
    <Container>
      <h2 className="text-center fw-bold mb-4">{title}</h2>
      {description && <p className="text-center text-muted mb-5">{description}</p>}
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} md={6} lg={3}>
            <Card className="h-100 shadow-sm border-0 interactive-card">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="h5">{product.title}</Card.Title>
                <Card.Text className="flex-grow-1 text-muted mb-3">
                  {product.description}
                </Card.Text>
                <Button variant="primary" className="align-self-start">
                  Order Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

const PRODUCTS_DATA = {
  banners: [
    { id: 1, title: "Birthday Banners", image: "/images/banners/birthday.jpg", description: "Celebrate with vibrant banners." },
    { id: 2, title: "Promotional Banners", image: "/images/banners/promo.jpg", description: "Market your business with bold banners." },
    { id: 3, title: "Event Banners", image: "/images/banners/event.jpg", description: "Perfect for weddings, graduations, and more." },
    { id: 4, title: "Pull-Up Banners", image: "/images/banners/pullup.jpg", description: "Great for expos and conferences." },
  ],
  calendars: [
    { id: 1, title: "Wall Calendars", image: "/images/calendars/wall.jpg", description: "Classic wall calendars with branding." },
    { id: 2, title: "Desk Calendars", image: "/images/calendar.jpg", description: "Compact calendars for workspaces." },
    { id: 3, title: "Poster Calendars", image: "/images/calendars/poster.jpg", description: "Large-format for high visibility." },
    { id: 4, title: "Photo Calendars", image: "/images/calendars/photo.jpg", description: "Personalized photo calendars." },
  ],
  flyers: [
    { id: 1, title: "A5 Flyers", image: "/images/flyer.jpg", description: "Compact flyers for distribution." },
    { id: 2, title: "A4 Flyers", image: "/images/flier and posters.jpg", description: "Bold flyers for strong messages." },
    { id: 3, title: "Tri-Fold Flyers", image: "/images/flyers/trifold.jpg", description: "Great for menus or brochures." },
    { id: 4, title: "Event Flyers", image: "/images/flier.jpg", description: "Perfect for publicizing events." },
  ],
  cards: [
    { id: 1, title: "Standard Business Cards", image: "/images/business card.jpg", description: "Clean and professional cards." },
    { id: 2, title: "Gloss Finish Cards", image: "/images/cards/gloss.jpg", description: "Glossy finish for vibrant look." },
    { id: 3, title: "Matte Finish Cards", image: "/images/cards/matte.jpg", description: "Smooth, modern matte finish." },
    { id: 4, title: "Rounded Corner Cards", image: "/images/cards/rounded.jpg", description: "Stylish curved corners." },
  ],
  tshirts: [
    { id: 1, title: "Custom Printed Bags", image: "/images/branded bags.jpg", description: "Print your logo or artwork." },
    { id: 2, title: "Event T-Shirts", image: "/images/tshirts/event.jpg", description: "Perfect for group events." },
    { id: 3, title: "Promotional Tees", image: "/images/tshirts/promo.jpg", description: "Giveaways and marketing use." },
    { id: 4, title: "Staff Uniform T-Shirts", image: "/images/Branded t-shirts.jpg", description: "Durable for daily wear." },
  ],
  embroidered: [
    { id: 1, title: "Embroidered Caps", image: "/images/embroidered/caps.jpg", description: "Caps with stitched branding." },
    { id: 2, title: "Embroidered Shirts", image: "/images/embroider.jpg", description: "Premium shirts, custom-stitched." },
    { id: 3, title: "Embroidered Bags", image: "/images/IMG-20250724-WA0002.jpg", description: "Stylish branded backpacks." },
    { id: 4, title: "Embroidered Polo Shirts", image: "/images/embroidery.jpg", description: "Smart polos with logos." },
  ],
  tags: [
    { id: 1, title: "Name Tags", image: "/images/nametags.jpg", description: "Great for personal identity professionally." },
    { id: 2, title: "Price Tags", image: "/images/tags/price.jpg", description: "Clearly labeled with pricing." },
    { id: 3, title: "Gift Tags", image: "/images/tags/gift.jpg", description: "Add a personal touch to gifts." },
    { id: 4, title: "Product Tags", image: "/images/tags/product.jpg", description: "Great for packaging and branding." },
  ],
  largeFormat: [
    { id: 1, title: "Large Posters", image: "/images/largeformat/poster.jpg", description: "Full-color impactful posters." },
    { id: 2, title: "Backdrops", image: "/images/largeformat/backdrop.jpg", description: "Ideal for events and stages." },
    { id: 3, title: "Roll-Up Banners", image: "/images/largeformat/rollup.jpg", description: "Portable and reusable banners." },
    { id: 4, title: "Vinyl Stickers", image: "/images/largeformat/stickers.jpg", description: "Brand walls, windows, and more." },
  ],
};

const allProducts = Object.values(PRODUCTS_DATA).flat();

const Products: React.FC = () => {
  const [activeKey, setActiveKey] = useState('allProducts');

  // Tab title and description mapping
  const tabConfig = {
    banners: {
      title: "Banners",
      description: "Custom banners for events, marketing, and more."
    },
    calendars: {
      title: "Calendars",
      description: "Wall, desk, and photo calendars."
    },
    flyers: {
      title: "Flyers",
      description: "Bold flyers for all promotional needs."
    },
    cards: {
      title: "Business Cards",
      description: "Leave a lasting impression."
    },
    tshirts: {
      title: "Branded T-Shirts",
      description: "Printed T-shirts for events and business."
    },
    embroidered: {
      title: "Embroidered Products",
      description: "Caps, polos, jackets & more."
    },
    tags: {
      title: "Tags & Labels",
      description: "For clothing, gifts, and branding."
    },
    largeFormat: {
      title: "Large Format Prints",
      description: "Wide-format printing for signage and events."
    }
  };

  return (
    <div className="products-page">
      <section className="hero-section text-dark text-center py-5">
        <Container>
          <h1 className="display-4 fw-bold mb-3">Our Products</h1>
          <p className="lead">Select a category below to view our offerings.</p>
        </Container>
      </section>

      <Container className="my-5">
        <Tabs 
          activeKey={activeKey} 
          onSelect={setActiveKey} 
          className="mb-4 justify-content-center" 
          variant="pills"
        >
          <Tab eventKey="allProducts" title="All Products">
            <ProductSection 
              title="All Products" 
              description="Browse our complete product range" 
              products={allProducts} 
            />
          </Tab>
          {Object.entries(PRODUCTS_DATA).map(([key, products]) => (
            <Tab key={key} eventKey={key} title={tabConfig[key].title}>
              <ProductSection
                title={tabConfig[key].title}
                description={tabConfig[key].description}
                products={products}
              />
            </Tab>
          ))}
        </Tabs>
      </Container>
    </div>
  );
};

export default Products;