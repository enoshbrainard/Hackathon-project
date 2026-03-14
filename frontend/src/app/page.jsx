import React from 'react';
import Image from 'next/image';

export default function Home() {
  const categories = [
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
    <div className="min-h-screen flex flex-col font-sans w-full">
      {/* Main Content Layout */}
      <main className="w-full py-8 flex flex-col md:flex-row gap-8 flex-1">
        
        {/* Sidebar Product Categories */}
        <aside className="w-full md:w-64 flex-shrink-0 relative">
          <div className="sticky top-24">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">Categories</h2>
            <nav className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-4 md:pb-0 scrollbar-hide">
              {categories.map((cat, idx) => (
                <button 
                  key={idx}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap group ${
                    cat.active 
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' 
                    : 'bg-transparent text-slate-600 hover:bg-white hover:text-orange-600 hover:shadow-sm border border-transparent hover:border-slate-200'
                  }`}
                >
                  <span className={`text-xl transition-transform ${cat.active ? '' : 'group-hover:scale-110'}`}>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Product Browsing Interface */}
        <div className="flex-1 min-w-0">
          
          {/* Promotional Hero Banner */}
          <div className="mb-8 rounded-3xl overflow-hidden relative shadow-sm h-48 md:h-64 flex items-center bg-slate-900 group">
             <Image 
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80" 
                alt="Summer Combo Meals" 
                fill 
                priority
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
             />
             <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
             <div className="relative z-10 p-8 md:p-12 text-white max-w-lg">
               <span className="inline-block px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-xs font-bold uppercase tracking-wider rounded-full mb-4 shadow-lg shadow-orange-500/20">Special Offer</span>
               <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight tracking-tight drop-shadow-md">Summer Combo Meals</h1>
               <p className="text-lg text-slate-200 font-medium drop-shadow-sm">Get 20% off on all combo meals today!</p>
             </div>
          </div>

          {/* Breadcrumb Navigation & Filters */}
          <div className="mb-6 flex space-y-4 md:space-y-0 flex-col md:flex-row md:justify-between md:items-end">
            <div>
              <nav className="text-sm text-slate-500 mb-2 flex items-center gap-2 font-medium">
                <a href="#" className="hover:text-orange-500 transition-colors">Home</a>
                <span className="text-slate-300">/</span>
                <a href="#" className="hover:text-orange-500 transition-colors">Products</a>
                <span className="text-slate-300">/</span>
                <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">Burgers</span>
              </nav>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Burgers</h2>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-1 rounded-xl shadow-sm border border-slate-200">
               <span className="text-sm font-medium text-slate-500 pl-3">Sort by:</span>
               <select className="bg-transparent border-none text-sm font-semibold rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-0 cursor-pointer">
                 <option>Recommended</option>
                 <option>Price: Low to High</option>
                 <option>Price: High to Low</option>
               </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 hover:border-orange-200 transition-all duration-300 group flex flex-col relative">
                
                {/* Wishlist Icon */}
                <button className="absolute top-6 right-6 p-2.5 bg-white/90 backdrop-blur rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm z-10">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                   </svg>
                </button>

                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-slate-100">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-orange-600 transition-colors">{product.name}</h3>
                    <span className="font-bold text-xl text-orange-600">${product.price}</span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{product.description}</p>
                  
                  <button className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Pagination */}
          <div className="mt-12 text-center pb-8 border-t border-slate-200 pt-8">
            <button className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-full hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-all shadow-sm flex items-center gap-2 mx-auto active:scale-95">
              <span>Load More Products</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

