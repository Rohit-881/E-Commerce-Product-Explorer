import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaCreditCard, FaLock } from "react-icons/fa";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if(clearCart) clearCart();
    alert("Order placed successfully!");
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold text-white mb-4">No items to checkout</h2>
            <button 
                onClick={() => navigate('/products')}
                className="bg-[#00ff41] text-black px-6 py-2 rounded-full font-semibold hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all"
            >Return to Shop</button>
        </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">Secure Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Form */}
        <div className="lg:w-2/3">
            <form onSubmit={handlePlaceOrder} className="bg-[#111827] border border-[#1a2e1a] rounded-3xl p-6 lg:p-10 shadow-2xl">
                
                {/* Shipping Details */}
                <h2 className="text-xl font-semibold text-white mb-6 border-b border-[#1a2e1a] pb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-sm font-medium text-[#9ca3af] mb-2">First Name</label>
                        <input required type="text" className="w-full bg-[#0a0a0a] border border-[#1a2e1a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#9ca3af] mb-2">Last Name</label>
                        <input required type="text" className="w-full bg-[#0a0a0a] border border-[#1a2e1a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-colors" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#9ca3af] mb-2">Email Address</label>
                        <input required type="email" className="w-full bg-[#0a0a0a] border border-[#1a2e1a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-colors" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[#9ca3af] mb-2">Address</label>
                        <input required type="text" className="w-full bg-[#0a0a0a] border border-[#1a2e1a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#9ca3af] mb-2">City</label>
                        <input required type="text" className="w-full bg-[#0a0a0a] border border-[#1a2e1a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#9ca3af] mb-2">Postal Code</label>
                        <input required type="text" className="w-full bg-[#0a0a0a] border border-[#1a2e1a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-colors" />
                    </div>
                </div>

                {/* Payment Details */}
                <h2 className="text-xl font-semibold text-white mb-6 border-b border-[#1a2e1a] pb-4 flex items-center gap-2">
                    <FaCreditCard /> Payment Information
                </h2>
                <div className="bg-[#0a0a0a] border border-[#1a2e1a] rounded-xl p-6 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 text-[#1a2e1a]">
                        <FaLock size={80} className="opacity-20" />
                    </div>
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-[#9ca3af] mb-2">Card Number</label>
                            <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-[#111827] border border-[#1a2e1a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#9ca3af] mb-2">Expiry Date</label>
                            <input required type="text" placeholder="MM/YY" className="w-full bg-[#111827] border border-[#1a2e1a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#9ca3af] mb-2">CVC</label>
                            <input required type="text" placeholder="123" className="w-full bg-[#111827] border border-[#1a2e1a] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-colors" />
                        </div>
                    </div>
                </div>

                <button type="submit" className="w-full bg-[#00ff41] text-black font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-[#22c55e] hover:shadow-[0_0_30px_rgba(0,255,65,0.4)] transition-all duration-300 text-lg">
                    <FaShieldAlt /> Place Order (₹{total.toFixed(2)})
                </button>
            </form>
        </div>

        {/* Right: Summary */}
        <div className="lg:w-1/3">
            <div className="bg-[#111827] border border-[#1a2e1a] rounded-3xl p-6 shadow-2xl sticky top-28">
                <h2 className="text-xl font-bold text-white border-b border-[#1a2e1a] pb-4 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex gap-4">
                            <img src={item.thumbnail} className="w-16 h-16 object-contain bg-white/5 rounded-lg p-1" alt={item.title} />
                            <div className="flex-1">
                                <h4 className="text-white text-sm font-medium line-clamp-1">{item.title}</h4>
                                <p className="text-[#9ca3af] text-xs">Qty: {item.quantity}</p>
                                <p className="text-[#00ff41] font-semibold text-sm">₹{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-[#1a2e1a] pt-4 space-y-3">
                    <div className="flex justify-between text-[#9ca3af]">
                        <span>Subtotal</span>
                        <span className="text-white">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#9ca3af]">
                        <span>Tax (10%)</span>
                        <span className="text-white">₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#9ca3af]">
                        <span>Shipping</span>
                        <span className="text-[#00ff41]">Free</span>
                    </div>
                    
                    <div className="border-t border-[#1a2e1a] mt-4 pt-4 flex justify-between items-center">
                        <span className="text-white font-semibold text-lg">Total</span>
                        <span className="text-2xl font-extrabold text-[#00ff41]">₹{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;