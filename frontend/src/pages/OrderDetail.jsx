import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await api.get(`/orders/${id}`);
      setOrder(data);
    };
    fetchOrder();
  }, [id]);

  if (!order) return <div className="max-w-5xl mx-auto px-4 py-12">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-heading mb-2">Order #{order._id.slice(-8)}</h1>
      <p className="text-gray-500 mb-8">Status: {order.status}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="font-semibold mb-2">Shipping Address</h2>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.fullName}, {order.shippingAddress.address},{" "}
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country} · {order.shippingAddress.phone}
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Items</h2>
            <div className="space-y-3">
              {order.orderItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center border-b border-gray-100 pb-3">
                  <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-md" />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.qty} {item.size && `· Size: ${item.size}`}
                    </p>
                  </div>
                  <p className="font-semibold">${(item.qty * item.price).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 h-fit">
          <h2 className="font-heading text-xl mb-4">Payment</h2>
          <p className="text-sm mb-4">Method: {order.paymentMethod}</p>
          <div className="flex justify-between text-sm mb-1">
            <span>Items</span>
            <span>${order.itemsPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Shipping</span>
            <span>${order.shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Tax</span>
            <span>${order.taxPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
