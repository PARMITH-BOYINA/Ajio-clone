import { Link } from 'react-router-dom'

function ProductCard({ product, onAdd }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/product/${product.id}`} className="block overflow-hidden bg-slate-100">
        <img src={product.image} alt={product.name} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{product.category}</p>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{product.brand}</span>
        </div>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-base font-semibold text-slate-900 hover:text-slate-700">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between gap-3">
          <p className="text-lg font-semibold text-slate-900">₹{product.price}</p>
          <button
            onClick={() => onAdd(product)}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
