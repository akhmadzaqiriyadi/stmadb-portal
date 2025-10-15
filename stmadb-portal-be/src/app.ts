// src/app.ts
import express from 'express';
import type { Express, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.route.js';
import userRoutes from './modules/users/users.route.js';
import academicRoutes from './modules/academics/academics.route.js';

// Impor swagger
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './core/config/swagger.js'; // Tambahkan .js

const app: Express = express();

// Konfigurasi CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Daftarkan route untuk Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route utama untuk testing
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP' });
});

// Daftarkan semua route dari modul di sini
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/academics', academicRoutes);

export default app;