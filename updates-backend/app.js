require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());
const churchesRouter = require('./routes/churches');
const eventsRouter = require('./routes/events');
const globalEventsRouter = require('./routes/globalEvents');
const donationsRouter = require('./routes/donations');
const announcementsRouter = require('./routes/announcements');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const enrollmentRoutes = require('./routes/enrollment');
const uploadRoutes = require('./routes/upload');
const errorHandler = require('./middleware/errorHandler');
const { initializeDatabase } = require('./db');

app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Authentication routes
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/enrollment', enrollmentRoutes);

// Existing routes
app.use('/churches', churchesRouter);
app.use('/churches/:churchId/events', eventsRouter);
app.use('/events', globalEventsRouter);
app.use('/churches/:churchId/donations', donationsRouter);
app.use('/announcements', announcementsRouter);

// Upload routes
app.use('/upload', uploadRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Initialize database and start server
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
