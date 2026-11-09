// Fungsi bantu dipisah dari App.jsx agar tidak terjadi import melingkar

// Menentukan status stok (if/else)
export function getStatusStok(stok) {
  if (stok === 0) return 'Habis'
  else if (stok <= 10) return 'Menipis'
  else return 'Aman'
}

// Format angka menjadi rupiah
export const rupiah = (n) => 'Rp ' + Number(n).toLocaleString('id-ID')
