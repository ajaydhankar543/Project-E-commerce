import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  address: String,
}, { timestamps: true });

export default mongoose.model('User', userSchema);