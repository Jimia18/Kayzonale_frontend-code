import React, { useState } from 'react';
import { Container, Accordion, Form } from 'react-bootstrap';
import { BsQuestionCircle } from 'react-icons/bs';

const faqs = [
  {
    question: "How can I place an order?",
    answer: "You can place an order by browsing our Shop page, adding products to your cart, and proceeding to checkout."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Cash on Delivery, Mobile Money, and Credit/Debit cards."
  },
  {
    question: "Do you offer delivery services?",
    answer: "Yes! We offer free delivery for orders above UGX 500,000 and affordable rates for smaller orders."
  },
  {
    question: "Can I return or exchange a product?",
    answer: "Yes, returns or exchanges are allowed within 7 days of delivery. Products must be in original condition."
  },
  {
    question: "How can I contact customer support?",
    answer: "You can reach us via our Contact page, email, or by calling our support line at 0705 783322."
  },
];

const FaqsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{ color: '#FF4081' }}>Frequently Asked Questions</h2>

      {/* Search bar */}
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      <Accordion defaultActiveKey="0">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>
                <BsQuestionCircle className="me-2 text-primary" />
                {faq.question}
              </Accordion.Header>
              <Accordion.Body>{faq.answer}</Accordion.Body>
            </Accordion.Item>
          ))
        ) : (
          <p className="text-center text-muted">No questions match your search.</p>
        )}
      </Accordion>
    </Container>
  );
};

export default FaqsPage;
