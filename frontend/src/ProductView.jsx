import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const apiBase = import.meta.env.VITE_API_BASE || '/api'

function ProductView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${apiBase}/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .finally(() => setLoading(false))
  }, [id])

  const addToCart = async () => {
    if (!product) return
    await fetch(`${apiBase}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    alert('Product added to cart')
  }

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">Loading product...</div>
  }

  if (!product?.id) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">Product not found.</div>
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr]">
      <div className="rounded-[2rem] bg-white p-6 shadow-sm">
        <img src={product.image} alt={product.name} className="w-full rounded-[1.5rem] object-cover" />
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.2em] text-slate-500">
            <span>{product.brand}</span>
            <span>{product.category}</span>
          </div>
          <h1 className="text-4xl font-semibold text-slate-900">{product.name}</h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">{product.description}</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-3xl font-semibold text-slate-900">₹{product.price}</span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">{product.rating} ★</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Available sizes</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <span key={size} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-600">{size}</span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">Best for</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{product.usage}</p>
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-6 rounded-[2rem] bg-slate-950 p-8 text-slate-100 shadow-xl">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Checkout ready</p>
          <h2 className="text-3xl font-semibold">Grab it now</h2>
          <p className="text-sm leading-6 text-slate-400">Secure your item with express checkout and continue browsing more Ajio-inspired styles.</p>
        </div>
        <button onClick={addToCart} className="w-full rounded-full bg-emerald-500 px-6 py-4 text-base font-semibold text-white transition hover:bg-emerald-400">Add to cart</button>
        <button onClick={() => navigate('/cart')} className="w-full rounded-full border border-slate-700 bg-slate-900 px-6 py-4 text-base font-semibold text-slate-100 transition hover:bg-slate-800">View cart</button>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-sm leading-7 text-slate-400">
          <p className="font-semibold text-slate-200">Product details</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Delivery:</strong> Free shipping on orders over ₹799</p>
        </div>
      </aside>
    </div>
  )
}

export default ProductView
