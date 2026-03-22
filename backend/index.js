import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import rsvpRoutes from './routes/rsvp.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
const origins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*';
app.use(cors({
    origin: origins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
    maxAge: 86400 // Cache preflight response
}));

// HTTP Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/rsvps', rsvpRoutes);

// Heartbeat / Status route
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        message: 'Wedding API is active',
        timestamp: new Date().toISOString()
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Mehak & Simarpal Wedding API (Node.js version)',
        status: 'online'
    });
});

// Error handling middleware (very basic for now)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'developer' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 8000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
