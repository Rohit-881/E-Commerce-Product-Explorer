import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaArrowRight, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, increaseQty, decreaseQty, removeItem } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <FaShoppingCart className="text-[#00ff41]" /> Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-[#111827] border border-[#1a2e1a] rounded-2xl p-12 text-center shadow-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 rounded-full mb-6">
             <FaShoppingCart size={32} className="text-[#9ca3af]" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">Your cart is empty</h2>
          <p className="text-[#9ca3af] mb-8">Looks like you haven't added anything to your cart yet.</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/50 hover:bg-[#00ff41] hover:text-black px-8 py-3 rounded-full font-semibold transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.4)]"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Cart Items */}
            <div className="lg:w-2/3">
                <div className="bg-[#111827] border border-[#1a2e1a] rounded-2xl shadow-lg overflow-hidden hidden md:block">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0a0a0a] border-b border-[#1a2e1a] text-[#9ca3af] text-sm uppercase tracking-wider">
                                <th className="p-6 font-medium">Product</th>
                                <th className="p-6 font-medium text-center">Quantity</th>
                                <th className="p-6 font-medium text-right">Total</th>
                                <th className="p-6 font-medium text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id} className="border-b border-[#1a2e1a] hover:bg-white/5 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-white/5 rounded-lg p-2 flex-shrink-0">
                                                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white text-lg">{item.title}</p>
                                                <p className="text-[#00ff41]">₹{item.price}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center justify-center">
                                            <div className="flex items-center bg-[#0a0a0a] border border-[#1a2e1a] rounded-full">
                                                <button onClick={() => decreaseQty(item.id)} className="w-8 h-8 flex items-center justify-center text-[#9ca3af] hover:text-[#00ff41] hover:bg-white/5 rounded-l-full transition-colors"><FaMinus size={12} /></button>
                                                <span className="w-10 text-center text-white font-bold">{item.quantity}</span>
                                                <button onClick={() => increaseQty(item.id)} className="w-8 h-8 flex items-center justify-center text-[#9ca3af] hover:text-[#00ff41] hover:bg-white/5 rounded-r-full transition-colors"><FaPlus size={12} /></button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-right font-bold text-white text-lg">
                                        ₹{item.price * item.quantity}
                                    </td>
                                    <td className="p-6 text-center">
                                        <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-500 hover:bg-red-500/10 p-3 rounded-full transition-all">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cart View */}
                <div className="md:hidden space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-[#111827] border border-[#1a2e1a] rounded-2xl p-4 shadow-lg flex gap-4 relative">
                            <div className="w-20 h-20 bg-white/5 rounded-lg p-2 flex-shrink-0">
                                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="pr-8">
                                    <h3 className="font-semibold text-white line-clamp-1">{item.title}</h3>
                                    <p className="text-[#00ff41] font-medium">₹{item.price}</p>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                     <div className="flex items-center bg-[#0a0a0a] border border-[#1a2e1a] rounded-full">
                                        <button onClick={() => decreaseQty(item.id)} className="w-8 h-8 flex items-center justify-center text-[#9ca3af]"><FaMinus size={10} /></button>
                                        <span className="w-8 text-center text-white text-sm font-bold">{item.quantity}</span>
                                        <button onClick={() => increaseQty(item.id)} className="w-8 h-8 flex items-center justify-center text-[#9ca3af]"><FaPlus size={10} /></button>
                                    </div>
                                    <p className="font-bold text-white">₹{item.price * item.quantity}</p>
                                </div>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
                                <FaTrash size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:w-1/3">
                <div className="bg-[#111827] border border-[#1a2e1a] rounded-3xl p-6 shadow-2xl sticky top-28">
                    <h2 className="text-xl font-bold text-white border-b border-[#1a2e1a] pb-4 mb-6">Order Summary</h2>
                    
                    <div className="flex justify-between mb-4 text-[#9ca3af]">
                        <span>Subtotal ({cartItems.reduce((acc, i)=>acc+i.quantity, 0)} items)</span>
                        <span className="text-white font-medium">₹{total}</span>
                    </div>
                    <div className="flex justify-between mb-6 text-[#9ca3af]">
                        <span>Shipping</span>
                        <span className="text-[#00ff41]">Free</span>
                    </div>
                    
                    <div className="border-t border-[#1a2e1a] pt-6 mb-8 flex justify-between items-center">
                        <span className="text-white font-semibold text-lg">Total Amount</span>
                        <span className="text-3xl font-extrabold text-[#00ff41]">₹{total}</span>
                    </div>

                    <button
                        onClick={() => navigate("/checkout")}
                        className="w-full bg-[#00ff41] text-black font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-[#22c55e] hover:shadow-[0_0_30px_rgba(0,255,65,0.4)] transition-all duration-300"
                    >
                        Proceed to Checkout <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Cart;