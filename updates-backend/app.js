require('dotenv').config();
const express = require('express');
const app = express();
const churchesRouter = require('./routes/churches');
const eventsRouter = require('./routes/events');
const donationsRouter = require('./routes/donations');
const announcementsRouter = require('./routes/announcements');
const ministriesRouter = require('./routes/ministries');
const membersRouter = require('./routes/members');
const usersRouter = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

app.use('/churches', churchesRouter);
app.use('/events', eventsRouter);
app.use('/donations', donationsRouter);
app.use('/announcements', announcementsRouter);
app.use('/ministries', ministriesRouter);
app.use('/members', membersRouter);
app.use('/users', usersRouter);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
