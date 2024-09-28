const User = require('../models/user.js');

const loginUser = async (req, res) => {
  const { firebaseId, name, email } = req.body;

  try {
    let user = await User.findOne({ firebaseId });
    // If the user does not exist, create a new user with null scores
    if (!user) {
      user = new User({
        firebaseId,
        name,
        email,
        scores: {
          round1: { score: null, time: null }, // Initially unattempted
          round2: { score: null, time: null },
          round3: { score: null, time: null },
        },
      });
      await user.save();
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginUser };
