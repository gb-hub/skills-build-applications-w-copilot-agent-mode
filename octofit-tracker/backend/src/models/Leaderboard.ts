import mongoose, { Document, Schema } from 'mongoose';

export interface ILeaderboard extends Document {
  user: mongoose.Types.ObjectId;
  points: number;
  rank?: number;
}

const LeaderboardSchema = new Schema<ILeaderboard>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true, default: 0 },
  rank: { type: Number },
});

export default mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
