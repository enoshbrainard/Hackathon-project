"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('Recommended');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [catRes, prodRes] = await Promise.all([
        axios.get('http://localhost:5000/api/categories'),
        axios.get('http://localhost:5000/api/products')
      ]);
      setCategories(catRes.data);
      if (catRes.data.length > 0) {
        setActiveCategory(catRes.data[0]._id);
      }
      setProducts(prodRes.data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    router.push('/cart');
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if(query.length > 2) {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/search?query=${query}`);
        setProducts(res.data);
      } catch (e) {
        console.error("Search error", e);
      }
    } else if (query.length === 0) {
      fetchData(); // reset
    }
  };

  let filteredProducts = products.filter(p => p.category?._id === activeCategory || p.category === activeCategory);
  
  if (sortType === 'Price: Low to High') {
    filteredProducts.sort((a,b) => a.price - b.price);
  } else if (sortType === 'Price: High to Low') {
    filteredProducts.sort((a,b) => b.price - a.price);
  }
  
  const activeCategoryName = categories.find(c => c._id === activeCategory)?.name || 'Menu';

  return (
    <div className="flex flex-col md:flex-row py-8 gap-8 px-4 sm:px-6 lg:px-8">
      {/* Sidebar Category Nav */}
      <aside className="w-full md:w-64 flex-shrink-0 relative">
        <div className="sticky top-24">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={handleSearch}
            className="w-full mb-6 bg-white border border-slate-200 text-sm rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-all"
          />
          <h2 className="text-xl font-bold mb-4 text-slate-800 tracking-tight">Menu Highlights</h2>
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-4 md:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button 
                key={cat._id}
                onClick={() => setActiveCategory(cat._id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap ${
                  activeCategory === cat._id 
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30 ring-1 ring-orange-500' 
                  : 'bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-600 hover:ring-1 hover:ring-orange-200 shadow-sm border border-slate-100'
                }`}
              >
                <span className="text-xl">{cat.icon || '📌'}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main product area */}
      <div className="flex-1 min-w-0">
        {/* Promotional Banner */}
        <div className="mb-8 rounded-3xl overflow-hidden relative shadow-sm h-48 md:h-64 flex items-center bg-slate-900 group">
           <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80" alt="Special Offer" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
           <div className="relative z-10 p-8 md:p-12 text-white max-w-lg">
             <span className="inline-block px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-xs font-bold uppercase tracking-wider rounded-full mb-4 shadow-lg">Limited Time</span>
             <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight tracking-tight">Summer Combo Meals</h1>
             <p className="text-lg text-slate-200 font-medium">Get 20% off on all combo meals!</p>
           </div>
        </div>

        {/* Category Title & Breadcrumb */}
        <div className="mb-6 flex space-y-4 md:space-y-0 flex-col md:flex-row md:justify-between md:items-end">
          <div>
            <nav className="text-sm text-slate-500 mb-2 flex items-center gap-2 font-medium">
              <a href="#" className="hover:text-orange-500 transition-colors">Home</a>
              <span>/</span>
              <a href="#" className="hover:text-orange-500 transition-colors">Menu</a>
              <span>/</span>
              <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">{activeCategoryName}</span>
            </nav>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{activeCategoryName}</h2>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-sm font-medium text-slate-500">Showing {filteredProducts.length} results</span>
             <select 
               value={sortType}
               onChange={(e) => setSortType(e.target.value)}
               className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer shadow-sm"
             >
               <option>Recommended</option>
               <option>Price: Low to High</option>
               <option>Price: High to Low</option>
             </select>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
             <div className="text-center py-20 text-slate-500">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-orange-200 transition-all duration-300 group flex flex-col cursor-pointer">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-slate-50">
                  <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm z-10">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                     </svg>
                  </button>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-orange-600 transition-colors">{product.title}</h3>
                    <span className="font-bold text-xl text-slate-900">${product.price}</span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{product.description}</p>
                  
                  <button onClick={() => handleAddToCart(product)} className="w-full py-2.5 bg-orange-50 text-orange-600 font-bold rounded-xl group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-orange-400 group-hover:text-white transition-all shadow-sm group-hover:shadow-orange-500/25 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-20 text-slate-500">No products found in this category.</div>
        )}
      </div>
    </div>
  );
}
