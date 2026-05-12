import { useEffect, useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'

const apiBase = 'http://127.0.0.1:5000'

function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [searchParams] = useSearchParams()
  const query = searchParams.get('search')?.trim() || ''

  useEffect(() => {
    fetch(`${apiBase}/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data))

    fetch(`${apiBase}/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
  }, [])

  const filteredProducts = useMemo(() => {
    if (!query) return products
    const normalized = query.toLowerCase()
    return products.filter((product) => {
      return [product.name, product.brand, product.category, product.description]
        .join(' ')
        .toLowerCase()
        .includes(normalized)
    })
  }, [products, query])

  const suggestedProducts = useMemo(() => {
    if (!query || !filteredProducts.length) return []
    const topCategory = filteredProducts[0].category
    return products
      .filter((product) => product.category === topCategory && !filteredProducts.includes(product))
      .slice(0, 4)
  }, [products, filteredProducts, query])

  const addToCart = async (product) => {
    await fetch(`${apiBase}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    alert('Added to cart')
  }

  return (
    <div className="space-y-10">
      <section className="grid gap-8 rounded-[2rem] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-6 py-16 text-white shadow-2xl sm:grid-cols-[1.2fr_0.8fr] sm:px-10">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">Fashion | New arrivals</span>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">Ajio Studio</h1>
            <p className="text-4xl font-semibold text-emerald-200 sm:text-5xl">Find bold looks, premium brands, and fresh daily style.</p>
            <p className="max-w-2xl text-slate-300">Browse curated picks for men, women, kids, footwear, accessories, and more. Shop daily drops, seasonal must-haves, and designer collaborations.</p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Link to="/category/MEN" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">Shop Men</Link>
              <Link to="/category/WOMEN" className="rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Shop Women</Link>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-1 shadow-2xl sm:max-w-xl">
              <img
                src="https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80"
                alt="Stylish fashion collection"
                className="h-[360px] w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-4 rounded-[2rem] bg-slate-900/70 p-6 text-slate-200 shadow-xl sm:p-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Best seller</p>
              <p className="mt-4 text-2xl font-semibold">Weekend casuals</p>
              <p className="mt-2 text-sm text-slate-400">Comfort fits with bold prints and signature brands.</p>
            </div>
            <div className="rounded-3xl bg-emerald-500/10 p-5 text-emerald-200">
              <p className="text-sm uppercase tracking-[0.22em]">Offer</p>
              <p className="mt-4 text-2xl font-semibold">Up to 50% off</p>
              <p className="mt-2 text-sm text-emerald-300">Limited time discounts on seasonal favourites.</p>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-6">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Popular picks</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {products.slice(0, 4).map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="rounded-3xl bg-slate-900/90 p-4 transition hover:bg-slate-800">
                  <h3 className="text-base font-semibold text-white">{product.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">₹{product.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {query ? (
        <section className="space-y-6">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Search results</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">Showing results for “{query}”</h2>
              </div>
              <p className="text-sm text-slate-600">{filteredProducts.length} result{filteredProducts.length === 1 ? '' : 's'} found</p>
            </div>
          </div>

          {filteredProducts.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] bg-white p-8 text-center shadow-sm">
              <p className="text-lg font-semibold text-slate-900">No products matched your search.</p>
              <p className="mt-3 text-sm text-slate-600">Try different keywords like “jeans”, “sneakers”, or “women”.</p>
            </div>
          )}

          {suggestedProducts.length ? (
            <div className="space-y-4">
              <div className="rounded-[2rem] bg-slate-950 p-6 text-slate-100 shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Suggested for you</p>
                <h3 className="mt-2 text-2xl font-semibold">Similar styles from {suggestedProducts[0].category}</h3>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {suggestedProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} className="group rounded-3xl bg-white p-5 text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg">
                    <img src={product.image} alt={product.name} className="h-44 w-full rounded-3xl object-cover" />
                    <div className="mt-4 space-y-2">
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{product.brand}</p>
                      <h4 className="text-base font-semibold">{product.name}</h4>
                      <p className="text-sm text-slate-600">₹{product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Shop by category</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Explore collections</h2>
          </div>
          <Link to="/category/MEN" className="text-sm font-semibold text-slate-700 transition hover:text-slate-900">View all categories →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <Link key={category} to={`/category/${category}`} className="group rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{category}</p>
              <h3 className="mt-4 text-xl font-semibold group-hover:text-slate-900">Shop {category}</h3>
              <p className="mt-3 text-sm text-slate-500">Handpicked styles across top brands.</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Featured products</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">We curated the best fits</h2>
          </div>
          <Link to="/category/MEN" className="text-sm font-semibold text-slate-700 transition hover:text-slate-900">View all products →</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.slice(0, 9).map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home