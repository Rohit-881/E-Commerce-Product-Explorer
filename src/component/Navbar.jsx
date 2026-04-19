import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { FaShoppingCart, FaHeart, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // total items count
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const navLinks = [
    { name: "Home", path: "/products" },
    { name: "Wishlist", path: "/wishlist" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1a2e1a] shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-[1] flex items-center">
            <Link to="/products" className="text-2xl font-bold tracking-tighter text-white hover:text-[#00ff41] transition-colors">
              AI<span className="text-[#00ff41]">Store</span>
            </Link>
          </div>

          {/* Desktop Center Links */}
          <div className="hidden md:flex flex-[2] justify-center items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#00ff41] ${
                  location.pathname === link.path ? "text-[#00ff41]" : "text-[#9ca3af]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side CTA & Icons */}
          <div className="hidden md:flex flex-[1] justify-end items-center space-x-6">
            
            <Link to="/wishlist" className="relative text-[#9ca3af] hover:text-[#00ff41] transition-colors hover:[filter:drop-shadow(0_0_10px_rgba(0,255,65,0.8))]">
              <FaHeart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative text-[#9ca3af] hover:text-[#00ff41] transition-colors hover:[filter:drop-shadow(0_0_10px_rgba(0,255,65,0.8))]">
              <FaShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#00ff41] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link to="/products" className="bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/50 hover:bg-[#00ff41] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-6">
            <Link to="/cart" className="relative text-[#9ca3af]">
              <FaShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#00ff41] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#9ca3af] hover:text-white"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#111827] border-b border-[#1a2e1a] animate-in fade-in slide-in-from-top-2">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-3 rounded-md text-base font-medium text-[#9ca3af] hover:text-[#00ff41] hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/wishlist"
              className="block px-3 py-3 rounded-md text-base font-medium text-[#9ca3af] hover:text-[#00ff41] hover:bg-white/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Wishlist ({wishlistItems.length})
            </Link>
            <div className="pt-4">
               <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/50 hover:bg-[#00ff41] hover:text-black px-6 py-3 rounded-md text-base font-semibold transition-all">
                  Get Started
               </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;