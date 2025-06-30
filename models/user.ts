import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
});

export const User = models.User || model('User', userSchema);
