const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Check if the model already exists before defining it
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Ensure the model is only compiled once
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
