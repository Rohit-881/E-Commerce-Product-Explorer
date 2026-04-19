import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  const isWishlisted = wishlistItems?.some(item => item.id === product.id) || false;

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div 
      onClick={() => navigate(`/products/${product.id}`)}
      className="group relative bg-[#111827] border border-[#1a2e1a] rounded-xl p-4 transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-1 flex flex-col"
    >
      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
          isWishlisted 
            ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.3)]" 
            : "bg-black/40 text-gray-400 hover:text-red-500 hover:bg-black/60"
        }`}
      >
        <FaHeart size={16} />
      </button>

      {/* Image Container */}
      <div className="w-full h-56 bg-white/5 rounded-lg mb-4 overflow-hidden flex items-center justify-center p-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white line-clamp-1 mb-1 group-hover:text-[#00ff41] transition-colors">
            {product.title}
          </h2>
          <p className="text-sm text-[#9ca3af] line-clamp-2 mb-3">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#1a2e1a]">
          <p className="text-[#00ff41] font-bold text-xl">
            ₹{product.price}
          </p>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex items-center gap-2 bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/50 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:bg-[#00ff41] hover:text-black hover:shadow-[0_0_15px_rgba(0,255,65,0.4)]"
          >
            <FaShoppingCart />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;