# typeframes — Spec

**Status:** draft v1 · **Tanggal:** 16 November 2026 · **Pemilik:** personal portfolio project

Aplikasi web berisi kumpulan animasi text yang bisa dijelajahi, dimainkan ulang, dikustomisasi, dan di-copy kodenya. Ditujukan sebagai portfolio pribadi sekaligus alat kerja: orang lain datang untuk cari inspirasi animasi dan langsung mengambil kodenya.

---

## 1. Ringkasan Produk

Satu halaman dengan hero singkat, grid katalog 9 animasi text, dan modal per animasi. Modal berfungsi sebagai **playground + code panel**: user bisa ganti text, atur parameter (speed, delay, easing, font, warna, parameter khusus efek), replay, lalu memilih format kode dan menyalinnya. Semua state playground tersimpan di `localStorage` per efek.

**Bukan** generator video/GIF, bukan aplikasi multi-user, bukan CMS.

---

## 2. Keputusan yang Sudah Dikunci

| Area | Keputusan |
|---|---|
| Bentuk app | Galeri showcase + playground dalam modal |
| Target user | Pemilik app (portfolio) + developer/designer lain yang ambil kode |
| Bahasa UI | English (seluruh label, microcopy, About) |
| Stack | Vite + React + TypeScript + Tailwind CSS v4 |
| Routing | Tanpa React Router; single page, detail lewat modal |
| Engine animasi | Hybrid: CSS-first, GSAP hanya untuk efek yang butuh timeline/split kompleks |
| Visual | Editorial monochrome, **dark only**, all-sans typography |
| Jumlah efek | 9 efek untuk v1 (6 kategori) |
| Filter/search katalog | Tidak ada — semua kartu tampil di satu grid |
| Persistence | `localStorage` untuk preset playground; tanpa favorites; tanpa share URL |
| Preview mobile | Tap to play/replay (tanpa hover) |
| Reduced motion | Dihormati, dengan override manual "Play anyway" |
| Export | HTML+CSS(+JS), React/JSX, Framer Motion (sebagian efek) |
| Code panel | Dropdown format + satu blok kode + satu tombol copy |
| Hosting | GitHub Pages (static), GitHub Actions |

---

## 3. Tech Stack & Arsitektur

### 3.1 Dependencies
- `vite`, `react`, `react-dom`, `typescript`
- `tailwindcss` v4 + `@tailwindcss/vite` (konfigurasi lewat CSS `@theme`, bukan `tailwind.config.js`)
- `gsap` (3.13+, `SplitText` sudah gratis) — hanya diimpor oleh efek yang memakainya
- Tanpa library animasi lain. `framer-motion` **tidak** di-install; snippet Framer Motion disimpan sebagai template string (lihat §7.3).

### 3.2 Struktur folder

```
/
├─ index.html
├─ vite.config.ts            # base: './' supaya aman di GitHub Pages project path
├─ tsconfig.json
├─ .github/workflows/deploy.yml
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx                # Hero + CatalogGrid + About + Footer + Modal
│  ├─ index.css              # @import "tailwindcss"; @theme tokens
│  ├─ lib/
│  │  ├─ gsap.ts             # registerPlugin(SplitText), export gsap & SplitText
│  │  ├─ useReducedMotion.ts # hook + override state
│  │  ├─ usePlayback.ts      # play/replay key, loop, visibility pause
│  │  ├─ splitText.ts        # grapheme-safe splitter + RTL detection
│  │  └─ presets.ts          # load/save localStorage per effect
│  ├─ components/
│  │  ├─ Hero.tsx
│  │  ├─ CatalogGrid.tsx
│  │  ├─ EffectCard.tsx
│  │  ├─ EffectModal.tsx
│  │  ├─ ControlPanel.tsx
│  │  ├─ CodePanel.tsx
│  │  ├─ About.tsx
│  │  └─ Footer.tsx
│  └─ effects/
│     ├─ types.ts
│     ├─ registry.ts
│     └─ <effect-id>/
│        ├─ meta.ts          # nama, kategori, sample params, schema parameter
│        ├─ Preview.tsx      # komponen live yang menerima params
│        ├─ snippets.ts      # template kode per format
│        └─ effect.css       # keyframes scoped (kalau efek CSS-based)
```

### 3.3 Model data

