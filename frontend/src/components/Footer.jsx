
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/?category=${category}`);
    // Scroll to products section
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-brand text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-heading text-xl mb-3">RASA</h3>
          <p className="text-sm text-gray-300">
            Contemporary clothing for every occasion. Quality fabrics, timeless design.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <button 
                onClick={() => handleCategoryClick('Men')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Men
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('Women')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Women
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('Kids')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Kids
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleCategoryClick('Accessories')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Accessories
              </button>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/shipping-returns" className="hover:text-white transition-colors">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Newsletter</h4>
          <p className="text-sm text-gray-300 mb-3">Get 10% off your first order.</p>
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-3 py-2 rounded text-brand text-sm"
          />
        </div>
      </div>
      
      <div className="text-center text-xs text-gray-400 py-4 border-t border-gray-700">
        © {new Date().getFullYear()} RASA. All rights reserved.
      </div>
    </footer>
  );
}