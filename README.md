# Edurise - Tingkatkan kemampuanmu, raih masa depan lebih baik

## Installation

**1. Clone projek EduRise**  
https://github.com/nabilaah24/edurise.git


**2. Tambahkan .env**

```bash
NEXTAUTH_URL=
NEXTAUTH_SECRET=
BASE_URL=
```

**3. Install EduRise dengan menggunakan pnpm**

```bash
  pnpm install
```

**4. Jalankan website pada mode development**

```bash
  pnpm dev
```

**5. Jalankan website pada mode production**

```bash
  pnpm build
  pnpm start
```

Catatan:

- Dengan mode production salah 1 fitur tidak dapat berjalan yaitu bagian "Pengaturan pemberitahuan" di halaman profil saya karena menggunakan metode rewrite JSON data

**6. Akses website**  
Jalankan pada browser

```bash
  http://localhost:3000
```

## Struktur Folder

├── public/  
├── src/  
│ ├── app/  
│ │ ├── (protected)/  
│ │ │ ├── dashboard/  
│ │ │ ├── kursus/  
│ │ │ └── profil/  
│ │ │  
│ │ ├── api/  
│ │ ├── login/  
│ │ └── provider/  
│ │  
│ ├── components/  
│ │ ├── course/  
│ │ ├── layout/  
│ │ └── ui/  
│ │  
│ ├── data/  
│ ├── feat/  
│ └── lib/  
│  
├── package.json  
├── tsconfig.json  
├── next.config.js  
├── ...  
└── README.md

**Penjelasan Struktur**

- src  
  Folder ini bertujuan untuk memisahkan source code aplikasi dari file konfigurasi dan file root project lainnya

- src/app/protected  
  Folder ini digunakan untuk halaman yang membutuhkan autentikasi user.
  Pemisahan ini dilakukan untuk mengelompokkan route mana saja yang bersifat protected agar lebih mudah dikelola

- src/app/provider  
  Folder ini berisi provider yang akan digunakan untuk menyimpan seluruh global provider, seperti AuthProvider

- src/components  
  Folder ini berisi kumpulan komponen yang akan digunakan di tiap halaman. Course untuk komponen fitur kursus yang dipakai di dashboard dan halaman kursus. Layout untuk komponen seperti navbar, page container, dan footer halaman. Sedangkan ui untuk komponen komponen general seperti button, input, dll

- src/data  
  Folder ini digunakan untuk menyimpan static data atau mock data berbentuk JSON yang digunakan pada aplikasi

- src/feat  
  Folder ini digunakan untuk menyimpan file file terkait fitur seperti dto, helper, api, schema form

- src/lib  
  Folder ini digunakan untuk menyimpan library yang dapat digunakan secara general, tidak terikat pada fitur tertentu.

## Data Fetching

Project ini menggunakan Axios untuk melakukan data fetching dan komunikasi dengan API

### Alasan Pemilihan Axios

Axios dipilih karena konfigurasi API lebih fleksibel, dan memiliki error handling yang lebih konsisten,

## Strategi Keamanan

# Strategi Keamanan Simulasi

Project ini menggunakan NextAuth.js sebagai sistem autentikasi utama untuk mengelola session user secara aman di sisi client dan server.

## 1. Session-Based Authentication (NextAuth)

Autentikasi tidak menggunakan token manual di localStorage, melainkan menggunakan session berbasis cookie yang dikelola oleh NextAuth.

## 2. Token Expiration

Aplikasi menerapkan fitur “Remember Me” untuk mengatur durasi session:

- Jika **Remember Me aktif** session berlaku lebih lama (pada projek ini: 24 jam)
- Jika **tidak aktif** session lebih pendek (pada projek ini: 12 jam)

---

## 3. Menggunakan NextJS Proxy

Untuk redirect user ke halaman login jika tidak ada token atau expired dan redirect ke halaman dashboard jika sudah memiliki token

---
