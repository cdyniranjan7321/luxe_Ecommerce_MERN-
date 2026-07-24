
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="group block">
      <div className="aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-brand">{product.name}</h3>
        <p className="text-xs text-gray-500">{product.category}</p>
        <p className="mt-1 font-semibold">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