```ts
type Category = 'kinetic' | 'typewriter' | 'glitch' | 'neon3d' | 'karaoke' | 'marquee';

type ParamControl =
  | { kind: 'range'; key: string; label: string; min: number; max: number; step: number; unit?: string; default: number }
  | { kind: 'select'; key: string; label: string; options: { label: string; value: string }[]; default: string }
  | { kind: 'toggle'; key: string; label: string; default: boolean }
  | { kind: 'color'; key: string; label: string; default: string };

type EffectMeta = {
  id: string;                 // kebab-case, dipakai di URL hash & prefix class
  name: string;               // "Line Mask Rise"
  category: Category;
  blurb: string;              // satu baris deskripsi, English
  tags?: string[];            // mis. ['mask', 'stagger']
  sharedOverrides?: Partial<SharedParams>;  // default text/size khusus efek
  extraParams: ParamControl[];              // parameter khusus efek
  supportedFormats: ('html' | 'react' | 'framer')[];
};

type SharedParams = {
  text: string;
  duration: number;   // ms
  delay: number;      // ms, stagger/delay utama
  easing: EasingName;
  fontSize: number;   // px, 32–160
  fontWeight: 400 | 500 | 600 | 700 | 800;
  fontFamily: string; // Inter | Space Grotesk | Sora
  color: string;      // hex
  loop: boolean;
};
```

`registry.ts` mengekspor array terurut berdasarkan kategori. Kategori dipakai untuk label kartu & pengelompokan grid, bukan filter.

### 3.4 Parameter bersama (semua efek)
Text, duration, delay/stagger, easing (preset: linear, ease-out, ease-in-out, spring-ish cubic-bezier, steps), font size, font weight, font family, warna text, loop on/off.

Ditambah parameter khusus per efek (lihat §4). Setiap effect mendeklarasikan `extraParams` sendiri; `ControlPanel` merender kontrol dari schema, jadi tidak ada form hardcoded per efek.

---

## 4. Daftar Efek (23 efek: 9 v1 + 14 v2)

| # | ID | Nama | Kategori | Engine | Parameter khusus |
|---|---|---|---|---|---|
| 1 | `line-mask-rise` | Line Mask Rise | Kinetic | CSS + JS (line split) | `distance` (px), `stagger` (ms), `easing` |
| 2 | `char-stagger` | Character Cascade | Kinetic | CSS + JS (grapheme split) | `blur` (px), `distance` (px), `rotate` (deg) |
| 3 | `type-delete-loop` | Type & Delete | Typewriter | CSS/JS (no deps) | `typeSpeed` (ms/char), `deleteSpeed`, `hold` (ms), `cursor` (bar/block), `loop` |
| 4 | `scramble-decode` | Scramble Decode | Glitch | JS (char randomization) | `scrambleSpeed` (ms), `iterations`, `charset` (ascii/binary/symbols) |
| 5 | `rgb-split` | Chromatic Split | Glitch | CSS keyframes | `offset` (px), `jitter` (px), `frequency` (1–5) |
| 6 | `neon-flicker` | Neon Flicker | Neon / 3D | CSS keyframes | `glow` (px), `glowColor` (hex), `flicker` (subtle/wild), `intensity` |
| 7 | `flip-3d` | Flip In 3D | Neon / 3D | GSAP | `axis` (x/y), `perspective` (px), `stagger` (ms) |
| 8 | `karaoke-sweep` | Karaoke Sweep | Karaoke | GSAP timeline | `highlightStyle` (fill/underline/both), `highlightColor`, `wordsPerSecond` |
| 9 | `infinite-marquee` | Infinite Marquee | Marquee | CSS | `speed` (px/s), `direction` (left/right), `gap` (px), `pauseOnHover` |

### 4.1 Tambahan v2 (14 efek)

