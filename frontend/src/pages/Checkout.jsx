import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const apiBase = import.meta.env.VITE_API_BASE || '/api'

function Checkout() {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', pin: '' })
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${apiBase}/cart`)
      .then((response) => response.json())
      .then((data) => setCart(data))
      .finally(() => setLoading(false))
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const submitOrder = async (event) => {
    event.preventDefault()
    if (!form.name || !form.email || !form.address) {
      alert('Please fill the required fields.')
      return
    }
    await fetch(`${apiBase}/cart/clear`, { method: 'POST' })
    alert('Order placed successfully!')
    navigate('/')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6 rounded-[2rem] bg-white p-8 shadow-sm">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Checkout</p>
          <h1 className="text-3xl font-semibold text-slate-900">Secure checkout</h1>
          <p className="text-sm leading-6 text-slate-600">Enter your billing information and complete the order for your selected items.</p>
        </div>

        <form onSubmit={submitOrder} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700">
              <span>Name</span>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none" />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span>Email</span>
              <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none" />
            </label>
          </div>
          <label className="space-y-2 text-sm text-slate-700">
            <span>Address</span>
            <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street address" className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none" />
          </label>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="space-y-2 text-sm text-slate-700">
              <span>City</span>
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none" />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span>PIN Code</span>
              <input value={form.pin} onChange={(e) => setForm({ ...form, pin: e.target.value })} placeholder="PIN" className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none" />
            </label>
            <div className="space-y-2 text-sm text-slate-700">
              <span>Payment</span>
              <div className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-600">Cash on Delivery</div>
            </div>
          </div>
          <button type="submit" className="w-full rounded-full bg-slate-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-800">Place order</button>
        </form>
      </div>

      <aside className="space-y-6 rounded-[2rem] bg-slate-950 p-8 text-slate-100 shadow-xl">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Order summary</p>
          <h2 className="text-3xl font-semibold">₹{total.toLocaleString('en-IN')}</h2>
          <p className="text-sm leading-6 text-slate-400">You are about to complete payment for {cart.length} item(s).</p>
        </div>

        {loading ? (
          <p className="rounded-3xl bg-slate-900 p-6 text-sm text-slate-400">Loading cart details…</p>
        ) : cart.length ? (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="rounded-3xl bg-slate-900 p-4">
                <div className="flex items-start gap-4">
                  <img src={item.image} alt={item.name} className="h-16 w-16 rounded-3xl object-cover" />
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-slate-400">₹{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-slate-900 p-6 text-sm text-slate-400">Your cart is empty. Please add products first.</div>
        )}
      </aside>
    </div>
  )
}

export default Checkout
