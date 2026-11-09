import { useState } from 'react'
import StatCards from '../components/StatCards'
import ProductTable from '../components/ProductTable'
import FormModal from '../components/FormModal'

// Halaman Produk: CRUD produk
export default function ProdukPage({ products, setProducts }) {
  // null = modal tertutup, {} = tambah, objek produk = ubah
  const [editing, setEditing] = useState(null)

  // CREATE & UPDATE
  const handleSave = (data) => {
    if (data.id) {
      setProducts(products.map((p) => (p.id === data.id ? data : p)))
    } else {
      const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1
      setProducts([...products, { ...data, id: newId }])
    }
    setEditing(null)
  }

  // DELETE
  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus produk ini?')) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  return (
    <>
      <h1 className="h4 mb-3">Manajemen Produk</h1>
      <StatCards products={products} />
      <ProductTable
        products={products}
        onAdd={() => setEditing({})}
        onEdit={(p) => setEditing(p)}
        onDelete={handleDelete}
      />
      {editing && (
        <FormModal product={editing} onSave={handleSave} onClose={() => setEditing(null)} />
      )}
    </>
  )
}