| # | ID | Nama | Kategori | Engine | Parameter khusus |
|---|---|---|---|---|---|
| 10 | `word-mask-rise` | Word Mask Rise | Kinetic | CSS + JS (word split) | `distance` (%) |
| 11 | `letter-wave` | Letter Wave | Kinetic | CSS keyframes | `amplitude` (px) |
| 12 | `track-tighten` | Track & Tighten | Kinetic | CSS keyframes | `spread` (em), `blur` (px) |
| 13 | `terminal-boot` | Terminal Boot | Typewriter | JS (line typing) | `typeSpeed` (ms), `linePause` (ms), `prompt` (on/off), `cursor` (block/bar) |
| 14 | `caret-sweep` | Caret Sweep | Typewriter | CSS keyframes | `caretWidth` (px) |
| 15 | `slice-shift` | Slice Shift | Glitch | CSS keyframes | `slices`, `offset` (px) |
| 16 | `vhs-skew` | VHS Skew | Glitch | CSS keyframes | `skew` (deg), `jitter` (px), `scanlines` (on/off) |
| 17 | `char-shatter` | Character Shatter | Glitch | CSS + JS (grapheme split) | `scatter` (px), `spin` (deg) |
| 18 | `glow-pulse` | Glow Pulse | Neon / 3D | CSS keyframes | `glow` (px), `glowColor`, `intensity` |
| 19 | `echo-stack` | Echo Stack | Neon / 3D | CSS keyframes | `layers`, `spread` (px) |
| 20 | `gradient-sheen` | Gradient Sheen | Neon / 3D | CSS keyframes | `sheenColor`, `size` (%) |
| 21 | `word-pop` | Word Pop | Karaoke | CSS keyframes | `highlightColor`, `pop` (scale) |
| 22 | `vertical-ticker` | Vertical Ticker | Marquee | CSS keyframes | `speed` (s), `direction` (up/down), `gap` (px) |
| 23 | `diagonal-ticker` | Diagonal Ticker | Marquee | CSS keyframes | `angle` (deg), `speed` (s), `direction` (left/right) |

