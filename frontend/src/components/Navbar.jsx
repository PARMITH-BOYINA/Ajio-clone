import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  HiOutlineShoppingBag,
  HiOutlineSearch,
  HiOutlineMenu,
} from 'react-icons/hi'

function Navbar() {
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = useNavigate()

  const handleSearch = (event) => {
    event.preventDefault()

    const query = search.trim()

    if (!query) return

    navigate(`/?search=${encodeURIComponent(query)}`)
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-black to-slate-700 text-xl font-bold text-white shadow-md">
            A
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-wide text-slate-900">
              AJIO
            </h1>

            <p className="text-xs uppercase tracking-[4px] text-slate-500">
              Fashion Store
            </p>
          </div>
        </Link>

        {/* SEARCH BAR */}
        <form
          onSubmit={handleSearch}
          className="hidden w-full max-w-xl items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-2 shadow-sm md:flex"
        >
          <HiOutlineSearch className="h-5 w-5 text-slate-500" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search for products, brands and more..."
            className="w-full bg-transparent px-3 text-sm text-slate-800 outline-none"
          />

          <button
            type="submit"
            className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-slate-800"
          >
            Search
          </button>
        </form>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-3 lg:flex">

          <Link
            to="/"
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Home
          </Link>

          <Link
            to="/category/MEN"
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Men
          </Link>

          <Link
            to="/category/WOMEN"
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Women
          </Link>

          <Link
            to="/category/KIDS"
            className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Kids
          </Link>

          <Link
            to="/login"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Login
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-black to-slate-700 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:scale-105"
          >
            <HiOutlineShoppingBag className="h-5 w-5" />
            Cart
          </Link>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-slate-800 lg:hidden"
        >
          <HiOutlineMenu className="h-7 w-7" />
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 shadow-lg lg:hidden">

          <form
            onSubmit={handleSearch}
            className="mb-5 flex items-center rounded-full border border-slate-300 bg-slate-100 px-3 py-2"
          >
            <HiOutlineSearch className="h-5 w-5 text-slate-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search..."
              className="w-full bg-transparent px-3 text-sm outline-none"
            />
          </form>

          <div className="flex flex-col gap-3">

            <Link to="/" className="rounded-lg px-4 py-3 hover:bg-slate-100">
              Home
            </Link>

            <Link to="/category/MEN" className="rounded-lg px-4 py-3 hover:bg-slate-100">
              Men
            </Link>

            <Link to="/category/WOMEN" className="rounded-lg px-4 py-3 hover:bg-slate-100">
              Women
            </Link>

            <Link to="/category/KIDS" className="rounded-lg px-4 py-3 hover:bg-slate-100">
              Kids
            </Link>

            <Link
              to="/login"
              className="rounded-lg bg-black px-4 py-3 text-center text-white"
            >
              Login
            </Link>

            <Link
              to="/cart"
              className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-white"
            >
              <HiOutlineShoppingBag className="h-5 w-5" />
              Cart
            </Link>

          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar