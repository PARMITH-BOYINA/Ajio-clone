import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.email || !form.password) {
      alert('Please enter both email and password.')
      return
    }

    alert('Login successful!')
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-sm sm:p-12">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Welcome back</p>
        <h1 className="text-3xl font-semibold text-slate-900">Login to your Ajio account</h1>
        <p className="text-sm leading-6 text-slate-600">Enter your account details below to continue shopping with style.</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <label className="block text-sm font-medium text-slate-700">
          Email address
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            required
            className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
            placeholder="you@example.com"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Password
          <input
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
            required
            className="mt-2 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
            placeholder="••••••••"
          />
        </label>

        <button type="submit" className="w-full rounded-full bg-slate-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-800">
          Login
        </button>
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="w-full rounded-full bg-slate-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-800"
        >
          Sign up
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Prefer to create a new account? Use the button above to sign up with the same style.
      </p>
    </div>
  )
}

export default Login