Aturan implementasi:
- Semua animasi memakai `transform` + `opacity` (+ `filter: blur` untuk #2) supaya tidak memicu layout.
- Efek CSS memakai class berprefix `tf-<effect-id>` dan keyframes unik supaya snippet yang di-copy tidak bentrok dengan CSS app.
- GSAP di-import lazy: `lib/gsap.ts` hanya masuk bundle chunk modal untuk efek #7 dan #8 (dynamic import di `Preview.tsx`).
- Setiap `Preview.tsx` menerima `{ params, playKey }`; perubahan `playKey` = replay.
- Loop default `false` untuk semua efek kecuali marquee (#9) dan type-delete (#3).

---

## 5. UI & Layout

### 5.1 Design tokens (monochrome dark)

```
--bg:        #0A0A0A   /* page */
--surface:   #121212   /* card, modal */
--surface-2: #191919   /* control bg */
--border:    #262626
--text:      #F5F5F5
--muted:     #8C8C8C
--accent:    #E8E8E8   /* monochrome: near-white, dipakai untuk fokus/aktif */
--danger:    #F87171   /* hanya untuk label format disabled? tidak dipakai, opsional */
```

- Radius 2px (sharp, editorial). Border 1px.
- Grid: `max-width: 1200px`, padding 24px mobile / 40px desktop, 12 kolom.
- Type scale (all sans): 12 / 14 / 16 / 20 / 28 / 44 / 72px. Display pakai weight 600 dan tracking negatif (-0.02em).
- Font: **Inter** (UI + default preview), opsi preview **Space Grotesk** dan **Sora**. Dimuat via Google Fonts `<link>` di `index.html` dengan `display=swap`, hanya weight 400/500/600/700/800 yang dipakai.
- Focus ring: `outline: 1px solid var(--accent)`, offset 3px, tidak dihapus.

### 5.2 Halaman utama (urutan)

1. **Header** — wordmark `typeframes` di kiri, link kecil kanan: `Catalog`, `About`, `GitHub`.
2. **Hero** — display besar `Text that moves.` + satu baris subcopy: "23 hand-tuned text animations. Play with them, then take the code." Tanpa gambar, tanpa CTA besar; satu tombol teks "Browse the catalog ↓" yang scroll ke grid.
3. **Catalog grid** — 3 kolom ≥1024px, 2 kolom ≥640px, 1 kolom mobile. Kartu: area preview rasio 4:3 dengan background `--surface`, label nama (weight 500), kategori dalam huruf kecil muted, dan ikon kecil penanda format tersedia.
4. **About** — 2 paragraf pendek: apa itu typeframes, kenapa dibuat (portfolio + alat kerja), dan catatan teknis singkat ("CSS-first; GSAP only where it earns it. Codes are dependency-free unless noted.").
5. **Footer** — wordmark kecil, link GitHub + email, baris `© 2026`. Tidak ada newsletter, tidak ada form.

### 5.3 Kartu katalog & trigger preview

- Desktop: hover atau keyboard focus → animasi play sekali. `mouseleave`/blur → reset ke frame akhir (atau frame awal kalau efek loop).
- Mobile/touch (`(hover: none)`): tap pada area preview → play; tap lagi → replay. Kartu tetap membuka modal lewat tombol/label "Open" atau tap pada judul, supaya tap-to-play tidak bertabrakan dengan navigasi. **Aturan konkret:** tap pada area preview = play, tap pada judul/kategori/chevron = buka modal.
- Hanya satu kartu boleh animasi pada satu waktu; kartu lain di-reset.
- `IntersectionObserver` mematikan animasi kartu yang keluar viewport (hemat CPU/baterai).

### 5.4 Modal (playground + code)

Lebar `min(1040px, calc(100vw - 32px))`, tinggi maks `calc(100vh - 64px)`, background `--surface`, border 1px. Dua kolom ≥900px, stacked di bawahnya. Scroll internal.

**Kolom kiri — preview**
- Stage preview tinggi 260–320px, background `--bg`, text di-center, padding 32px, `overflow: hidden`.
- Di bawah stage: textarea/input text (1–3 baris, auto-grow), counter `n / 120`.
- Tombol: `Replay`, `Loop` (toggle), `Reset` (balik ke default efek).
- Indikator kecil kalau `prefers-reduced-motion` aktif: "Motion reduced — animations show the end state." + tombol `Play anyway`.

**Kolom kanan — controls + code**
- `ControlPanel`: grup "Timing" (duration, delay/stagger, easing), "Type" (font family, size, weight), "Color" (text color, plus extra color kalau ada), lalu "Effect" (extra params dari schema, urut sesuai `extraParams`).
- Setiap kontrol punya label + nilai numerik yang terlihat; slider pakai native `<input type="range">` yang di-style.
- `CodePanel`: dropdown format (`HTML + CSS`, `HTML + CSS + JS` bila perlu, `React`, `Framer Motion`), blok `<pre><code>` scroll horizontal, tombol `Copy` di kanan atas blok. Format yang tidak didukung tetap muncul di dropdown tapi disabled dengan tooltip alasan (mis. "Typewriter loops can't be expressed as a Framer variant").
- Tombol `Copy` memberi feedback "Copied" selama 1.5s dan mengumumkannya lewat `aria-live="polite"`.
- `HTML + CSS` untuk efek GSAP menampilkan tab `HTML + CSS + JS` yang menyertakan `<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js">` + inline script; tab React menyertakan komentar `// requires gsap`.

**Perilaku modal**
- Dibuka dari kartu, `id` efek masuk ke `location.hash` (`#/line-mask-rise`) supaya bisa di-refresh/di-bookmark. Tutup = hash dihapus. Tidak ada halaman terpisah.
- `Esc` menutup, klik backdrop menutup, fokus terkunci di dalam modal, fokus kembali ke kartu asal saat ditutup.
- Scroll body di-lock saat modal terbuka.

---

## 6. Playground State & Persistence

- Key `localStorage`: `typeframes:preset:v1:<effectId>`.
- Yang disimpan: seluruh `SharedParams` + `extraParams` untuk efek tersebut (bukan text? — text **ikut** disimpan, karena user memilih preset disimpan; text yang masih default tidak disimpan untuk menghindari preset "kosong"). Keputusan: simpan semua params termasuk text; `Reset` menghapus entry key tersebut.
- Load saat modal dibuka; kalau tidak ada entry, pakai default dari `meta.ts` + default shared params.
- Debounce penulisan 300ms. Bungkus `try/catch` (mode private / storage penuh) → fallback ke in-memory state tanpa error.
- Tidak ada share URL, tidak ada favorites, tidak ada sinkronisasi.

---

## 7. Export Kode

### 7.1 Prinsip
- Setiap snippet **self-contained**: HTML + CSS (+JS kalau perlu), tanpa class Tailwind, tanpa import komponen app, tanpa asumsi design token typeframes.
- Nilai parameter yang di-copy = nilai yang sedang aktif di playground.
- Text di-escape untuk HTML dan di-quote dengan benar untuk string JS/JSX.
- Nama class memakai prefix `tf-<effect-id>`; keyframes diberi nama `tf-<effect-id>-<anim>`.
- Header komentar: `/* typeframes — Line Mask Rise */` (satu baris, tanpa iklan/attribution wajib).
- Snippet diberi komentar singkat hanya di tempat yang tidak jelas (mis. "split into lines before animating"), bukan komentar naratif di setiap baris.

### 7.2 Format per efek

| Format | Berlaku untuk | Isi |
|---|---|---|
| `HTML + CSS` | #1, #2, #5, #6, #9 | Markup + CSS lengkap; untuk #1/#2 markup sudah pre-split per line/char |
| `HTML + CSS + JS` | #3, #4, #7, #8 (+ #1/#2 versi dinamis) | Markup + CSS + `<script>`; #7/#8 pakai GSAP CDN |
| `React` | semua (9) | Satu file komponen JSX; CSS di `<style>` atau inline; JS effect dalam `useEffect` + cleanup |
| `Framer Motion` | #1, #2, #5, #6, #7, #9 | `motion.*` + variants; #8 karaoke hanya versi "approximate"? → **tidak didukung**, disabled |

Format yang disabled: `Framer Motion` untuk #3 (typewriter loop), #4 (scramble random), #8 (timeline per-kata dengan easing berurutan). Alasan ditampilkan di tooltip.

### 7.3 Cara snippet dihasilkan
- `snippets.ts` per efek mengekspor fungsi `build(params): Record<Format, string>`.
- React & Framer snippets adalah template string yang di-author manual dan harus **mencerminkan** `Preview.tsx` (nilai, easing, durasi, struktur markup). Bukan hasil transpile otomatis.
- Wajib ada komentar di atas file: `// keep in sync with Preview.tsx`. Perubahan visual pada Preview harus disertai update snippet.
- Verifikasi manual: tempel snippet HTML/CSS ke file kosong di browser dan bandingkan dengan preview untuk 3 kombinasi parameter (default, min, max).

### 7.4 Copy behavior
- `navigator.clipboard.writeText` dengan fallback `document.execCommand('copy')` (kalau non-HTTPS/localhost).
- Gagal copy → tampilkan pesan "Copy failed, select the code manually" dan fokuskan blok kode.

---

## 8. Edge Case Text

Semua input text lewat satu util `splitText.ts`:

| Kasus | Perlakuan |
|---|---|
| Emoji / grapheme | Split per **grapheme** pakai `Intl.Segmenter('en', { granularity: 'grapheme' })`; fallback ke `Array.from` kalau tidak tersedia. Emoji compound (👨‍👩‍👧‍👦, flag) tidak boleh pecah. |
| RTL (Arab/Hebrew) | Deteksi via regex script; efek yang memecah per karakter otomatis pindah ke split **per kata**. Contoh: `char-stagger` dan `line-mask-rise` mendeteksi RTL → word-level animation + `dir="auto"` pada stage. |
| Multi-line | Textarea mengizinkan `Enter`; preview mempertahankan line break. Efek char-based mengabaikan `\n` untuk perhitungan delay tapi tetap merender baris baru. Efek mask (#1) menganimasikan per baris. |
| Max length | 120 karakter (dihitung per grapheme, bukan UTF-16 code unit). Counter berubah muted → putih saat mendekati batas; input di-`maxlength` + di-truncate programatik supaya paste panjang tetap aman. |
| Text kosong / hanya spasi | Preview memakai sample text default efek; counter tetap 0; tombol copy tetap menghasilkan kode dengan sample text dan komentar `<!-- default sample text -->`. |
| Karakter khusus | `<`, `>`, `&`, kutip, backslash di-escape di output HTML dan string JS/JSX. |
| Whitespace berlebih | Multiple spasi di-collapse untuk efek word-based; `&nbsp;` dipakai agar spasi tidak hilang saat di-split. |

**Sample text katalog:** satu frasa konsisten `Make it move` untuk semua kartu. Didefinisikan sebagai konstanta tunggal (`SAMPLE_TEXT` di `lib/constants.ts`) supaya gampang diganti; marquee mengulang frasa tersebut.

---

## 9. Accessibility & Motion

- `prefers-reduced-motion: reduce` → semua preview tampil di *end state* statis, play otomatis dinonaktifkan, hover tidak memicu animasi.
- Override "Play anyway" hanya untuk sesi berjalan (state di memori, tidak dipersist) dan hanya mengaktifkan animasi di modal yang sedang terbuka + kartu yang di-hover setelah override. Label tombol berubah jadi "Motion on".
- Semua kontrol punya label terhubung (`<label for>` / `aria-label`), slider punya `aria-valuetext` berisi nilai + unit.
- Kartu katalog adalah `<button>`/`<a>` yang fokusable; satu-satunya interaksi keyboard: `Enter`/`Space` membuka modal, `Tab` berpindah, `Esc` menutup.
- Kontras text minimal 4.5:1 (`#F5F5F5` di `#0A0A0A` = jauh di atas ambang; `--muted` di surface dicek dan digelapkan bila perlu).
- Animasi dekoratif tidak boleh menghalangi pembacaan: text preview tetap bisa dibaca di frame akhir; setiap efek punya state akhir yang "settled" (marquee dikecualikan karena memang bergerak, tapi `pauseOnHover` dan toggle loop tersedia).

---

## 10. Performance

- Hanya `transform`, `opacity`, dan `filter` yang dianimasikan; tidak ada animasi `width/height/top/left`.
- Maksimal satu animasi berjalan di grid (lihat §5.3) + satu di modal.
- `IntersectionObserver` untuk pause offscreen; `document.visibilitychange` untuk pause semua saat tab tidak aktif.
- GSAP di-load via dynamic import hanya saat modal efek #7/#8 dibuka.
- Target Lighthouse: Performance ≥ 90, Accessibility ≥ 95 di mobile, dengan total JS awal < 200KB gzip (di luar GSAP chunk).
- Tidak ada gambar/hero ilustrasi; hanya text dan CSS.

---

## 11. Build & Deploy (GitHub Pages)

- `vite.config.ts`: `base: './'` agar asset resolve relatif terhadap path repo.
- Repo GitHub Actions workflow `.github/workflows/deploy.yml`: `npm ci` → `npm run build` → `actions/upload-pages-artifact` (`dist`) → `actions/deploy-pages`.
- Tanpa SPA fallback (`404.html`) karena tidak ada route; hash modal tidak butuh server.
- `npm run build` harus bersih (TypeScript strict, no unused). `npm run preview` dipakai untuk cek hasil build.
- Nama repo diasumsikan `typeframes`; kalau nama lain, cukup ubah `base` bila perlu (relatif `./` seharusnya sudah aman).

---

## 12. Acceptance Criteria

1. `npm run build` sukses tanpa error TypeScript; `dist/` bisa dibuka dari subpath GitHub Pages.
2. Sembilan efek tampil di grid, semuanya bisa di-hover (desktop) dan tap-play (touch), dan membuka modal yang sama.
3. Modal menampilkan preview live yang bereaksi real-time terhadap **semua** kontrol (shared + extra) tanpa reload.
4. `Replay`, `Loop`, dan `Reset` bekerja; `Reset` menghapus preset dari `localStorage`.
5. Reload halaman → preset terakhir per efek tetap ada.
6. Ganti text ke emoji compound, teks Arab, dan teks multi-baris → tidak error, tidak ada karakter pecah/terpotong.
7. Input > 120 grapheme dipotong dan counter benar.
8. Dengan `prefers-reduced-motion` aktif: preview statis, tombol "Play anyway" mengaktifkan animasi.
9. Copy snippet HTML/CSS untuk efek CSS menghasilkan animasi yang sama saat ditempel di file HTML kosong (dicek untuk 3 kombinasi parameter).
10. Format yang tidak didukung muncul disabled dengan alasan, bukan hilang atau error.
11. `Esc`, klik backdrop, dan tombol close menutup modal; fokus kembali ke kartu asal.
12. Layout tidak overflow horizontal di 360px; modal bisa di-scroll penuh di layar pendek.
13. Tidak ada `console.error` saat navigasi grid → modal → ganti format → tutup.

---

## 13. Non-Goals (v1)

- Export video/GIF/image, render server-side, canvas/WebGL.
- Backend, database, auth, CMS, API.
- Analytics, newsletter, komentar, rating.
- Filter/search/favorites/share URL.
- Light mode dan theme switch.
- Library npm yang bisa di-install (v1 hanya copy-paste snippet).
- Dukungan multi-halaman atau docs per efek.

---

## 14. Hal yang Masih Terbuka

- Nama final 9 efek (nama di §4 masih working title; `id` sudah fix karena dipakai di hash & prefix class).
- Apakah snippet perlu menyertakan credit `typeframes` secara opsional (default: hanya komentar header, tanpa link).
- Copy hero: `Text that moves.` masih placeholder; bisa diganti saat implementasi.
- Apakah efek marquee perlu varian vertikal di v1 (default: tidak).
- Font ketiga: `Sora` dipilih sebagai opsi; bisa diganti `DM Sans` setelah cek rendering di preview.
