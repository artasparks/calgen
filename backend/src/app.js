import express from 'express';
import calendarRouter from './routes/calendar.js';

const app = express();

app.use('/api/calendar', calendarRouter);

export default app;
