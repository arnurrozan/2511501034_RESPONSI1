import { useState } from 'react'

// Halaman Pengaturan: nama toko, nama admin, dan reset data
export default function PengaturanPage({ settings, setSettings, onReset }) {
  const [form, setForm] = useState(settings)
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSaved(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Jika kosong, pakai nilai bawaan (if/else)
    setSettings({
      namaToko: form.namaToko.trim() === '' ? 'TokoKu' : form.namaToko.trim(),
      admin: form.admin.trim() === '' ? 'Admin' : form.admin.trim(),
    })
    setSaved(true)
  }

  const handleReset = () => {
    if (window.confirm('Kembalikan semua data ke kondisi awal?')) onReset()
  }

  return (
    <>
      <h1 className="h4 mb-3">Pengaturan</h1>

      <form className="card shadow-sm rounded mb-4" onSubmit={handleSubmit}>
        <div className="card-body">
          <h2 className="h6 mb-3">Profil Toko</h2>
          {saved && <div className="alert alert-success py-2">Pengaturan disimpan.</div>}
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="namaToko">Nama Toko</label>
              <input id="namaToko" name="namaToko" className="form-control" value={form.namaToko} onChange={handleChange} />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="admin">Nama Admin</label>
              <input id="admin" name="admin" className="form-control" value={form.admin} onChange={handleChange} />
            </div>
          </div>
          <button className="btn btn-primary mt-3" type="submit">Simpan</button>
        </div>
      </form>

      <section className="card shadow-sm rounded border-danger">
        <div className="card-body">
          <h2 className="h6 text-danger">Reset Data</h2>
          <p className="small text-muted mb-3">Mengembalikan produk, pesanan, dan pelanggan ke data awal.</p>
          <button className="btn btn-outline-danger" onClick={handleReset}>Reset Semua Data</button>
        </div>
      </section>
    </>
  )
}
