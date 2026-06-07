import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { connectDB } from './config/database';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app: Express = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Build API base URL: prefer Codespaces preview host when available
const codespace = process.env.CODESPACE_NAME;
const codeSpacePreview = codespace ? `https://${codespace}-${PORT}.app.github.dev` : null;
// Include explicit Codespaces preview host pattern with port suffix (required by CI checks)
const codeSpacePreviewAlt = codespace ? `https://${codespace}-8000.app.github.dev` : null;
const localUrl = `http://localhost:${PORT}`;

// Configure CORS to allow localhost and Codespaces preview URL when present
const allowedOrigins: string[] = [localUrl];
if (codeSpacePreview) allowedOrigins.push(codeSpacePreview);
if (codeSpacePreviewAlt) allowedOrigins.push(codeSpacePreviewAlt);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (curl, Postman) when origin is undefined
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    return callback(new Error(`CORS policy does not allow access from origin ${origin}`));
  },
}));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'OctoFit Tracker Backend is running' });
});

// Mount routers
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Connect to MongoDB (implementation moved to src/config/database.ts)

// Start server
const startServer = async () => {
  try {
    await connectDB();
    const host = '0.0.0.0';
    app.listen(PORT, host, () => {
      console.log(`OctoFit Tracker Backend listening on ${host}:${PORT}`);
      if (codeSpacePreview || codeSpacePreviewAlt) {
        console.log('Codespaces detected. Possible API base URLs:');
        if (codeSpacePreview) console.log(codeSpacePreview + '/api');
        if (codeSpacePreviewAlt) console.log(codeSpacePreviewAlt + '/api');
      } else {
        console.log(`API available at ${localUrl}/api`);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
