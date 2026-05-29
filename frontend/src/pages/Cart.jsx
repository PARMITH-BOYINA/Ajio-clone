import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const apiBase = import.meta.env.VITE_API_BASE || '/api'

function Cart() {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  const loadCart = () => {
    setLoading(true)
    fetch(`${apiBase}/cart`)
      .then((response) => response.json())
      .then((data) => setCart(data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadCart()
  }, [])

  const removeItem = async (id) => {
    await fetch(`${apiBase}/cart/${id}`, {
      method: 'DELETE'
    })
    loadCart()
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-6 rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Your cart</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Review items</h1>
          </div>
          <Link to="/" className="text-sm font-semibold text-slate-700 transition hover:text-slate-900">Continue shopping</Link>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">Loading your cart...</div>
        ) : !cart.length ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">Your cart is empty.</div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="h-24 w-24 rounded-3xl object-cover" />
                  <div>
                    <p className="text-base font-semibold text-slate-900">{item.name}</p>
                    <p className="mt-2 text-sm text-slate-500">{item.brand} • {item.category}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">₹{item.price}</p>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="self-start rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:self-center">Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <aside className="space-y-6 rounded-[2rem] bg-slate-950 p-8 text-slate-100 shadow-xl">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Order summary</p>
          <h2 className="text-3xl font-semibold">₹{total.toLocaleString('en-IN')}</h2>
          <p className="text-sm leading-6 text-slate-400">Shipping and taxes calculated at checkout.</p>
        </div>
        <Link to="/checkout" className="block rounded-full bg-emerald-500 px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-emerald-400">Checkout</Link>
      </aside>
    </div>
  )
}

export default Cart
