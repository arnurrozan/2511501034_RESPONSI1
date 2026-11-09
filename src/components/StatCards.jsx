import { getStatusStok } from '../utils/helpers'

// Kartu ringkasan (Bootstrap Card + grid responsif)
export default function StatCards({ products }) {
  const stats = [
    { label: 'Total Produk', value: products.length, cls: 'text-primary' },
    { label: 'Stok Aman', value: products.filter((p) => getStatusStok(p.stok) === 'Aman').length, cls: 'text-success' },
    { label: 'Stok Menipis', value: products.filter((p) => getStatusStok(p.stok) === 'Menipis').length, cls: 'text-warning' },
    { label: 'Stok Habis', value: products.filter((p) => getStatusStok(p.stok) === 'Habis').length, cls: 'text-danger' },
  ]
  return (
    <section className="row g-3 mb-4">
      {stats.map((s) => (
        <div className="col-6 col-lg-3" key={s.label}>
          <div className="card shadow-sm rounded stat-card h-100">
            <div className="card-body">
              <div className="small text-muted">{s.label}</div>
              <div className={`fs-3 fw-bold ${s.cls}`}>{s.value}</div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
