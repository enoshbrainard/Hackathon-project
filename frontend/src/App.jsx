function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        MERN Hackathon Starter
      </h1>
      <p className="text-xl text-slate-400 mb-8">
        React + Vite + Tailwind CSS + Node.js + Express + MongoDB
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 hover:border-cyan-500 transition-colors">
          <h2 className="text-2xl font-semibold mb-2 text-cyan-400">Frontend</h2>
          <p className="text-slate-400">Vite is running with Tailwind CSS and React Router ready.</p>
        </div>
        <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 hover:border-blue-500 transition-colors">
          <h2 className="text-2xl font-semibold mb-2 text-blue-400">Backend</h2>
          <p className="text-slate-400">Express server with Mongoose and CORS configured.</p>
        </div>
      </div>
    </div>
  )
}

export default App
