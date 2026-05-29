import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'

const apiBase = import.meta.env.VITE_API_BASE || '/api'

function Category() {
  const { categoryName } = useParams()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetch(`${apiBase}/products?category=${encodeURIComponent(categoryName)}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .finally(() => setIsLoading(false))
  }, [categoryName])

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
    <div className="space-y-8">
      <div className="rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 px-6 py-10 text-white shadow-2xl sm:px-10">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Category</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{categoryName?.toUpperCase()}</h1>
        <p className="mt-4 max-w-2xl text-slate-300">Browse the latest products and on-trend arrivals for {categoryName?.toLowerCase()} style. Find curated looks, top brands, and seasonal offers.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-slate-900">{products.length} items found</h2>
            <Link to="/" className="text-sm font-semibold text-slate-700 transition hover:text-slate-900">Back to home</Link>
          </div>

          {isLoading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">Loading products...</div>
          ) : products.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">No items found in this category.</div>
          )}
        </div>

        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Filter</p>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">Popular categories</h3>
          </div>
          <ul className="space-y-3 text-sm text-slate-600">
            {['MEN', 'WOMEN', 'KIDS', 'FOOTWEAR', 'ACCESSORIES', 'HOME'].map((category) => (
              <li key={category}>
                <Link to={`/category/${category}`} className="block rounded-2xl px-4 py-3 transition hover:bg-slate-50 hover:text-slate-900">{category}</Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default Category
