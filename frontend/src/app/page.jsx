import React from 'react';

export default function Home() {
  const categories = [
    { name: 'Deals', icon: '🔥' },
    { name: 'Burgers', icon: '🍔', active: true },
    { name: 'Chicken', icon: '🍗' },
    { name: 'Beverages', icon: '🥤' },
    { name: 'Desserts', icon: '🍦' },
    { name: 'Sides', icon: '🍟' },
    { name: 'Combos', icon: '🍱' },
  ];

  const products = [
    { id: 1, name: 'Double Cheese Burger', price: 5.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80', description: 'Two 100% beef patties with cheese, onions, and signature sauce.' },
    { id: 2, name: 'Spicy Chicken Sandwich', price: 4.99, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=500&q=80', description: 'Crispy chicken breast with spicy mayo and fresh lettuce.' },
    { id: 3, name: 'Bacon Crunch Burger', price: 6.49, image: 'https://images.unsplash.com/photo-1594212752834-3158c5483250?auto=format&fit=crop&w=500&q=80', description: 'Topped with crispy smoked bacon and cheddar cheese.' },
    { id: 4, name: 'Veggie Delight', price: 4.49, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80', description: 'Plant-based patty with fresh veggies and vegan mayo.' },
    { id: 5, name: 'Classic Burger', price: 3.99, image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=500&q=80', description: 'Our original, beloved classic recipe passed down for years.' },
    { id: 6, name: 'Mushroom Swiss', price: 5.49, image: 'https://images.unsplash.com/photo-1621360841013-c76831ef5bc3?auto=format&fit=crop&w=500&q=80', description: 'Loaded with sautéed portobello mushrooms and swiss cheese.' },
  ];

  return (
    <div className="flex flex-col md:flex-row py-8 gap-8 px-4 sm:px-6 lg:px-8">
      {/* Sidebar Category Nav */}
      <aside className="w-full md:w-64 flex-shrink-0 relative">
        <div className="sticky top-24">
          <h2 className="text-xl font-bold mb-4 text-slate-800 tracking-tight">Menu Highlights</h2>
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-4 md:pb-0 scrollbar-hide">
            {categories.map((cat, idx) => (
              <button 
                key={idx}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap ${
                  cat.active 
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30 ring-1 ring-orange-500' 
                  : 'bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-600 hover:ring-1 hover:ring-orange-200 shadow-sm border border-slate-100'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
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
              <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">Burgers</span>
            </nav>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Burgers</h2>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-sm font-medium text-slate-500">Showing {products.length} results</span>
             <select className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer shadow-sm">
               <option>Sort by: Recommended</option>
               <option>Price: Low to High</option>
               <option>Price: High to Low</option>
             </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-orange-200 transition-all duration-300 group flex flex-col cursor-pointer">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-slate-50">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm z-10">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                   </svg>
                </button>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-orange-600 transition-colors">{product.name}</h3>
                  <span className="font-bold text-xl text-slate-900">${product.price}</span>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{product.description}</p>
                
                <button className="w-full py-2.5 bg-orange-50 text-orange-600 font-bold rounded-xl group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-orange-400 group-hover:text-white transition-all shadow-sm group-hover:shadow-orange-500/25 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Lazy Loading / "Load More" Skeleton Simulator */}
        <div className="mt-12 text-center pb-12">
          <button className="px-8 py-3 bg-white border border-slate-200 text-slate-600 font-semibold rounded-full hover:bg-slate-50 hover:text-orange-600 transition-colors shadow-sm inline-flex items-center gap-2 group">
            <svg className="w-5 h-5 animate-spin text-slate-400 group-hover:text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading more deliciousness...
          </button>
        </div>
      </div>
    </div>
  );
}
