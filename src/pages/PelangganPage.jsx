import { useState } from 'react'

const emptyForm = { nama: '', email: '', telepon: '', kota: '' }

// Halaman Pelanggan: CRUD pelanggan (form di atas, tabel di bawah)
export default function PelangganPage({ customers, setCustomers }) {
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null) // null = mode tambah
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const resetForm = () => {
    setForm(emptyForm)
    setEditId(null)
    setError('')
  }

  // CREATE & UPDATE
  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.nama.trim() === '') return setError('Nama wajib diisi.')
    if (!form.email.includes('@')) return setError('Email tidak valid.')

    if (editId) {
      setCustomers(customers.map((c) => (c.id === editId ? { ...form, id: editId } : c)))
    } else {
      const newId = customers.length ? Math.max(...customers.map((c) => c.id)) + 1 : 1
      setCustomers([...customers, { ...form, id: newId }])
    }
    resetForm()
  }

  // Isi form dengan data yang akan diubah
  const handleEdit = (c) => {
    setForm({ nama: c.nama, email: c.email, telepon: c.telepon, kota: c.kota })
    setEditId(c.id)
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // DELETE
  const handleDelete = (id) => {
    if (window.confirm('Hapus pelanggan ini?')) {
      setCustomers(customers.filter((c) => c.id !== id))
      if (editId === id) resetForm()
    }
  }

  return (
    <>
      <h1 className="h4 mb-3">Manajemen Pelanggan</h1>

      <form className="card shadow-sm rounded mb-4" onSubmit={handleSubmit}>
        <div className="card-body">
          <h2 className="h6 mb-3">{editId ? 'Ubah Pelanggan' : 'Tambah Pelanggan'}</h2>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <div className="row g-2">
            <div className="col-12 col-md-3">
              <input name="nama" className="form-control" placeholder="Nama" value={form.nama} onChange={handleChange} />
            </div>
            <div className="col-12 col-md-3">
              <input name="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange} />
            </div>
            <div className="col-6 col-md-2">
              <input name="telepon" className="form-control" placeholder="Telepon" value={form.telepon} onChange={handleChange} />
            </div>
            <div className="col-6 col-md-2">
              <input name="kota" className="form-control" placeholder="Kota" value={form.kota} onChange={handleChange} />
            </div>
            <div className="col-12 col-md-2 d-grid gap-1">
              <button className="btn btn-primary" type="submit">{editId ? 'Simpan' : 'Tambah'}</button>
              {editId && <button className="btn btn-light btn-sm" type="button" onClick={resetForm}>Batal</button>}
            </div>
          </div>
        </div>
      </form>

      <section className="card shadow-sm rounded">
        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr><th>#</th><th>Nama</th><th>Email</th><th>Telepon</th><th>Kota</th><th className="text-end">Aksi</th></tr>
            </thead>
            <tbody>
              {customers.length === 0 && (
                <tr><td colSpan="6" className="text-center text-muted py-4">Belum ada pelanggan</td></tr>
              )}
              {customers.map((c, i) => (
                <tr key={c.id}>
                  <td>{i + 1}</td>
                  <td className="fw-semibold">{c.nama}</td>
                  <td>{c.email}</td>
                  <td>{c.telepon}</td>
                  <td>{c.kota}</td>
                  <td className="text-end text-nowrap">
                    <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => handleEdit(c)}>Ubah</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c.id)}>Hapus</button>
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
