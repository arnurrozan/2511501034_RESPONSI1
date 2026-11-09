import { useEffect } from 'react'
import $ from 'jquery'

// Daftar menu sidebar
const menus = [
  { key: 'produk', label: '📦 Produk' },
  { key: 'pesanan', label: '🧾 Pesanan' },
  { key: 'pelanggan', label: '👥 Pelanggan' },
  { key: 'pengaturan', label: '⚙️ Pengaturan' },
]

// Sidebar dibuka/ditutup lewat jQuery (event 'toggle-sidebar' dari Navbar)
export default function Sidebar({ active, onNavigate, namaToko }) {
  useEffect(() => {
    // Di layar kecil, sidebar tertutup di awal
    if (window.innerWidth < 768) $('#sidebar').hide()

    const handler = () => $('#sidebar').stop(true, true).animate({ width: 'toggle' }, 250)
    $(document).on('toggle-sidebar', handler)
    return () => $(document).off('toggle-sidebar', handler)
  }, [])

  const handleClick = (e, key) => {
    e.preventDefault()
    onNavigate(key)
    // Di layar kecil, tutup sidebar setelah memilih menu
    if (window.innerWidth < 768) $('#sidebar').animate({ width: 'hide' }, 200)
  }

  return (
    <aside id="sidebar" className="sidebar text-white p-3">
      <h2 className="h5 mb-4">🛍️ {namaToko} Admin</h2>
      <nav>
        <ul className="nav flex-column">
          {menus.map((m) => (
            <li className="nav-item" key={m.key}>
              <a
                href="#"
                className={`nav-link ${active === m.key ? 'active' : ''}`}
                onClick={(e) => handleClick(e, m.key)}
              >
                {m.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
