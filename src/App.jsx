import { useState, useEffect } from 'react'
import $ from 'jquery'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import ProdukPage from './pages/ProdukPage'
import PesananPage from './pages/PesananPage'
import PelangganPage from './pages/PelangganPage'
import PengaturanPage from './pages/PengaturanPage'
import useLocalStorage from './utils/useLocalStorage'
import {
  initialProducts,
  initialOrders,
  initialCustomers,
  initialSettings,
} from './data/initialData'

export default function App() {

  const [page, setPage] = useState('produk')


  const [products, setProducts] = useLocalStorage('produk-tokoku', initialProducts)
  const [orders, setOrders] = useLocalStorage('pesanan-tokoku', initialOrders)
  const [customers, setCustomers] = useLocalStorage('pelanggan-tokoku', initialCustomers)
  const [settings, setSettings] = useLocalStorage('pengaturan-tokoku', initialSettings)

  // jQuery: transisi pudar setiap pindah halaman
  useEffect(() => {
    $('#page-content').stop(true, true).css('opacity', 0.2).animate({ opacity: 1 }, 300)
  }, [page])

  // Reset semua data ke kondisi awal
  const handleReset = () => {
    setProducts(initialProducts)
    setOrders(initialOrders)
    setCustomers(initialCustomers)
  }

  return (
    <div id="app-root" className="d-flex">
      <Sidebar active={page} onNavigate={setPage} namaToko={settings.namaToko} />
      <div className="main-area flex-grow-1">
        <Navbar admin={settings.admin} />
        <main id="page-content" className="container-fluid p-3 p-md-4">
          {page === 'produk' && <ProdukPage products={products} setProducts={setProducts} />}
          {page === 'pesanan' && (
            <PesananPage orders={orders} setOrders={setOrders} products={products} customers={customers} />
          )}
          {page === 'pelanggan' && <PelangganPage customers={customers} setCustomers={setCustomers} />}
          {page === 'pengaturan' && (
            <PengaturanPage settings={settings} setSettings={setSettings} onReset={handleReset} />
          )}
        </main>
      </div>
    </div>
  )
}
