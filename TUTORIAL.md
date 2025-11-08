# Tutorial Hosting ke Hostinger

Panduan lengkap untuk hosting aplikasi ini ke Hostinger pribadi Anda.

## Prasyarat

- Akun Hostinger aktif dengan hosting web
- Domain atau subdomain yang sudah dikonfigurasi
- Akses ke cPanel atau File Manager Hostinger
- Node.js terinstall di komputer lokal (untuk build)

## Langkah 1: Build Aplikasi

### 1.1 Persiapan Environment Variables

Sebelum build, pastikan file `.env` Anda sudah berisi konfigurasi Supabase yang benar:

```env
VITE_SUPABASE_URL=https://zliezekaecqcmhickjbx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_PROJECT_ID=zliezekaecqcmhickjbx
```

### 1.2 Build Project

Jalankan perintah berikut di terminal/command prompt:

```bash
# Install dependencies (jika belum)
npm install

# Build untuk production
npm run build
```

Proses ini akan membuat folder `dist` yang berisi file-file siap deploy.

## Langkah 2: Upload ke Hostinger

### Metode A: Via File Manager (Recommended untuk Pemula)

1. **Login ke Hostinger**
   - Buka https://hpanel.hostinger.com
   - Login dengan akun Anda

2. **Buka File Manager**
   - Pilih hosting Anda
   - Klik "File Manager" di menu

3. **Navigasi ke Folder Public**
   - Cari folder `public_html` (untuk domain utama)
   - Atau `public_html/subdomain-name` (untuk subdomain)

4. **Upload File**
   - Hapus semua file default (index.html, dll) jika ada
   - Upload semua isi dari folder `dist` yang telah dibuild
   - **PENTING**: Upload ISI folder dist, bukan folder dist itu sendiri
   - File struktur akhir harus seperti:
     ```
     public_html/
     ├── index.html
     ├── assets/
     ├── vite.svg
     └── robots.txt
     ```

5. **Ekstrak File (jika dizip)**
   - Jika Anda upload dalam bentuk zip
   - Klik kanan > Extract
   - Hapus file zip setelah ekstrak

### Metode B: Via FTP (Recommended untuk Advanced User)

1. **Setup FTP Client (FileZilla)**
   - Download FileZilla dari https://filezilla-project.org
   - Buka Hostinger hPanel > FTP Accounts
   - Catat informasi: Host, Username, Password, Port

2. **Connect via FTP**
   - Buka FileZilla
   - Masukkan Host, Username, Password
   - Port: 21 (atau 22 untuk SFTP)
   - Klik "Quickconnect"

3. **Upload Files**
   - Di panel kiri (lokal), navigasi ke folder `dist`
   - Di panel kanan (server), navigasi ke `public_html`
   - Drag & drop semua isi folder `dist` ke `public_html`

## Langkah 3: Konfigurasi .htaccess untuk React Router

Karena aplikasi menggunakan React Router, kita perlu menambahkan file `.htaccess` agar routing bekerja dengan benar.

### 3.1 Buat File .htaccess

