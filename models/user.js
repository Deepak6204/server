const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseId: { type: String, required: true }, // Store Firebase UID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  scores: {
    round1: {
      score: { type: Number, default: null },   // Initially null (no score if unattempted)
      time: { type: Number, default: null },    // Time is also null until round is attempted
      eligible: { type: Boolean, default: true },  // Indicates if the user is eligible for this round
      attempted: { type: Boolean, default: false } // Indicates if the user has attempted this round
    },
    round2: {
      score: { type: Number, default: null },
      time: { type: Number, default: null },
      eligible: { type: Boolean, default: true },
      attempted: { type: Boolean, default: false }
    },
    round3: {
      score: { type: Number, default: null },
      time: { type: Number, default: null },
      eligible: { type: Boolean, default: true },
      attempted: { type: Boolean, default: false }
    }
  }
});

module.exports = mongoose.model('User', userSchema);
