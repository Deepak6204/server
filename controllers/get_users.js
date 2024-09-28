const User = require('../models/user');

const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({});

    // Check if there are any users in the database
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Return all users
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllUsers };
