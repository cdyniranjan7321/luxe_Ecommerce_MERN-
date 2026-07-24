
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import api from "../api/axios.js";

export default function Checkout() {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const shippingPrice = total > 100 ? 0 : 9.99;
  const taxPrice = Number((0.08 * total).toFixed(2));
  const totalPrice = Number((total + shippingPrice + taxPrice).toFixed(2));

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const orderItems = cartItems.map((i) => ({
        name: i.name,
        qty: i.qty,
        size: i.size,
        color: i.color,
        image: i.image,
        price: i.price,
        product: i.product,
      }));

      const { data } = await api.post("/orders", {
        orderItems,
        shippingAddress: form,
        paymentMethod,
        itemsPrice: total,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      clearCart();
      navigate(`/orders/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-heading mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
          <h2 className="font-semibold text-lg">Shipping Address</h2>
          {["fullName", "address", "city", "postalCode", "country", "phone"].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              placeholder={field.replace(/([A-Z])/g, " $1")}
              className="w-full border border-gray-300 rounded-md px-4 py-2 capitalize"
            />
          ))}

          <h2 className="font-semibold text-lg pt-4">Payment Method</h2>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          >
            <option>Cash on Delivery</option>
            <option>Credit Card</option>
            <option>PayPal</option>
          </select>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading || cartItems.length === 0}
            className="w-full bg-brand text-white py-3 rounded-full font-medium hover:bg-brand-light transition disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <div className="border border-gray-200 rounded-lg p-6 h-fit">
          <h2 className="font-heading text-xl mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2 text-sm">
            <span>Items</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Shipping</span>
            <span>${shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Tax</span>
            <span>${taxPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
