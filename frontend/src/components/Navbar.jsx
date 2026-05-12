import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineShoppingBag, HiOutlineSearch } from 'react-icons/hi'

function Navbar() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (event) => {
    event.preventDefault()
    const query = search.trim()
    if (!query) return
    navigate(`/?search=${encodeURIComponent(query)}`)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-950 transition hover:text-slate-700">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-950 text-lg font-semibold text-white">A</span>
          <span className="leading-none">
            <span className="block text-lg">Ajio</span>
            <span className="block text-sm text-slate-500">Style Studio</span>
          </span>
        </Link>

        <form onSubmit={handleSearch} className="hidden flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-2 shadow-sm sm:flex">
          <HiOutlineShoppingBag className="hidden" />
          <HiOutlineSearch className="h-5 w-5 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search brands, styles, categories"
            className="w-full border-none bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500"
          />
          <button type="submit" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
            Search
          </button>
        </form>

        <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-700">
          <Link to="/" className="rounded-full px-4 py-2 transition hover:bg-slate-100">Home</Link>
          <Link to="/category/MEN" className="rounded-full px-4 py-2 transition hover:bg-slate-100">Men</Link>
          <Link to="/category/WOMEN" className="rounded-full px-4 py-2 transition hover:bg-slate-100">Women</Link>
          <Link to="/category/KIDS" className="rounded-full px-4 py-2 transition hover:bg-slate-100">Kids</Link>
          <Link
            to="/login"
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Login / Sign in
          </Link>
          <Link to="/cart" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-950 px-4 py-2 text-white transition hover:bg-slate-800">
            <HiOutlineShoppingBag className="h-5 w-5" /> Cart
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
