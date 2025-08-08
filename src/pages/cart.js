import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, amount) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
        : item
    );
    setCartItems(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    toast.info("Item removed from cart");
  };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

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
          items: cartItems,
          client_id: user.id,
          notes: "Cart checkout"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order placed successfully!");
      localStorage.removeItem("cart");
      setCartItems([]);
      navigate("/thank-you");
    } catch (error) {
      console.error(error);
      toast.error("Checkout failed.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <button onClick={() => updateQuantity(item.id, -1)} className="btn btn-sm btn-secondary me-2">-</button>
                    {item.quantity}
                    <button onClick={() => updateQuantity(item.id, 1)} className="btn btn-sm btn-secondary ms-2">+</button>
                  </td>
                  <td>UGX {item.price.toLocaleString()}</td>
                  <td>UGX {(item.price * item.quantity).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end">
            <h4>Total: UGX {getTotal().toLocaleString()}</h4>
            <button onClick={handleCheckout} className="btn btn-primary mt-3">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
