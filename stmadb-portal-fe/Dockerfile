# Stage 1: Build Stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Set build-time arguments, for example, API URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build the Next.js application
RUN npm run build

# Stage 2: Production Stage
FROM node:20-slim

WORKDIR /app

# Copy built assets from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Expose the port the app runs on
EXPOSE 3000

# Command to start the application
CMD ["node", "server.js"]