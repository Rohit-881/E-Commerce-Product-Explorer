import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct } from "../services/api";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { FaHeart, FaShoppingCart, FaArrowLeft, FaStar } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    const data = await getSingleProduct(id);
    setProduct(data);
    setLoading(false);
  };

  if (loading) {
     return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <div className="w-16 h-16 border-4 border-[#1a2e1a] border-t-[#00ff41] rounded-full animate-spin shadow-[0_0_15px_rgba(0,255,65,0.5)]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)] text-white">
        <h2>Product not found.</h2>
      </div>
    );
  }

  const isWishlisted = wishlistItems?.some(item => item.id === product.id) || false;

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    for(let i=0; i<qty; i++) {
        addToCart(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-[#9ca3af] hover:text-[#00ff41] transition-colors mb-8 group w-max"
      >
        <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Products
      </button>

      <div className="bg-[#111827] border border-[#1a2e1a] rounded-3xl p-6 lg:p-10 shadow-2xl flex flex-col lg:flex-row gap-12">
        
        {/* Left: Image */}
        <div className="lg:w-1/2 flex flex-col gap-4">
            <div className="w-full bg-white/5 rounded-2xl p-8 flex items-center justify-center relative overflow-hidden group border border-[#1a2e1a]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00ff41]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-[300px] sm:h-[400px] object-contain group-hover:scale-105 transition-transform duration-700 relative z-10"
                />
            </div>
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4 mt-2">
                  {product.images.slice(0, 4).map((img, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-2 border border-[#1a2e1a] hover:border-[#00ff41]/50 transition-colors">
                          <img src={img} className="w-full h-20 object-contain" alt={`thumbnail ${i+1}`} />
                      </div>
                  ))}
              </div>
            )}
        </div>

        {/* Right: Details */}
        <div className="lg:w-1/2 flex flex-col justify-center">
            {/* Tag/Category */}
            <div className="mb-4 flex items-center gap-4">
                <span className="bg-[#0a0a0a] border border-[#1a2e1a] text-[#00ff41] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    {product.category}
                </span>
                <span className="flex items-center text-yellow-500 text-sm font-semibold">
                    <FaStar className="mr-1" /> {product.rating || '4.5'}
                </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {product.title}
            </h1>
            
            <p className="text-4xl text-[#00ff41] font-extrabold mb-6 tracking-tight">
                ₹{product.price}
            </p>
            
            <p className="text-lg text-[#9ca3af] mb-8 leading-relaxed">
                {product.description}
            </p>

            <div className="flex items-center gap-4 mb-8">
                <span className="text-white font-medium">Quantity:</span>
                <div className="flex items-center bg-[#0a0a0a] border border-[#1a2e1a] rounded-full">
                    <button 
                        onClick={() => setQty(q => Math.max(1, q - 1))}
                        className="w-10 h-10 flex items-center justify-center text-[#9ca3af] hover:text-[#00ff41] hover:bg-white/5 rounded-l-full transition-colors"
                    >-</button>
                    <span className="w-12 text-center text-white font-bold">{qty}</span>
                    <button 
                        onClick={() => setQty(q => q + 1)}
                        className="w-10 h-10 flex items-center justify-center text-[#9ca3af] hover:text-[#00ff41] hover:bg-white/5 rounded-r-full transition-colors"
                    >+</button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#00ff41] text-black text-lg font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#22c55e] hover:shadow-[0_0_30px_rgba(0,255,65,0.5)] transition-all duration-300"
                >
                    <FaShoppingCart /> Add to Cart
                </button>
                <button 
                    onClick={toggleWishlist}
                    className={`sm:w-20 lg:w-32 py-4 rounded-xl border flex items-center justify-center gap-2 transition-all duration-300 ${
                        isWishlisted 
                        ? 'bg-red-500/10 border-red-500 text-red-500 hover:bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                        : 'bg-[#0a0a0a] border-[#1a2e1a] text-[#9ca3af] hover:border-red-500 hover:text-red-500'
                    }`}
                >
                    <FaHeart size={20} className={isWishlisted ? "scale-110" : ""} />
                    <span className="hidden lg:inline">{isWishlisted ? 'Saved' : 'Save'}</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;