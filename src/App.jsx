import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Navbar from './component/Navbar';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import CartProvider from "./contexts/CartContext";
import WishlistProvider from "./contexts/WishlistContext";

const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar /> 
          <main className="flex-grow pt-[80px]"> {/* Offset for sticky navbar */}
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
