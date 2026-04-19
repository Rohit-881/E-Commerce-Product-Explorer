import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/api";
import ProductCard from "../component/ProductCard";
import { FaSearch, FaSlidersH, FaSortAmountDown } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data?.products || []);
    } catch (error) {
      console.log("Error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <div className="w-16 h-16 border-4 border-[#1a2e1a] border-t-[#00ff41] rounded-full animate-spin shadow-[0_0_15px_rgba(0,255,65,0.5)]"></div>
      </div>
    );
  }

  const filteredProducts = products.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || item.category === category;
    const matchPrice = item.price <= maxPrice;
    return matchSearch && matchCategory && matchPrice;
  });

  let sortedProducts = [...filteredProducts];
  if (sort === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Explore Our <span className="text-[#00ff41] drop-shadow-[0_0_10px_rgba(0,255,65,0.4)]">Collection</span>
        </h1>
        <p className="text-[#9ca3af] max-w-2xl mx-auto text-lg">
          Discover premium quality products selected just for you. Dark themed perfection with seamless interactions.
        </p>
      </div>

      {/* Controls Section */}
      <div className="bg-[#111827] border border-[#1a2e1a] rounded-2xl p-6 mb-10 shadow-lg">
        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-[#9ca3af]" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#1a2e1a] rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#9ca3af] focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-all"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Categories */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3 text-[#9ca3af] text-sm font-semibold uppercase tracking-wider">
              <FaSlidersH /> Categories
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category === cat
                      ? "bg-[#00ff41] text-black shadow-[0_0_15px_rgba(0,255,65,0.4)]"
                      : "bg-[#0a0a0a] text-[#9ca3af] border border-[#1a2e1a] hover:border-[#00ff41]/50 hover:text-white"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col sm:flex-row gap-6">
            {/* Price Range */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-3">
                 <span className="text-[#9ca3af] text-sm font-semibold uppercase tracking-wider">Max Price</span>
                 <span className="text-[#00ff41] font-bold">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-[#0a0a0a] rounded-lg appearance-none cursor-pointer accent-[#00ff41]"
              />
            </div>

            {/* Sorting */}
            <div className="flex-1">
               <div className="flex items-center gap-2 mb-3 text-[#9ca3af] text-sm font-semibold uppercase tracking-wider">
                <FaSortAmountDown /> Sort By
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#1a2e1a] rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#00ff41] focus:ring-1 focus:ring-[#00ff41] transition-all"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: `right 1rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
              >
                <option value="default" className="bg-[#0a0a0a]">Default</option>
                <option value="low" className="bg-[#0a0a0a]">Price: Low to High</option>
                <option value="high" className="bg-[#0a0a0a]">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center bg-[#111827] border border-[#1a2e1a] rounded-2xl p-12">
          <p className="text-[#9ca3af] text-lg">No products found matching your criteria.</p>
          <button 
            onClick={() => {setSearch(''); setCategory('all'); setMaxPrice(2000); setSort('default');}}
            className="mt-4 text-[#00ff41] hover:underline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
