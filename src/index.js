// netlify/functions/api.js
import express from "express";
import datasetsRouter from "./routes/datasets.js";
import suggestionsRouter from "./routes/suggestions.js";
import reviewsRouter from "./routes/reviews.js";
import commentsRouter from "./routes/comments.js";
import usersRouter from "./routes/users.js";

const app = express();

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
app.use((req, res, next) => {
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
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API działa!',
        timestamp: new Date().toISOString()
    });
});


// Montuj router
// app.use("/api/users", usersRouter);
app.use("/api/users", usersRouter);
app.use("/api/datasets", datasetsRouter);
app.use("/api/suggestions", suggestionsRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/comments", commentsRouter);

// ============ ERROR HANDLING ============

// 404 handler

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint nie znaleziony",
    });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API is working at port ${PORT}`));