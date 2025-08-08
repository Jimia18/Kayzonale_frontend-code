import React, { useState } from 'react';
import { Tabs, Tab, Container, Row, Col, Card, Button } from 'react-bootstrap';

// Reusable Section Component
const ProductSection = ({ title, description, products }) => (
  <section className="py-4 bg-light">
    <Container>
      <h2 className="text-center fw-bold mb-3">{title}</h2>
      <p className="text-center text-muted mb-4">{description}</p>
      <Row className="g-4 ">
        {products.map((product) => (
          <Col key={product.id} xs={12} md={6} lg={3}>
            <Card className="h-100 shadow-sm border-0 interactive-card">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="flex-grow-1 text-muted">{product.description}</Card.Text>
                <Button variant="primary" className="mt-2">Order Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

// Product Data Arrays (banners, calendars, etc.)
const banners = [
  { id: 1, title: "Birthday Banners", image: "/images/banners/birthday.jpg", description: "Celebrate with vibrant banners." },
  { id: 2, title: "Promotional Banners", image: "/images/banners/promo.jpg", description: "Market your business with bold banners." },
  { id: 3, title: "Event Banners", image: "/images/banners/event.jpg", description: "Perfect for weddings, graduations, and more." },
  { id: 4, title: "Pull-Up Banners", image: "/images/banners/pullup.jpg", description: "Great for expos and conferences." },
];

const calendars = [
  { id: 1, title: "Wall Calendars", image: "/images/calendars/wall.jpg", description: "Classic wall calendars with branding." },
  { id: 2, title: "Desk Calendars", image: "/images/calendar.jpg", description: "Compact calendars for workspaces." },
  { id: 3, title: "Poster Calendars", image: "/images/calendars/poster.jpg", description: "Large-format for high visibility." },
  { id: 4, title: "Photo Calendars", image: "/images/calendars/photo.jpg", description: "Personalized photo calendars." },
];

const flyers = [
  { id: 1, title: "A5 Flyers", image: "/images/flyer.jpg", description: "Compact flyers for distribution." },
  { id: 2, title: "A4 Flyers", image: "/images/flier and posters.jpg", description: "Bold flyers for strong messages." },
  { id: 3, title: "Tri-Fold Flyers", image: "/images/flyers/trifold.jpg", description: "Great for menus or brochures." },
  { id: 4, title: "Event Flyers", image: "/images/flier.jpg", description: "Perfect for publicizing events." },
];

const cards = [
  { id: 1, title: "Standard Business Cards", image: "/images/business card.jpg", description: "Clean and professional cards." },
  { id: 2, title: "Gloss Finish Cards", image: "/images/cards/gloss.jpg", description: "Glossy finish for vibrant look." },
  { id: 3, title: "Matte Finish Cards", image: "/images/cards/matte.jpg", description: "Smooth, modern matte finish." },
  { id: 4, title: "Rounded Corner Cards", image: "/images/cards/rounded.jpg", description: "Stylish curved corners." },
];

const tshirts = [
  { id: 1, title: "Custom Printed Bags", image: "/images/branded bags.jpg", description: "Print your logo or artwork." },
  { id: 2, title: "Event T-Shirts", image: "/images/tshirts/event.jpg", description: "Perfect for group events." },
  { id: 3, title: "Promotional Tees", image: "/images/tshirts/promo.jpg", description: "Giveaways and marketing use." },
  { id: 4, title: "Staff Uniform T-Shirts", image: "/images/Branded t-shirts.jpg", description: "Durable for daily wear." },
];

const embroidered = [
  { id: 1, title: "Embroidered Caps", image: "/images/embroidered/caps.jpg", description: "Caps with stitched branding." },
  { id: 2, title: "Embroidered Shirts", image: "/images/embroider.jpg", description: "Premium shirts, custom-stitched." },
  { id: 3, title: "Embroidered Bags", image: "/images/IMG-20250724-WA0002.jpg", description: "Stylish branded backpacks." },
  { id: 4, title: "Embroidered Polo Shirts", image: "/images/embroidery.jpg", description: "Smart polos with logos." },
];

const tags = [
  { id: 1, title: "Name Tags", image: "/images/nametags.jpg", description: "Great for personal identity professionally." },
  { id: 2, title: "Price Tags", image: "/images/tags/price.jpg", description: "Clearly labeled with pricing." },
  { id: 3, title: "Gift Tags", image: "/images/tags/gift.jpg", description: "Add a personal touch to gifts." },
  { id: 4, title: "Product Tags", image: "/images/tags/product.jpg", description: "Great for packaging and branding." },
];

const largeFormat = [
  { id: 1, title: "Large Posters", image: "/images/largeformat/poster.jpg", description: "Full-color impactful posters." },
  { id: 2, title: "Backdrops", image: "/images/largeformat/backdrop.jpg", description: "Ideal for events and stages." },
  { id: 3, title: "Roll-Up Banners", image: "/images/largeformat/rollup.jpg", description: "Portable and reusable banners." },
  { id: 4, title: "Vinyl Stickers", image: "/images/largeformat/stickers.jpg", description: "Brand walls, windows, and more." },
];

const Products = () => {
  const [activeKey, setActiveKey] = useState('all');
// Combine all products for 'All Products' tab
const allProducts = [
  ...banners,
  ...calendars,
  ...flyers,
  ...cards,
  ...tshirts,
  ...embroidered,
  ...tags,
  ...largeFormat,
];

  


  return (
    <div>
      <section className=" text-dark text-center py-5" style={{background: 'linear-gradient(to right, #1591c3ff, #92ccd4ff, #ebceecff)'}}>     
       <Container>
          <h1 className="display-4 fw-bold">Our Products</h1>
          <p className=" text-dark">Select a category below to view our offerings.</p>
        </Container>
      </section>

      <Container className="mt-4">
        <Tabs activeKey={activeKey} onSelect={setActiveKey} className="mb-3 justify-content-center" variant="pills">
          <Tab eventKey="allProducts" title="All">
            <ProductSection title='All' description='Take a look at some of our quality outputs.' products={allProducts}/>
          </Tab>
          <Tab eventKey="banners" title="Banners">
            <ProductSection title="Banners" description="Custom banners for events, marketing, and more." products={banners} />
          </Tab>
          <Tab eventKey="calendars" title="Calendars">
            <ProductSection title="Calendars" description="Wall, desk, and photo calendars." products={calendars} />
          </Tab>
          <Tab eventKey="flyers" title="Flyers">
            <ProductSection title="Flyers" description="Bold flyers for all promotional needs." products={flyers} />
          </Tab>
          <Tab eventKey="cards" title="Business Cards">
            <ProductSection title="Business Cards" description="Leave a lasting impression." products={cards} />
          </Tab>
          <Tab eventKey="tshirts" title="T-Shirts">
            <ProductSection title="Branded T-Shirts" description="Printed T-shirts for events and business." products={tshirts} />
          </Tab>
          <Tab eventKey="embroidered" title="Embroidered">
            <ProductSection title="Embroidered Products" description="Caps, polos, jackets & more." products={embroidered} />
          </Tab>
          <Tab eventKey="tags" title="Tags & Labels">
            <ProductSection title="Tags & Labels" description="For clothing, gifts, and branding." products={tags} />
          </Tab>
          <Tab eventKey="large" title="Large Format">
            <ProductSection title="Large Format Prints" description="Wide-format printing for signage and events." products={largeFormat} />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default Products;
