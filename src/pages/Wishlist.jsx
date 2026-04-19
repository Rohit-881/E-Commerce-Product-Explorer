import React, { useContext } from "react";
import { WishlistContext } from "../contexts/WishlistContext";
import ProductCard from "../component/ProductCard";
import { FaHeartBroken } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlistItems } = useContext(WishlistContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="bg-[#111827] border border-[#1a2e1a] rounded-2xl p-12 text-center shadow-lg">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 rounded-full mb-6">
                <FaHeartBroken size={32} className="text-red-500/50" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-[#9ca3af] mb-8">Save items you like and they will show up here.</p>
            <button 
                onClick={() => navigate('/products')}
                className="bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/50 hover:bg-[#00ff41] hover:text-black px-8 py-3 rounded-full font-semibold transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.4)]"
            >
                Explore Products
            </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
                <ProductCard key={item.id} product={item} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;