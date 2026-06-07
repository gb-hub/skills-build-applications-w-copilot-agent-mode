import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  type: string;
  durationMinutes: number;
  caloriesBurned?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
