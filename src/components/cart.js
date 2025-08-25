import React from "react";
import { useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import { useCart } from "../components/cartContext";

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems = [], updateQuantity, removeFromCart } = useCart();

  // const updateQuantity = (id, amount) => {
  //   CartItems(prev =>
  //     prev.map(item =>
  //       item.id === id
  //         ? { ...item, quantity: Math.max((item.quantity || 1) + amount, 1) }
  //         : item
  //     )
  //   );
  // };

  // const removeItem = id => {
  //   CartItems(prev => prev.filter(item => item.id !== id));
  //   // toast.info("Item removed from cart");
  // };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price * (item.quantity || 1)),
      0
    );
  };


  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;
    navigate("/CheckoutPaymentsPage");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 ${
          isOpen ? "d-block" : "d-none"
        }`}
        onClick={onClose}
        style={{ zIndex: 1040 }}
      />
      {/* Sidebar */}
      <div
        className={`position-fixed top-0 end-0 h-100 bg-white shadow-lg ${
          isOpen ? "d-block" : "d-none"
        }`}
        style={{
          width: "400px",
          zIndex: 1050,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s"
        }}
      >
        <div className="d-flex flex-column h-100 p-3">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">
            <h4 className="mb-0">Your Cart</h4>
            <button onClick={onClose} className="btn-close" aria-label="Close" />
          </div>

          {/* Cart Items */}
          <div className="flex-grow-1 overflow-auto">
            {cartItems.length === 0 ? (
              <div className="text-center text-muted py-5">
                Your cart is empty
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th className="text-center">Qty</th>
                    <th className="text-end">Price</th>
                    <th className="text-end">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td className="text-center">
                        <button
                          onClick={() =>updateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="btn btn-sm btn-outline-secondary"
                        >
                          +
                        </button>
                      </td>
                      <td className="text-end">
                        UGX {item.price.toLocaleString()}
                      </td>
                      <td className="text-end">
                        UGX{" "}
                        {(item.price * (item.quantity || 1)).toLocaleString()}
                      </td>
                      <td className="text-end">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-top pt-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Total:</h5>
                <h5>UGX {getTotal().toLocaleString()}</h5>
              </div>
               {/* View Cart Button */}
              <button
                onClick={() => {
                  navigate("/cartPage"); // Navigate to full cart page
                  onClose(); // Close sidebar
                }}
                className="btn btn-info w-100 mb-2"
              >
                View Full Cart
              </button>
              {/* Proceed to Checkout */}
              <button
                onClick={handleProceedToCheckout}
                className="btn btn-primary w-100"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
