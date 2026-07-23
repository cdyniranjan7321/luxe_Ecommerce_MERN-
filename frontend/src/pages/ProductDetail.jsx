import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
      if (data.sizes?.length) setSize(data.sizes[0]);
      if (data.colors?.length) setColor(data.colors[0]);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product.sizes?.length && !size) {
      setError("Please select a size");
      return;
    }
    addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      size,
      color,
      qty: Number(qty),
      countInStock: product.countInStock,
    });
    navigate("/cart");
  };

  if (!product) return <div className="max-w-7xl mx-auto px-4 py-12">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div>
        <h1 className="text-3xl font-heading mb-2">{product.name}</h1>
        <p className="text-gray-500 mb-4">{product.brand} · {product.category}</p>
        <p className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>

        {product.sizes?.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Size</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 border rounded-md text-sm ${
                    size === s ? "border-brand bg-brand text-white" : "border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.colors?.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Color</p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-4 py-2 border rounded-md text-sm ${
                    color === c ? "border-brand bg-brand text-white" : "border-gray-300"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Quantity</p>
          <select
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleAddToCart}
          disabled={product.countInStock === 0}
          className="w-full bg-brand text-white py-3 rounded-full font-medium hover:bg-brand-light transition disabled:opacity-50"
        >
          {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
