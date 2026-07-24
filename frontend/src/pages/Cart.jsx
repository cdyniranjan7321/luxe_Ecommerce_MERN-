
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-heading mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/" className="text-accent underline">
            Continue shopping
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex gap-4 border-b border-gray-200 pb-4">
                <img src={item.image} alt={item.name} className="w-24 h-28 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.size && `Size: ${item.size}`} {item.color && `· Color: ${item.color}`}
                  </p>
                  <p className="font-semibold mt-1">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        updateQty(item.product, item.size, item.color, Number(e.target.value))
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    >
                      {[...Array(item.countInStock || 10).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeFromCart(item.product, item.size, item.color)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-gray-200 rounded-lg p-6 h-fit">
            <h2 className="font-heading text-xl mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 text-sm text-gray-500">
              <span>Shipping & taxes calculated at checkout</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-brand text-white py-3 rounded-full font-medium hover:bg-brand-light transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
