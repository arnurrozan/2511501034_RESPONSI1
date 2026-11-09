import { useState, useEffect } from 'react'
import $ from 'jquery'
import { kategoriList } from '../data/initialData'

// Modal form tambah/ubah produk (HTML form + validasi sederhana)
export default function FormModal({ product, onSave, onClose }) {
  const isEdit = Boolean(product.id)
  const [form, setForm] = useState({
    nama: product.nama ?? '',
    kategori: product.kategori ?? kategoriList[0],
    harga: product.harga ?? '',
    diskon: product.diskon ?? 0,
    stok: product.stok ?? '',
  })
  const [error, setError] = useState('')

  // jQuery: efek fade-in modal
  useEffect(() => { $('#product-modal').css('opacity', 0).animate({ opacity: 1 }, 200) }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validasi dengan if/else
    if (form.nama.trim() === '') return setError('Nama produk wajib diisi.')
    if (Number(form.harga) <= 0) return setError('Harga harus lebih dari 0.')
    if (Number(form.diskon) < 0 || Number(form.diskon) > 100) return setError('Diskon harus 0-100%.')
    if (Number(form.stok) < 0 || form.stok === '') return setError('Stok tidak boleh kosong atau negatif.')

    onSave({
      ...product,
      nama: form.nama.trim(),
      kategori: form.kategori,
      harga: Number(form.harga),
      diskon: Number(form.diskon),
      stok: Number(form.stok),
    })
  }

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div id="product-modal" className="modal d-block" tabIndex="-1" onClick={onClose}>
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h2 className="modal-title h5">{isEdit ? 'Ubah Produk' : 'Tambah Produk'}</h2>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Tutup"></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <div className="mb-3">
                <label className="form-label" htmlFor="nama">Nama Produk</label>
                <input id="nama" name="nama" className="form-control" value={form.nama} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="kategori">Kategori</label>
                <select id="kategori" name="kategori" className="form-select" value={form.kategori} onChange={handleChange}>
                  {kategoriList.map((k) => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div className="row g-2">
                <div className="col-12 col-sm-5">
                  <label className="form-label" htmlFor="harga">Harga (Rp)</label>
                  <input id="harga" name="harga" type="number" className="form-control" value={form.harga} onChange={handleChange} />
                </div>
                <div className="col-6 col-sm-3">
                  <label className="form-label" htmlFor="diskon">Diskon (%)</label>
                  <input id="diskon" name="diskon" type="number" className="form-control" value={form.diskon} onChange={handleChange} />
                </div>
                <div className="col-6 col-sm-4">
                  <label className="form-label" htmlFor="stok">Stok</label>
                  <input id="stok" name="stok" type="number" className="form-control" value={form.stok} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light" onClick={onClose}>Batal</button>
              <button type="submit" className="btn btn-primary">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
