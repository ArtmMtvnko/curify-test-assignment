import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  phone: { type: String, unique: true },
  email: { type: String, unique: true },
  nctId: String,
  letter: String,
});

export const User = models.User || model('User', userSchema);
