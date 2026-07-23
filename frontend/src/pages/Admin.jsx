import { useEffect, useState } from "react";
import api from "../api/axios.js";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  image: "",
  category: "Men",
  brand: "",
  sizes: "",
  colors: "",
  countInStock: "",
};

export default function Admin() {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    const { data } = await api.get("/products", { params: { limit: 100 } });
    setProducts(data.products);
  };

  const loadOrders = async () => {
    const { data } = await api.get("/orders");
    setOrders(data);
  };

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        countInStock: Number(form.countInStock),
        sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
        colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
      };

      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
      } else {
        await api.post("/products", payload);
      }

      setForm(emptyForm);
      setEditingId(null);
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    }
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      category: p.category,
      brand: p.brand,
      sizes: p.sizes.join(", "),
      colors: p.colors.join(", "),
      countInStock: p.countInStock,
    });
    setEditingId(p._id);
    setTab("products");
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  const updateOrderStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    loadOrders();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-heading mb-8">Admin Panel</h1>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {["products", "orders"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-2 px-1 capitalize font-medium ${
              tab === t ? "border-b-2 border-brand" : "text-gray-400"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "products" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="space-y-3 lg:col-span-1">
            <h2 className="font-semibold text-lg">{editingId ? "Edit Product" : "Add Product"}</h2>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
            <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
            <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
            <select name="category" value={form.category} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
              <option>Accessories</option>
            </select>
            <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            <input name="sizes" placeholder="Sizes (comma separated)" value={form.sizes} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            <input name="colors" placeholder="Colors (comma separated)" value={form.colors} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
            <input name="countInStock" type="number" placeholder="Stock count" value={form.countInStock} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-2">
              <button type="submit" className="bg-brand text-white px-6 py-2 rounded-full font-medium hover:bg-brand-light">
                {editingId ? "Update" : "Add"}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setForm(emptyForm); setEditingId(null); }} className="px-6 py-2 rounded-full border border-gray-300">
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="lg:col-span-2">
            <h2 className="font-semibold text-lg mb-4">Products ({products.length})</h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {products.map((p) => (
                <div key={p._id} className="flex items-center gap-4 border border-gray-200 rounded-md p-3">
                  <img src={p.image} alt={p.name} className="w-12 h-14 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{p.name}</p>
                    <p className="text-xs text-gray-500">${p.price.toFixed(2)} · Stock: {p.countInStock}</p>
                  </div>
                  <button onClick={() => handleEdit(p)} className="text-sm text-accent underline">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="text-sm text-red-500 underline">Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "orders" && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Total</th>
                <th className="py-2">Status</th>
                <th className="py-2">Update</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-b border-gray-100">
                  <td className="py-3">{o._id.slice(-8)}</td>
                  <td className="py-3">{o.user?.name}</td>
                  <td className="py-3">${o.totalPrice.toFixed(2)}</td>
                  <td className="py-3">{o.status}</td>
                  <td className="py-3">
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1"
                    >
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
