// Data awal produk: array of objects (pengganti database)
export const kategoriList = ['Elektronik', 'Fashion', 'Makanan', 'Rumah Tangga', 'Olahraga']

export const initialProducts = [
  { id: 1, nama: 'Headphone Bluetooth', kategori: 'Elektronik', harga: 350000, diskon: 10, stok: 25 },
  { id: 2, nama: 'Kaos Polos Premium', kategori: 'Fashion', harga: 85000, diskon: 0, stok: 8 },
  { id: 3, nama: 'Kopi Arabika 250g', kategori: 'Makanan', harga: 65000, diskon: 5, stok: 40 },
  { id: 4, nama: 'Rak Sepatu Susun', kategori: 'Rumah Tangga', harga: 150000, diskon: 15, stok: 0 },
  { id: 5, nama: 'Matras Yoga', kategori: 'Olahraga', harga: 120000, diskon: 0, stok: 5 },
  { id: 6, nama: 'Power Bank 10000mAh', kategori: 'Elektronik', harga: 175000, diskon: 20, stok: 18 },
]

// Data awal pelanggan
export const initialCustomers = [
  { id: 1, nama: 'Budi Santoso', email: 'budi@mail.com', telepon: '081234567890', kota: 'Yogyakarta' },
  { id: 2, nama: 'Siti Aminah', email: 'siti@mail.com', telepon: '082233445566', kota: 'Sleman' },
  { id: 3, nama: 'Rahmat Hidayat', email: 'rahmat@mail.com', telepon: '085566778899', kota: 'Bantul' },
]

// Data awal pesanan
export const statusPesananList = ['Diproses', 'Dikirim', 'Selesai', 'Dibatalkan']
export const initialOrders = [
  { id: 1, pelanggan: 'Budi Santoso', produk: 'Headphone Bluetooth', jumlah: 1, total: 315000, status: 'Selesai' },
  { id: 2, pelanggan: 'Siti Aminah', produk: 'Kopi Arabika 250g', jumlah: 2, total: 123500, status: 'Dikirim' },
  { id: 3, pelanggan: 'Rahmat Hidayat', produk: 'Matras Yoga', jumlah: 1, total: 120000, status: 'Diproses' },
]

// Pengaturan awal
export const initialSettings = { namaToko: 'TokoKu', admin: 'Admin' }
