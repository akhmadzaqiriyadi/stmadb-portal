# Stage 1: Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# (Opsional) Jika Anda menggunakan TypeScript, tambahkan build step
# RUN npm run build  <-- Jika Anda punya script build untuk transpile TS ke JS

# Stage 2: Production Stage
FROM node:20-alpine

WORKDIR /app

# Copy dependencies from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Copy compiled code and prisma schema
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma

# Expose the port the app runs on
EXPOSE 8000  


# Command to run the application
# Karena Anda menggunakan ts-node di dev, pastikan cara run di prod sudah benar
# Idealnya, Anda build TS ke JS dulu. Tapi untuk simpelnya, kita bisa pakai ts-node langsung.
# Untuk production sejati, sangat disarankan untuk build ke JS.
CMD [ "node", "--loader", "ts-node/esm", "src/index.ts" ]