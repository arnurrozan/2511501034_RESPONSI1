import $ from 'jquery'

// Navbar Bootstrap + tombol pemicu buka-tutup sidebar (jQuery)
export default function Navbar({ admin }) {
  const toggleSidebar = () => $(document).trigger('toggle-sidebar')

  return (
    <header className="navbar navbar-light bg-white shadow-sm px-3">
      <button className="btn btn-outline-primary btn-sm" onClick={toggleSidebar} aria-label="Buka tutup sidebar">
        ☰ Menu
      </button>
      <span className="text-muted small">Halo, {admin} 👋</span>
    </header>
  )
}
