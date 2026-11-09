import { useState } from 'react'
import { statusPesananList } from '../data/initialData'
import { rupiah } from '../utils/helpers'

const badgeClass = {
  Diproses: 'bg-warning text-dark',
  Dikirim: 'bg-info text-dark',
  Selesai: 'bg-success',
  Dibatalkan: 'bg-danger',
}

// Halaman Pesanan: tambah pesanan, ubah status, hapus
export default function PesananPage({ orders, setOrders, products, customers }) {
  const [form, setForm] = useState({ pelanggan: '', produkId: '', jumlah: 1 })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // CREATE: total dihitung dari harga setelah diskon x jumlah
  const handleAdd = (e) => {
    e.preventDefault()
    const produk = products.find((p) => p.id === Number(form.produkId))
    if (!form.pelanggan || !produk) return setError('Pilih pelanggan dan produk.')
    if (Number(form.jumlah) < 1) return setError('Jumlah minimal 1.')
    const hargaAkhir = produk.harga - (produk.harga * produk.diskon) / 100
    const newId = orders.length ? Math.max(...orders.map((o) => o.id)) + 1 : 1
    setOrders([
      ...orders,
      {
        id: newId,
        pelanggan: form.pelanggan,
        produk: produk.nama,
        jumlah: Number(form.jumlah),
        total: hargaAkhir * Number(form.jumlah),
        status: 'Diproses',
      },
    ])
    setForm({ pelanggan: '', produkId: '', jumlah: 1 })
    setError('')
  }

  // UPDATE status
  const handleStatus = (id, status) =>
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)))

  // DELETE
  const handleDelete = (id) => {
    if (window.confirm('Hapus pesanan ini?')) setOrders(orders.filter((o) => o.id !== id))
  }

  return (
    <>
      <h1 className="h4 mb-3">Manajemen Pesanan</h1>

      <form className="card shadow-sm rounded mb-4" onSubmit={handleAdd}>
        <div className="card-body">
          <h2 className="h6 mb-3">Tambah Pesanan</h2>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <div className="row g-2">
            <div className="col-12 col-md-4">
              <select name="pelanggan" className="form-select" value={form.pelanggan} onChange={handleChange}>
                <option value="">-- Pilih pelanggan --</option>
                {customers.map((c) => <option key={c.id}>{c.nama}</option>)}
              </select>
            </div>
            <div className="col-12 col-md-4">
              <select name="produkId" className="form-select" value={form.produkId} onChange={handleChange}>
                <option value="">-- Pilih produk --</option>
                {products.map((p) => <option key={p.id} value={p.id}>{p.nama}</option>)}
              </select>
            </div>
            <div className="col-6 col-md-2">
              <input name="jumlah" type="number" min="1" className="form-control" value={form.jumlah} onChange={handleChange} />
            </div>
            <div className="col-6 col-md-2 d-grid">
              <button className="btn btn-primary" type="submit">Tambah</button>
            </div>
          </div>
        </div>
      </form>

      <section className="card shadow-sm rounded">
        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th><th>Pelanggan</th><th>Produk</th><th>Jumlah</th>
                <th>Total</th><th>Status</th><th className="text-end">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr><td colSpan="7" className="text-center text-muted py-4">Belum ada pesanan</td></tr>
              )}
              {orders.map((o, i) => (
                <tr key={o.id}>
                  <td>{i + 1}</td>
                  <td>{o.pelanggan}</td>
                  <td>{o.produk}</td>
                  <td>{o.jumlah}</td>
                  <td>{rupiah(o.total)}</td>
                  <td>
                    <span className={`badge me-2 ${badgeClass[o.status]}`}>{o.status}</span>
                    <select
                      className="form-select form-select-sm d-inline-block w-auto"
                      value={o.status}
                      onChange={(e) => handleStatus(o.id, e.target.value)}
                    >
                      {statusPesananList.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(o.id)}>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
