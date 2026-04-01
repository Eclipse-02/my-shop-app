# My Shop App

## Informasi Mahasiswa

- Nama : Rafa Umar Abdus Syakur
- NIM : 2410501045

## Deskripsi Aplikasi

My Shop App adalah aplikasi mobile sederhana yang dikembangkan menggunakan React Native. Aplikasi ini dapat meelakukan:
- Menampilkan daftar produk,
- Menambahkan produk ke keranjang,
- Mengatur jumlah item, dan
- Melihat keranjang.

State keranjang dikelola menggunakan **Redux Toolkit** agar perubahan stok item dan total produk selalu konsisten di seluruh layar.

## Fitur yang Diimplementasikan

- Menampilkan daftar produk menggunakan `FlatList`.
- Tambah produk ke Cart dari CartProduct.
- Halaman Cart yang menampilkan:
  - Daftar item keranjang (nama/qty/harga).
  - Tombol increment dan decrement jumlah item.
  - Aksi Remove dari keranjang.
  - Aksi Kosongkan Keranjang (clear cart).
  - Perhitungan total belanja
- Navigasi Bottom Tab (Products & Cart) dengan badge jumlah item di tab Cart.

## Screenshot

### Product
<p align="center">
  <img width="250" alt="product" src="https://github.com/user-attachments/assets/45c63433-cb79-4637-8052-8b379003999d" />
</p>

### Cart
<p align="center">
  <img width="250" alt="cart" src="https://github.com/user-attachments/assets/07e2a6a4-0cfb-45d3-a51a-0ce1478ab4c5" />
</p>

## Cara Menjalankan

```bash
npm install && npx expo start
```
