# Trace undangan - 8 Oktober 2026

## Hasil lokal

Server berjalan di http://localhost:3000. URL `/putra_&_maydi/bude%20sri` menghasilkan HTTP 200, cover tampil dengan nama **Bude Sri**, dan tombol **BUKA UNDANGAN** membuka isi undangan. Spasi pada nama tersebut bekerja pada kondisi kode lokal saat pemeriksaan.

## Penyebab yang didukung kode

Pada HEAD (`5a8036b`), `src/components/WeddingInvitationPutra/index.jsx` menunggu `getImageUrl('/img_putra/putra_1.webp')`. Progres naik menggunakan interval terpisah sampai 100%. Jika permintaan gagal, catch hanya mencetak error, tanpa mematikan loading. Jika permintaan menggantung, loading juga tetap aktif. Keduanya sesuai gejala layar hitam 100% pada screenshot, tetapi kegagalan jaringan produksi belum diverifikasi.

Sudah ada perubahan staged sebelum pemeriksaan: cover menggunakan `/img/bang_putra/putra_1.webp`, fallback mematikan loading, dan jeda dikurangi menjadi 2 detik. File gambar lokal tersedia. Perubahan ini berhasil pada pengujian lokal; belum dipastikan sudah berada pada deployment Vercel.

## Temuan URL terpisah

`src/pages/invitation_list_putra/index.js` membuat link view dengan interpolasi langsung `guest.name.toLowerCase()`, sedangkan link ekspor memakai `encodeURIComponent`. Nama dengan `#`, `?`, atau `/` berpotensi membentuk fragment, query, atau segmen baru. Ini temuan kode terpisah, bukan penyebab terkonfirmasi untuk **Bude Sri**.

Lookup di `lib/api/guest.js` membandingkan nama setelah trim dan lowercase. Nama tidak ditemukan menampilkan pesan tidak masuk daftar tamu, bukan loader 100%. Parameter Next.js sudah didekode, sehingga spasi URL `%20` tidak memerlukan decode tambahan.

Rute lain: `/invitation/[name]` memakai `guest_list`; `/invitation2/[name]` memakai `guest_list_2`; `/putra_&_maydi/[name]` memakai `guest_list_putra`. Halaman pengelola yang relevan adalah `/invitation_list_putra`.

## Verifikasi produksi dan perbaikan lanjutan

Setelah pengguna mengizinkan pengecekan produksi, halaman online berhasil mereproduksi loader 100%. Console browser mencatat `FirebaseError: Firebase Storage: Quota for bucket exceeded (storage/quota-exceeded)`. Nama Bude Sri tampil pada form RSVP di DOM, sehingga guest lookup berhasil. Penyebab terkonfirmasi adalah quota Storage dan error handler loader yang tidak merilis loading.

Perbaikan memakai cover lokal melalui Next Image dan menghapus state loading, progres buatan, serta timer yang sebelumnya menghalangi cover. Link view pada tiga halaman daftar undangan sekarang memakai `encodeURIComponent` untuk nama tamu, selaras dengan link ekspor. Perubahan gambar lokal yang sebelumnya sudah staged pada PhotoContainer dan CSS juga termasuk perbaikan akses gambar undangan; file asetnya sudah dilacak Git.

Tidak mengirim RSVP atau menulis data Firestore. Perubahan progress report dan dependency lucide-react yang sudah ada dipertahankan terpisah dari commit perbaikan undangan. Situs produksi tetap menjalankan versi lama sampai branch ini di-merge dan deployment selesai.

## Validasi akhir

`npm run build` berhasil menghasilkan 509 halaman. Ada satu warning dependency useEffect yang sudah ada di RsvpList2. Pemeriksaan HTML produksi untuk Bude Sri memastikan nama tamu, cover lokal, dan tombol buka tersedia tanpa progressbar. Encoding nama diuji untuk spasi, #, ?, /, dan %. Interaksi tombol di browser lokal berhasil pada pemeriksaan awal; pengujian browser ulang setelah build terhalang kebijakan tool browser.
