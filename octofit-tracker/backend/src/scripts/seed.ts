/**
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose';
import { connectDB } from '../config/database';
import User from '../models/User';
import Team from '../models/Team';
import Workout from '../models/Workout';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const seed = async () => {
  console.log('Seed the octofit_db database with test data');
  await connectDB();

  // Clear collections
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  // Create teams
  const alpha = await Team.create({ name: 'Team Alpha' });
  const beta = await Team.create({ name: 'Team Beta' });

  // Create users
  const users = await User.create([
    { name: 'Alice Rivera', email: 'alice@example.com', password: 'password', avatar: '', team: alpha._id },
    { name: 'Bob Chen', email: 'bob@example.com', password: 'password', avatar: '', team: alpha._id },
    { name: 'Cara Singh', email: 'cara@example.com', password: 'password', avatar: '', team: beta._id },
  ]);

  // Add members to teams
  alpha.members = [users[0]!._id, users[1]!._id];
  beta.members = [users[2]!._id];
  await alpha.save();
  await beta.save();

  // Workouts
  const run = await Workout.create({ name: 'Morning Run', type: 'running', durationMinutes: 30, caloriesBurned: 300, difficulty: 'medium' });
  const yoga = await Workout.create({ name: 'Vinyasa Yoga', type: 'yoga', durationMinutes: 45, caloriesBurned: 200, difficulty: 'easy' });
  const hiit = await Workout.create({ name: 'HIIT Blast', type: 'hiit', durationMinutes: 20, caloriesBurned: 250, difficulty: 'hard' });

  // Activities
  const activities = await Activity.create([
    { user: users[0]!._id, team: alpha._id, workout: run._id, durationMinutes: 30, distanceKm: 5, calories: 300, date: new Date() },
    { user: users[1]!._id, team: alpha._id, workout: hiit._id, durationMinutes: 20, calories: 250, date: new Date() },
    { user: users[2]!._id, team: beta._id, workout: yoga._id, durationMinutes: 45, calories: 200, date: new Date() },
  ]);

  // Leaderboard - simple points from calories
  const leaderboardEntries = [] as any[];
  for (const u of users) {
    const userActivities = activities.filter(a => String(a.user) === String(u._id));
    const points = userActivities.reduce((s, a) => s + a.calories, 0);
    leaderboardEntries.push({ user: u._id, points });
  }

  await Leaderboard.create(
    leaderboardEntries.map((e, idx) => ({ ...e, rank: idx + 1 }))
  );

  console.log('Seeding complete. Created:', {
    users: users.length,
    teams: 2,
    workouts: 3,
    activities: activities.length,
    leaderboard: leaderboardEntries.length,
  });

  await mongoose.disconnect();
};

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
