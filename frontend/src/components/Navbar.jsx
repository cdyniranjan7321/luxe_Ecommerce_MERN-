import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const categories = ["Men", "Women", "Kids", "Accessories"];

export default function Navbar() {
  const { userInfo, logout } = useAuth();
  const { itemsCount } = useCart();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(query ? `/?keyword=${query}` : "/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-heading text-2xl tracking-wide">
            LUXE
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/?category=${cat}`}
                className="hover:text-accent transition-colors"
              >
                {cat}
              </Link>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="hidden md:block flex-1 max-w-xs mx-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </form>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.694 2.617-7.121.096-.373-.156-.752-.549-.752H5.25M7.5 14.25L5.106 5.272M7.5 14.25L5.25 6M7.5 14.25 5.25 6" />
              </svg>
              {itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="relative group">
                <button className="text-sm font-medium hover:text-accent">
                  {userInfo.name.split(" ")[0]}
                </button>
                <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg border border-gray-100 rounded-md py-2 w-40">
                  <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-50">
                    My Orders
                  </Link>
                  {userInfo.isAdmin && (
                    <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-gray-50">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-sm font-medium hover:text-accent">
                Sign In
              </Link>
            )}

            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            {categories.map((cat) => (
              <Link key={cat} to={`/?category=${cat}`} onClick={() => setMenuOpen(false)} className="text-sm font-medium">
                {cat}
              </Link>
            ))}
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full border border-gray-300 rounded-full px-4 py-1.5 text-sm"
              />
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
