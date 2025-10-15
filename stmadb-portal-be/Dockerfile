# File: stmadb-portal-be/Dockerfile

# --- Tahap 1: Build (Membangun Aplikasi) ---
# Kita gunakan image Node.js versi 18-alpine sebagai dasar
FROM node:18-alpine AS builder

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# Install semua dependencies
RUN npm install

# Salin semua sisa kode proyek
COPY . .

# Jalankan build script untuk mengkompilasi TypeScript ke JavaScript
RUN npm run build


# --- Tahap 2: Produksi (Menjalankan Aplikasi) ---
# Kita mulai lagi dari image yang sama dan bersih untuk hasil yang lebih kecil
FROM node:18-alpine
WORKDIR /app

# Salin hanya file yang dibutuhkan dari tahap 'builder'
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Set environment ke produksi
ENV NODE_ENV=production

# Generate Prisma Client di dalam container produksi. Ini penting!
RUN npx prisma generate

# Buka port 8080 agar bisa diakses dari luar container
EXPOSE 8080

# Perintah default untuk menjalankan aplikasi saat container dimulai
CMD ["node", "dist/index.js"]