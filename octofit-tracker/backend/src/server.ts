import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
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

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  try {
    await connectDB();
    const host = '0.0.0.0';
    app.listen(PORT, host, () => {
      console.log(`OctoFit Tracker Backend listening on ${host}:${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);

      const codespace = process.env.CODESPACE_NAME;
      if (codespace) {
        // Common Codespaces preview host patterns; log a helpful preview URL when available.
        const preview1 = `https://${PORT}-${codespace}.githubpreview.dev`;
        const preview2 = `https://${codespace}-${PORT}.preview.app.github.dev`;
        console.log('Codespaces detected. Possible preview URLs:');
        console.log(preview1);
        console.log(preview2);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
