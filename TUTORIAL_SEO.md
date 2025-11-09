# Panduan Lengkap SEO untuk nusukimegautama.my.id

## 📋 Daftar Isi
1. [Google Search Console](#google-search-console)
2. [Google Business Profile](#google-business-profile)
3. [Google Analytics 4](#google-analytics-4)
4. [Bing Webmaster Tools](#bing-webmaster-tools)
5. [Maintenance Bulanan](#maintenance-bulanan)
6. [Tips Optimasi Konten](#tips-optimasi-konten)
7. [Link Building Strategy](#link-building-strategy)

---

## 🔍 Google Search Console

### Setup Awal

1. **Buka Google Search Console**
   - Kunjungi: https://search.google.com/search-console
   - Login dengan akun Google Anda

2. **Tambah Property**
   - Klik "Add Property"
   - Pilih "Domain" (recommended) atau "URL prefix"
   - Masukkan: `nusukimegautama.my.id`

3. **Verifikasi Domain**
   
   **Opsi A: DNS Verification (Recommended)**
   - Copy TXT record yang diberikan Google
   - Login ke dashboard domain Anda
   - Tambahkan TXT record ke DNS settings
   - Tunggu propagasi (bisa 10-60 menit)
   - Klik "Verify" di Google Search Console

   **Opsi B: HTML File Upload**
   - Download file HTML verifikasi
   - Upload ke folder `public/` di project Lovable
   - Deploy website
   - Klik "Verify"

4. **Submit Sitemap**
   - Setelah terverifikasi, buka "Sitemaps" di menu kiri
   - Masukkan: `https://nusukimegautama.my.id/sitemap.xml`
   - Klik "Submit"

### Monitoring Rutin

**Yang Harus Dicek Setiap Minggu:**
- **Performance Report**: Lihat keyword mana yang membawa traffic
- **Coverage Issues**: Perbaiki error pages yang tidak terindex
- **Mobile Usability**: Pastikan tidak ada error mobile
- **Core Web Vitals**: Monitor performa loading website

**Cara Melihat Keyword Rankings:**
1. Buka "Performance" → "Search Results"
2. Toggle "Average position"
3. Filter berdasarkan "Queries" untuk lihat keyword specific
4. Export data untuk tracking

---

## 🏢 Google Business Profile

### Setup Profile

1. **Buat Profile**
   - Kunjungi: https://business.google.com
   - Klik "Manage now"
   - Masukkan nama bisnis: "PT. Nusuki Mega Utama"

2. **Pilih Kategori Bisnis**
   - Primary: "Waterproofing Service"
   - Secondary: "Construction Company", "Building Restoration Service"

3. **Tambah Lokasi**
   - **Kantor Jakarta:**
     - Address: Jl. Raya Pos Pengumben No.1, Jakarta
     - Phone: 081212084150
     - Set area layanan: Jakarta, Tangerang, Bogor, Bekasi, Depok
   
   - **Kantor Tangerang:**
     - Address: Tangerang
     - Phone: 0812-8510-6668

4. **Verifikasi Lokasi**
   - Google akan kirim postcard ke alamat (2-14 hari)
   - Masukkan kode verifikasi dari postcard
   - Atau gunakan verifikasi phone/email jika tersedia

### Optimasi Profile

**1. Lengkapi Semua Informasi:**
- Tambah website URL: `https://nusukimegautama.my.id`
- Set jam operasional (contoh: Senin-Jumat 08:00-17:00)
- Tambah deskripsi bisnis (750 karakter)
- Link WhatsApp: `https://wa.me/6281212084150`

**2. Upload Foto Berkualitas:**
- Logo (minimum 720x720px)
- Cover photo (1024x576px)
- Foto kantor (exterior & interior)
- Foto tim sedang bekerja
- Foto hasil project (min. 20 foto)
- Video pendek project (optional)

**3. Kelola Reviews:**
- Minta klien untuk beri review setelah project selesai
- **Cara minta review:**
  ```
  Template pesan untuk klien:
  "Terima kasih telah mempercayakan project Anda kepada PT. Nusuki Mega Utama. 
  Kami sangat menghargai jika Anda dapat memberikan review di Google Business Profile kami: 
  [Link Google Review]
  
  Review Anda sangat membantu kami untuk berkembang dan melayani klien lainnya."
  ```
- **Response ke review:**
  - Positif: "Terima kasih atas kepercayaan Anda! Kami senang dapat membantu project [nama project]."
  - Negatif: "Terima kasih atas feedback Anda. Kami akan segera menghubungi untuk solusi terbaik."

**4. Post Updates Rutin:**
- Post minimal 1x per minggu
- **Konten ideas:**
  - Before/After foto project
  - Tips waterproofing
  - Penawaran khusus
  - Testimoni klien
  - Proses kerja tim

---

## 📊 Google Analytics 4

### Setup GA4

1. **Buat Account**
   - Kunjungi: https://analytics.google.com
   - Klik "Start measuring"
   - Account name: "Nusuki Mega Utama"

2. **Buat Property**
   - Property name: "nusukimegautama.my.id"
   - Timezone: Indonesia (GMT+7)
   - Currency: Indonesian Rupiah (IDR)

3. **Setup Data Stream**
   - Platform: Web
   - URL: `https://nusukimegautama.my.id`
   - Stream name: "Main Website"

4. **Install Tracking Code**
   - Copy "Measurement ID" (format: G-XXXXXXXXXX)
   - Simpan ID ini, nanti akan ditambahkan ke website

   **Instalasi di Lovable:**
   Tambahkan script ini di `index.html` sebelum `</head>`:
   
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### Setup Event Tracking (Advanced)

**Track WhatsApp Clicks:**
```typescript
// Tambahkan ke link WhatsApp:
onClick={() => {
  // @ts-ignore
  if (window.gtag) {
    // @ts-ignore
    window.gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: 'contact_button'
    });
  }
}}
```

**Track Form Submissions:**
```typescript
// Jika ada contact form di masa depan
const handleFormSubmit = () => {
  // @ts-ignore
  if (window.gtag) {
    // @ts-ignore
    window.gtag('event', 'form_submit', {
      event_category: 'conversion',
      event_label: 'contact_form'
    });
  }
};
```

### Monitoring Dashboard

**Metrics Penting:**
1. **Users & Sessions**: Berapa banyak visitor
2. **Bounce Rate**: Persentase visitor yang langsung pergi
3. **Average Session Duration**: Berapa lama visitor di website
4. **Top Pages**: Halaman paling populer
5. **Traffic Sources**: Dari mana visitor datang (Google, sosmed, direct)
6. **Conversions**: WhatsApp clicks, form submissions

---

## 🔎 Bing Webmaster Tools

### Setup

1. **Buka Bing Webmaster**
   - Kunjungi: https://www.bing.com/webmasters
   - Sign in dengan Microsoft account

2. **Import dari Google**
   - Pilih "Import from Google Search Console"
   - Authorize Bing untuk akses GSC
   - Otomatis import semua data

   **Atau Manual:**
   - Klik "Add Site"
   - Masukkan: `https://nusukimegautama.my.id`

3. **Verifikasi**
   - Upload HTML file (sama seperti Google)
   - Atau gunakan DNS verification

4. **Submit Sitemap**
   - Submit: `https://nusukimegautama.my.id/sitemap.xml`

---

## 🔧 Maintenance Bulanan

### Checklist Bulanan SEO

**Week 1: Content Audit**
- [ ] Check Google Search Console untuk errors
- [ ] Fix crawl errors atau 404 pages
- [ ] Update sitemap jika ada halaman baru
- [ ] Check broken links

**Week 2: Content Update**
- [ ] Tambah 1-2 project baru ke portfolio
- [ ] Update deskripsi services jika perlu
- [ ] Tambah foto project berkualitas tinggi
- [ ] Pastikan semua gambar punya alt text

**Week 3: Performance Check**
- [ ] Test website speed di PageSpeed Insights
- [ ] Check Core Web Vitals
- [ ] Optimize images jika ada yang lambat
- [ ] Test mobile responsiveness

**Week 4: Off-Page SEO**
- [ ] Request reviews dari klien terbaru
- [ ] Response ke semua reviews (positif & negatif)
- [ ] Post 4 updates di Google Business Profile
- [ ] Check backlinks baru di Google Search Console

### Tracking Progress

**Buat Spreadsheet Tracking:**

| Metric | Target | Bulan 1 | Bulan 2 | Bulan 3 |
|--------|--------|---------|---------|---------|
| Organic Traffic | 100/bulan | | | |
| Keyword Rankings (Top 10) | 10 keywords | | | |
| Google Business Views | 500/bulan | | | |
| WhatsApp Clicks | 20/bulan | | | |
| New Reviews | 2/bulan | | | |

---

## ✍️ Tips Optimasi Konten

### Keyword Research

**Tools Gratis:**
1. **Google Keyword Planner** (butuh akun Google Ads)
2. **Google Trends** - lihat trend pencarian
3. **Ubersuggest** - free tier 3 searches per day
4. **Answer The Public** - lihat pertanyaan yang sering ditanya

**Keyword Ideas untuk Nusuki:**
- Long-tail keywords: "jasa waterproofing basement jakarta", "harga injection kebocoran atap"
- Location-based: "kontraktor waterproofing tangerang selatan"
- Problem-based: "cara mengatasi bocor basement", "solusi atap bocor"

### Content Writing Best Practices

**1. Title Tags (H1):**
- Include primary keyword di awal
- Max 60 karakter
- Menarik dan actionable

**Contoh bagus:**
- ❌ "Layanan Kami"
- ✅ "Jasa Waterproofing Jakarta | Injection Kebocoran Profesional"

**2. Meta Descriptions:**
- 150-160 karakter
- Include keyword dan call-to-action
- Unique untuk setiap halaman

**Contoh:**
```
"Spesialis waterproofing Jakarta & Tangerang dengan teknologi terkini. 
Free konsultasi! Hubungi 0812-1208-4150 untuk solusi injection kebocoran Anda."
```

**3. Content Structure:**
```
H1: Main keyword (1x per page)
  H2: Supporting topics (3-5x per page)
    H3: Detailed points
    H4: Sub-details (jika perlu)
```

**4. Image Alt Text Formula:**
```
[Keyword] - [Location] - [Description]

Contoh:
"Waterproofing Basement - Jakarta Selatan - Hasil Injection PT Nusuki Mega Utama"
"Epoxy Lantai Industrial - Tangerang - Aplikasi Coating Anti Slip"
```

---

## 🔗 Link Building Strategy

### 1. Directory Submissions (Free)

**Direktori Bisnis Indonesia:**
- [ ] Google Business Profile (PRIORITAS!)
- [ ] Bing Places
- [ ] Yellow Pages Indonesia
- [ ] IndonesiaYP.com
- [ ] Indotrading.com (B2B marketplace)
- [ ] Indonetwork.co.id

### 2. Industry-Specific Listings

**Konstruksi & Building:**
- [ ] Arsitek.com
- [ ] Konstruksi.com forums
- [ ] PropertiIndonesia.com
- [ ] RumahKonstruksi.com

### 3. Local Citations

**Pastikan NAP Consistency:**
- Name: PT. Nusuki Mega Utama
- Address: Jl. Raya Pos Pengumben No.1, Jakarta
- Phone: 081212084150

Submit info bisnis yang SAMA PERSIS ke semua platform.

### 4. Content Marketing

**Blog Post Ideas (untuk future development):**
- "10 Tanda Basement Anda Butuh Waterproofing"
- "Perbedaan Injection Kebocoran vs Waterproofing Tradisional"
- "Cara Memilih Kontraktor Waterproofing yang Tepat"
- "Before & After: Transformasi Basement Bocor"

### 5. Partnership Backlinks

**Cara Dapat Backlinks:**
1. **Supplier Material:**
   - Minta untuk di-list sebagai "Trusted Partner" di website mereka
   
2. **Klien Korporat:**
   - Request untuk di-mention di halaman "Our Partners" mereka
   
3. **Asosiasi Industri:**
   - Join asosiasi konstruksi Indonesia
   - Dapatkan member listing di website asosiasi

4. **Guest Posting:**
   - Tulis artikel untuk blog konstruksi
   - Include backlink ke website Anda

### 6. Social Signals

**Setup Social Media:**
- [ ] Facebook Business Page
- [ ] Instagram Business
- [ ] LinkedIn Company Page
- [ ] YouTube Channel (untuk video project)

**Link semua profile ke website:**
- Bio: "Spesialis Waterproofing Jakarta | nusukimegautama.my.id"
- Post regular updates dengan link ke project portfolio

---

## 📈 Expected Timeline & Results

### Bulan 1-2: Setup & Foundation
- Website muncul di Google (indexed)
- Google Business Profile terverifikasi
- Base traffic: 50-100 visitors/bulan

### Bulan 3-4: Growth Phase
- Mulai ranking untuk long-tail keywords
- Google Business views meningkat
- Traffic: 100-300 visitors/bulan

### Bulan 5-6: Momentum
- Ranking untuk competitive keywords
- Regular review incoming
- Traffic: 300-500 visitors/bulan
- Lead inquiries via WhatsApp meningkat

### Bulan 7-12: Established
- Top 3-5 untuk target keywords
- Strong local presence
- Traffic: 500-1000+ visitors/bulan
- Consistent monthly leads

---

## 🎯 Quick Wins Checklist

**Lakukan ini SEGERA (hari ini!):**
- [ ] Submit sitemap ke Google Search Console
- [ ] Setup Google Business Profile
- [ ] Upload min. 10 foto project
- [ ] Minta 2-3 klien terbaik untuk beri review
- [ ] Pastikan info kontak konsisten di semua channel

**Minggu ini:**
- [ ] Setup Google Analytics
- [ ] Submit ke Bing Webmaster
- [ ] Post 1 update di Google Business
- [ ] Tambah alt text ke semua gambar project

**Bulan ini:**
- [ ] Dapatkan 5 Google reviews
- [ ] Submit ke 10 directory listings
- [ ] Create consistent posting schedule
- [ ] Monitor rankings mulai naik

---

## 📞 Need Help?

Jika menemui kesulitan di tahap manapun:
1. Screenshot error message
2. Check Google Search Console Help Center
3. Tanya di forum SEO Indonesia (groups.google.com/g/seo-indonesia)
4. Konsultasi dengan digital marketing specialist

---

**Last Updated:** 2025-01-09
**Version:** 1.0

---

*Panduan ini akan diupdate secara berkala sesuai perubahan algoritma Google dan best practices terbaru.*
