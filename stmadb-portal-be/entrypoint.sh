#!/bin/sh

# Menjalankan perintah Prisma migrate untuk menerapkan skema ke database.
# 'deploy' digunakan untuk lingkungan non-development karena tidak akan menanyakan apa pun.
echo "Running database migrations..."
npx prisma migrate deploy

# (Opsional) Menjalankan perintah seed untuk mengisi data awal.
# Hapus atau beri komentar baris ini jika Anda tidak butuh seeding.
echo "Running database seeding..."
npx prisma db seed

# 'exec "$@"' akan menjalankan perintah apa pun yang diberikan sebagai CMD di Dockerfile.
# Ini memastikan script berhenti di sini dan menyerahkan kontrol ke server Express Anda.
exec "$@"