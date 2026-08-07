
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../api/axios.js";
import ProductCard from "../components/ProductCard.jsx";
import { Star } from "lucide-react";

export default function Home() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Brands Data
  const brands = [
    { name: "Nike", logo: "🏃" },
    { name: "Adidas", logo: "👟" },
    { name: "Zara", logo: "👗" },
    { name: "H&M", logo: "👕" },
    { name: "Puma", logo: "🐆" },
    { name: "Levi's", logo: "👖" },
  ];

  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "👩",
      rating: 5,
      comment: "Amazing quality! The clothes are comfortable and stylish. Will definitely shop again!",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "👨",
      rating: 5,
      comment: "Fast shipping and great customer service. The products exceeded my expectations.",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Emily Davis",
      avatar: "👩‍🦰",
      rating: 4,
      comment: "Love the sustainable fashion options. The fabric quality is excellent.",
      date: "2 weeks ago"
    }
  ];

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
      {/* Hero Section */}
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

      {/* Featured Products Section */}
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

      {/* Brands Section */}
      <section className="py-16 bg-gray-50 border-t border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading text-center mb-4">Our Trusted Brands</h2>
          <p className="text-gray-500 text-center mb-10">Partnering with the best in the industry</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {brands.map((brand, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {brand.logo}
                </div>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-brand transition">
                  {brand.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-heading mb-2">What Our Customers Say</h2>
            <p className="text-gray-500">Real reviews from real customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center text-3xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.date}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}