import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 py-10 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:px-8 lg:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Ajio Clone</h2>
          <p className="mt-3 max-w-sm text-sm leading-6">A modern e-commerce clone with category browsing, product detail pages, and checkout flow designed for an Ajio-inspired experience.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Quick links</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/category/MEN" className="hover:text-white">Men</Link></li>
            <li><Link to="/category/WOMEN" className="hover:text-white">Women</Link></li>
            <li><Link to="/category/KIDS" className="hover:text-white">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Need help?</h3>
          <p className="mt-4 text-sm leading-6 text-slate-300">Support, shipping and returns, payment options, and gift cards—all in one place.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
