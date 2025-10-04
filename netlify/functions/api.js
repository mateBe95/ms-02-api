// netlify/functions/api.js
import express, { Router } from "express";
const serverless = require('serverless-http');
import datasetsRouter from "./datasets.js";
import suggestionsRouter from "./suggestions.js";
import reviewsRouter from "./reviews.js";

const app = express();

const router = express.Router({
	caseSensitive: true,
	mergeParams: true
});

// ============ MIDDLEWARE ============

// Parse JSON
app.use(express.json());

// CORS - pozwala na requesty z frontendu
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // lub konkretna domena
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Obsługa preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Logowanie requestów
router.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// ============ MIDDLEWARE AUTORYZACJI (opcjonalne) ============

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Brak tokenu autoryzacji'
    });
  }
  
  // Tu sprawdź token (JWT, API key, etc.)
  // if (token !== process.env.API_KEY) {
  //   return res.status(403).json({ success: false, message: 'Nieprawidłowy token' });
  // }
  
  next();
};

// ============ POŁĄCZENIE Z BAZĄ DANYCH ============

// Przykład z PostgreSQL (odkomentuj jeśli używasz)
// const { Pool } = require('pg');
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false }
// });

// Przykład z MongoDB (odkomentuj jeśli używasz)
// const mongoose = require('mongoose');
// let cachedDb = null;
// async function connectDB() {
//   if (cachedDb) return cachedDb;
//   const db = await mongoose.connect(process.env.MONGODB_URI);
//   cachedDb = db;
//   return db;
// }

// ============ ENDPOINTY ============

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API działa!',
    timestamp: new Date().toISOString()
  });
});

// GET - wszystkie użytkownicy
router.get('/users', async (req, res) => {
  try {
    // Przykład z PostgreSQL:
    // const result = await pool.query('SELECT * FROM users');
    // res.json({ success: true, data: result.rows });
    
    // Przykład z MongoDB:
    // await connectDB();
    // const users = await User.find();
    // res.json({ success: true, data: users });
    
    // Na razie mock data:
    res.json({
      success: true,
      data: [
        { id: 1, name: 'Jan Kowalski', email: 'jan@example.com' },
        { id: 2, name: 'Anna Nowak', email: 'anna@example.com' }
      ]
    });
  } catch (error) {
    console.error('Błąd:', error);
    res.status(500).json({
      success: false,
      message: 'Błąd serwera',
      error: error.message
    });
  }
});

// GET - konkretny użytkownik
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Przykład z PostgreSQL:
    // const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    // if (result.rows.length === 0) {
    //   return res.status(404).json({ success: false, message: 'Nie znaleziono' });
    // }
    // res.json({ success: true, data: result.rows[0] });
    
    res.json({
      success: true,
      data: { id, name: 'Jan Kowalski', email: 'jan@example.com' }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Błąd serwera',
      error: error.message
    });
  }
});

// POST - nowy użytkownik
router.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Walidacja
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Brak wymaganych pól: name, email'
      });
    }
    
    // Przykład z PostgreSQL:
    // const result = await pool.query(
    //   'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    //   [name, email]
    // );
    // res.status(201).json({ success: true, data: result.rows[0] });
    
    res.status(201).json({
      success: true,
      message: 'Użytkownik utworzony',
      data: { id: 3, name, email }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Błąd serwera',
      error: error.message
    });
  }
});

// PUT - aktualizacja użytkownika
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    // Przykład z PostgreSQL:
    // const result = await pool.query(
    //   'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    //   [name, email, id]
    // );
    
    res.json({
      success: true,
      message: 'Użytkownik zaktualizowany',
      data: { id, name, email }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Błąd serwera',
      error: error.message
    });
  }
});

// DELETE - usuń użytkownika
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Przykład z PostgreSQL:
    // await pool.query('DELETE FROM users WHERE id = $1', [id]);
    
    res.json({
      success: true,
      message: 'Użytkownik usunięty'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Błąd serwera',
      error: error.message
    });
  }
});

// ============ ERROR HANDLING ============

// 404 handler

// Montuj router
app.use("/api/", router);
router.use("/datasets", datasetsRouter);
router.use("/suggestions", suggestionsRouter);
router.use("/reviews", reviewsRouter);
router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint nie znaleziony'
  });
});

// Eksportuj jako serverless function
module.exports.handler = serverless(app);