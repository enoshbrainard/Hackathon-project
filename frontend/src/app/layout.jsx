import './globals.css'

export const metadata = {
  title: 'MERN Hackathon Starter',
  description: 'Next.js + Tailwind CSS + Node.js + Express + MongoDB',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
