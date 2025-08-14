import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CartSidebar = ({ isOpen, onClose, cartItems, setCartItems }) => {
  const navigate = useNavigate();

  // Update quantity
  const updateQuantity = (id, amount) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max((item.quantity || 1) + amount, 1) } 
          : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.info("Item removed from cart");
  };

  // Calculate total
  const getTotal = () => 
    cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  // Handle checkout
  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!user || user.role !== "client") {
      toast.error("Please login as a client to checkout.");
      return navigate("/login");
    }

    try {
      await axios.post(
        "http://localhost:5000/api/v1/orders/checkout",
        { 
          items: cartItems.map(item => ({
            ...item,
            quantity: item.quantity || 1
          })), 
          client_id: user.id, 
          notes: "Cart checkout" 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Order placed successfully!");
      localStorage.removeItem("cart");
      setCartItems([]);
      onClose();
      navigate("/thank-you");
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout failed.");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 ${isOpen ? 'd-block' : 'd-none'}`}
        onClick={onClose}
        style={{ zIndex: 1040 }}
      />
      
      {/* Sidebar */}
      <div 
        className={`position-fixed top-0 end-0 h-100 bg-white shadow-lg ${isOpen ? 'd-block' : 'd-none'}`}
        style={{
          width: '400px',
          zIndex: 1050,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-out'
        }}
      >
        <div className="d-flex flex-column h-100 p-3">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">
            <h4 className="mb-0">Your Cart</h4>
            <button 
              onClick={onClose}
              className="btn-close"
              aria-label="Close"
            />
          </div>

          {/* Cart items */}
          <div className="flex-grow-1 overflow-auto">
            {cartItems.length === 0 ? (
              <div className="text-center text-muted py-5">Your cart is empty</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col" className="text-center">Qty</th>
                    <th scope="col" className="text-end">Price</th>
                    <th scope="col" className="text-end">Total</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>
                        <div className="d-flex justify-content-center align-items-center">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity || 1}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-end">UGX {item.price.toLocaleString()}</td>
                      <td className="text-end">UGX {(item.price * (item.quantity || 1)).toLocaleString()}</td>
                      <td className="text-end">
                        <button 
                          onClick={() => removeItem(item.id)}
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
                <h5 className="mb-0">Total:</h5>
                <h5 className="mb-0">UGX {getTotal().toLocaleString()}</h5>
              </div>
              <button 
                onClick={handleCheckout}
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