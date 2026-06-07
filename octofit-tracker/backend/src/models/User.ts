import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  joinedAt: Date;
  team?: mongoose.Types.ObjectId;
  totalPoints?: number;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  joinedAt: { type: Date, default: Date.now },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  totalPoints: { type: Number, default: 0 },
});

export default mongoose.model<IUser>('User', UserSchema);