Buat file baru bernama `.htaccess` di folder `public_html` dengan isi:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Cache control untuk assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>
```

### 3.2 Upload .htaccess

- Upload file `.htaccess` ke folder `public_html`
- Pastikan file visible (biasanya hidden files perlu diaktifkan di File Manager)

## Langkah 4: Verifikasi dan Testing

### 4.1 Cek Website

1. Buka browser
2. Kunjungi domain Anda (misalnya: https://namadomain.com)
3. Website seharusnya muncul dengan sempurna

### 4.2 Test Routing

Coba kunjungi halaman-halaman:
- `/` - Homepage
- `/about` - Halaman About
- `/services` - Halaman Layanan
- `/projects` - Halaman Portfolio
- `/contact` - Halaman Kontak
- `/admin/login` - Login Admin

Semua halaman harus bisa diakses tanpa error 404.

### 4.3 Test Fungsionalitas

- **Admin**: Login sebagai admin dan test CRUD proyek
- **Upload Gambar**: Test upload gambar proyek
- **Database**: Cek apakah data tersimpan ke Supabase
- **Forms**: Test semua form (contact, login, dll)

## Langkah 5: Setup SSL (HTTPS)

### 5.1 Aktifkan SSL di Hostinger

1. Login ke Hostinger hPanel
2. Pilih domain Anda
3. Cari menu "SSL"
4. Klik "Install SSL" atau "Activate"
5. Pilih "Free SSL" (Let's Encrypt)
6. Tunggu beberapa menit hingga aktif

### 5.2 Force HTTPS

Tambahkan di bagian atas file `.htaccess`:

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## Troubleshooting

### Problem: Website Tidak Muncul / Error 500

**Solusi:**
- Cek apakah semua file sudah terupload dengan benar
- Pastikan `index.html` ada di root `public_html`
- Cek error log di cPanel > Error Log
- Pastikan `.htaccess` syntax benar

### Problem: Halaman Selain Home Error 404

**Solusi:**
- Pastikan file `.htaccess` sudah dibuat dengan benar
- Cek apakah mod_rewrite aktif di server
- Restart Apache (hubungi support jika perlu)

### Problem: Gambar Tidak Muncul

**Solusi:**
- Cek path gambar di code
- Pastikan folder `assets` terupload lengkap
- Cek permission folder (755 untuk folder, 644 untuk file)

### Problem: Environment Variables Tidak Terbaca

**Solusi:**
- Pastikan build dilakukan setelah `.env` diisi dengan benar
- Environment variables di Vite harus prefix `VITE_`
- Rebuild aplikasi: `npm run build`
- Upload ulang hasil build

### Problem: Supabase Connection Error

**Solusi:**
- Cek koneksi internet dari server
- Pastikan SUPABASE_URL dan SUPABASE_KEY benar
- Cek di Supabase dashboard apakah project masih aktif
- Whitelist IP server Hostinger di Supabase (jika ada setting firewall)

### Problem: Admin Tidak Bisa Login

**Solusi:**
- Pastikan sudah ada user di Supabase Auth
- Cek apakah user sudah punya role 'admin' di tabel `user_roles`
- Test koneksi ke Supabase database
- Cek console browser untuk error message

## Maintenance & Update

### Update Website

Ketika ada perubahan code:

1. **Edit code di lokal**
2. **Build ulang**: `npm run build`
3. **Backup file lama** di server (optional)
4. **Upload file baru** dari folder `dist`
5. **Clear cache browser** untuk lihat perubahan

### Backup Rutin

1. **Backup File**
   - Download semua file dari `public_html` via File Manager atau FTP
   - Simpan di komputer lokal

2. **Backup Database**
   - Supabase otomatis backup
   - Export data penting via Supabase dashboard
   - Simpan SQL dump jika diperlukan

## Tips Optimasi

### 1. Minify Assets
- Pastikan proses build sudah optimize (Vite sudah otomatis)
- Compress gambar sebelum upload
- Gunakan format WebP untuk gambar

### 2. CDN (Optional)
- Gunakan Cloudflare untuk CDN gratis
- Setup di Hostinger > Cloudflare Integration
- Improve loading speed global

### 3. Caching
- Gunakan browser caching via `.htaccess` (sudah ada di tutorial)
- Set expire headers untuk static assets

### 4. Monitoring
- Gunakan Google Analytics untuk track visitor
- Setup Uptime monitoring (UptimeRobot gratis)
- Monitor error via Supabase logs

## Domain Custom

Jika menggunakan domain dari provider lain:

1. **Update Nameservers**
   - Login ke domain registrar Anda
   - Ubah nameservers ke Hostinger:
     ```
     ns1.dns-parking.com
     ns2.dns-parking.com
     ```

2. **Tunggu Propagasi**
   - DNS propagation bisa 24-48 jam
   - Cek status di https://dnschecker.org

3. **Add Domain di Hostinger**
   - Hostinger hPanel > Domains
   - Add Domain / Point Domain

## Support

Jika mengalami masalah:

1. **Hostinger Support**
   - Live Chat 24/7 di hPanel
   - Email: support@hostinger.com
   - Knowledge Base: https://support.hostinger.com

2. **Supabase Support**
   - Documentation: https://supabase.com/docs
   - Discord: https://discord.supabase.com
   - GitHub Issues untuk bug report

## Checklist Sebelum Go Live

- [ ] Build aplikasi berhasil tanpa error
- [ ] Semua environment variables sudah benar
- [ ] Upload semua file ke public_html
- [ ] File .htaccess sudah dikonfigurasi
- [ ] SSL/HTTPS sudah aktif
- [ ] Test semua halaman berfungsi
- [ ] Test admin panel berfungsi
- [ ] Test upload gambar berfungsi
- [ ] Form contact/submission berfungsi
- [ ] Test di berbagai browser (Chrome, Firefox, Safari)
- [ ] Test di mobile devices
- [ ] Backup file dan database
- [ ] Setup monitoring/analytics

---

**Selamat! Website Anda sekarang sudah live di Hostinger! 🎉**

Jika ada pertanyaan atau masalah, jangan ragu untuk mencari bantuan di support Hostinger atau komunitas developer.
