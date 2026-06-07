import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  team?: mongoose.Types.ObjectId;
  workout?: mongoose.Types.ObjectId;
  durationMinutes: number;
  distanceKm?: number;
  calories: number;
  date: Date;
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  workout: { type: Schema.Types.ObjectId, ref: 'Workout' },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number },
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);
