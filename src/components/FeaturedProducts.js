// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // Import Link for routing
// import '../styles/featuredProducts.css';
// import '../styles/sectionHeader.css';

// const allProducts = [
//   { title: 'Pull-Up Banners', price: 'UGX 210,000', category: 'Banners', img: '/images/pullup_banner.jpg' },
//   { title: 'X-Banners', price: 'UGX 190,000', category: 'Banners', img: '/images/x_banner.jpg' },
//   { title: 'Double-Sided Roller Banners', price: 'UGX 190,000', category: 'Banners', img: '/images/double_roller.jpg' },
//   { title: 'Teardrop Banners', price: 'UGX 235,000', category: 'Banners', img: '/images/teardrop_banner.jpg' },
//   { title: 'Rectangle Flag Banners', price: 'UGX 235,000', category: 'Flags', img: '/images/rectangle_flag.jpg' },
//   { title: 'Quill Feather Flag Banners', price: 'UGX 210,000', category: 'Flags', img: '/images/quill_flag.jpg' },
//   { title: 'Classic Flags', price: 'UGX 230,000', category: 'Flags', img: '/images/classic_flag.jpg' },
//   { title: 'Standard Business Cards', price: 'UGX 25,000', category: 'Business Cards Uganda', img: '/images/business cards.jpeg' },
//   { title: 'Glossy Business Cards', price: 'UGX 24,500', category: 'Business Cards Uganda', img: '/images/glossy_cards.jpg' },
//   { title: 'Square Business Cards', price: 'UGX 20,000', category: 'Business Cards Uganda', img: '/images/business card.jpg' },
//   { title: 'Self-Inked Stamps', price: 'UGX 85,000', category: 'Print Advertising & Office', img: '/images/stamps.jpg' },
//   { title: 'Customized Paper Bags', price: 'UGX 6,000', category: 'Signs, Banners & Posters', img: '/images/paper_bag.jpg' },
// ];

// const categories = [
//   'All',
//   'Business Cards Uganda',
//   'Campaign posters printing',
//   'Print Advertising & Office',
//   'Signs, Banners & Posters',
// ];

// const FeaturedProducts = () => {
//   const [activeCategory, setActiveCategory] = useState('All');

//   const filteredProducts =
//     activeCategory === 'All'
//       ? allProducts
//       : allProducts.filter(product => product.category === activeCategory);

//   return (
//     <section className="py-5 bg-light">
//       <div className="container">

//         {/* Header */}
//         <div className="section-header text-center mb-4">
//           <p className="subheading">PRINTING MADE EASY IN UGANDA</p>
//           <h2 className="main-heading">Featured Products</h2>

//           <div className="category-tabs mt-6">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 className={`category-tab ${activeCategory === category ? 'active' : ''}`}
//                 onClick={() => setActiveCategory(category)}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Product Grid */}
//         <div className="row g-4">
//           {filteredProducts.map(product => (
//             <div key={product.title} className="col-sm-6 col-md-4 col-lg-3">
//               <div className="card h-100 shadow product-card">
//                 <img
//                   src={product.img}
//                   className="card-img-top"
//                   alt={product.title}
//                   style={{ height: '200px', objectFit: 'cover' }}
//                   onError={(e) => (e.target.src = '/images/fallback.jpg')}
//                 />
//                 <div className="card-body text-center">
//                   <h5 className="card-title">{product.title}</h5>
//                   <p className="card-text fw-bold">{product.price}</p>

//                   {/* Shop Now redirects to products page with category */}
//                   <Link
//                     to={`/shop?category=${encodeURIComponent(product.category)}`}
//                     className="btn btn-primary btn-sm"
//                   >
//                     Shop Now
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* View All Button */}
//         <div className="text-center mt-4">
//           <Link to="/products" className="btn btn-lg btn-outline-primary">
//             View All Products
//           </Link>
//         </div>

//         {/* Delivery Note */}
//         <div className="text-center mt-3">
//           <p className="mb-0">Free delivery on all orders above UGX 500,000!</p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/cartContext';
//import { toast } from 'react-toastify';
import '../styles/featuredProducts.css';
import '../styles/sectionHeader.css';

const allProducts = [
  { id: 1, title: 'Pull-Up Banners', price: 210000, category: 'Large Format Printing', img: '/images/pullup_banner.jpg' },
  { id: 2, title: 'X-Banners', price: 190000, category: 'Large Format Printing', img: '/images/x_banner.jpg' },
  { id: 3, title: 'Double-Sided Roller Banners', price: 190000, category: 'Large Format Printing', img: '/images/double_roller.jpg' },
  { id: 4, title: 'Teardrop Banners', price: 235000, category: 'Large Format Printing', img: '/images/teardrop_banner.jpg' },
  { id: 5, title: 'Rectangle Flag Banners', price: 235000, category: 'Specialty & Seasonal', img: '/images/rectangle_flag.jpg' },
  { id: 6, title: 'Quill Feather Flag Banners', price: 210000, category: 'Specialty & Seasonal', img: '/images/quill_flag.jpg' },
  { id: 7, title: 'Classic Flags', price: 230000, category: 'Specialty & Seasonal', img: '/images/classic_flag.jpg' },
  { id: 8, title: 'Standard Business Cards', price: 25000, category: 'Branding & Stationery', img: '/images/business cards.jpeg' },
  { id: 9, title: 'Glossy Business Cards', price: 24500, category: 'Branding & Stationery', img: '/images/glossy_cards.jpg' },
  { id: 10, title: 'Square Business Cards', price: 20000, category: 'Branding & Stationery', img: '/images/business card.jpg' },
  { id: 11, title: 'Self-Inked Stamps', price: 85000, category: 'Printing & Embroidery', img: '/images/stamps.jpg' },
  { id: 12, title: 'Customized Paper Bags', price: 6000, category: 'Paper & Promotional Products', img: '/images/paper_bag.jpg' },
];

const categories = [
  'All',
  'Large Format Printing',
  'Printing & Embroidery',
  'Branding & Stationery',
  'Paper & Promotional Products',
  'Specialty & Seasonal',
];

const FeaturedProducts = ({ hideHeader = false, showViewAll = true }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useCart();

  const filteredProducts =
    activeCategory === 'All'
      ? allProducts
      : allProducts.filter(product => product.category === activeCategory);

  const handleAddToCart = (product) => {
    addToCart(product);
    //toast.success(`${product.title} added to cart`);
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Conditional Header */}
        {!hideHeader && (
          <div className="section-header text-center mb-4">
            <p className="subheading">PRINTING MADE EASY FOR YOU</p>
            <h2 className="main-heading">Featured Products</h2>
          </div>
        )}

        {/* Category Tabs */}
        <div className={`category-tabs mt-3 ${hideHeader ? 'mb-4' : 'mt-6'}`}>
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="row g-4 mt-2">
          {filteredProducts.map(product => (
            <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow product-card">
                <img
                  src={product.img}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => (e.target.src = '/images/pathto.jpg')}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text fw-bold">UGX {product.price.toLocaleString()}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn btn-primary btn-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button (optional) */}
        {showViewAll && (
          <div className="text-center mt-4">
            <Link to="/products" className="btn btn-lg btn-primary">
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
