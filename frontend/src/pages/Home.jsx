import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/products", {
          params: { keyword, category },
        });
        setProducts(data.products);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword, category]);

  return (
    <div>
      {!keyword && !category && (
        <div className="bg-brand text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-4xl md:text-6xl font-heading mb-4">New Season Arrivals</h1>
            <p className="text-gray-300 max-w-xl mx-auto mb-8">
              Discover clothing that blends comfort, quality, and timeless style.
            </p>
            <a href="#products" className="inline-block bg-accent text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition">
              Shop Now
            </a>
          </div>
        </div>
      )}

      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-heading mb-6">
          {category ? category : keyword ? `Results for "${keyword}"` : "Featured Products"}
        </h2>

        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && products.length === 0 && (
          <p className="text-gray-500">No products found.</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
