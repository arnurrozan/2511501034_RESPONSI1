import { useState, useEffect, useRef } from 'react'
import $ from 'jquery'
import { kategoriList } from '../data/initialData'
import { getStatusStok, rupiah } from '../utils/helpers'

const badgeClass = { Aman: 'bg-success', Menipis: 'bg-warning text-dark', Habis: 'bg-danger' }

export default function ProductTable({ products, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState('')
  const [kategori, setKategori] = useState('Semua')
  const tbodyRef = useRef(null)

  // Filter data (pencarian + kategori)
  const filtered = products.filter(
    (p) =>
      p.nama.toLowerCase().includes(search.toLowerCase()) &&
      (kategori === 'Semua' || p.kategori === kategori)
  )

  // jQuery: transisi pudar pada tabel saat produk berubah (bukan saat mengetik)
  useEffect(() => {
    $(tbodyRef.current).stop(true, true).css('opacity', 0.3).animate({ opacity: 1 }, 300)
  }, [products, kategori])

  return (
    <section className="card shadow-sm rounded">
      <div className="card-body">
        <div className="row g-2 mb-3">
          <div className="col-12 col-md-5">
            <input
              className="form-control"
              placeholder="Cari nama produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-7 col-md-4">
            <select className="form-select" value={kategori} onChange={(e) => setKategori(e.target.value)}>
              <option>Semua</option>
              {kategoriList.map((k) => <option key={k}>{k}</option>)}
            </select>
          </div>
          <div className="col-5 col-md-3 d-grid">
            <button className="btn btn-primary" onClick={onAdd}>+ Tambah Produk</button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th><th>Produk</th><th>Kategori</th><th>Harga</th>
                <th>Diskon</th><th>Harga Akhir</th><th>Stok</th><th>Status</th><th className="text-end">Aksi</th>
              </tr>
            </thead>
            <tbody ref={tbodyRef}>
              {filtered.length === 0 && (
                <tr><td colSpan="9" className="text-center text-muted py-4">Produk tidak ditemukan</td></tr>
              )}
              {filtered.map((p, i) => {
                const status = getStatusStok(p.stok)
                const hargaAkhir = p.harga - (p.harga * p.diskon) / 100
                return (
                  <tr key={p.id}>
                    <td>{i + 1}</td>
                    <td className="fw-semibold">{p.nama}</td>
                    <td>{p.kategori}</td>
                    <td>{rupiah(p.harga)}</td>
                    <td>{p.diskon}%</td>
                    <td>{rupiah(hargaAkhir)}</td>
                    <td>{p.stok}</td>
                    <td><span className={`badge ${badgeClass[status]}`}>{status}</span></td>
                    <td className="text-end text-nowrap">
                      <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => onEdit(p)}>Ubah</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(p.id)}>Hapus</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
