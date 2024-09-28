const User = require('../models/user');

const is_eligible = async (req, res) => {
    const {round, firebaseId} = req.body;
  try {
    // Fetch all users from the database
    const users = await User.find({firebaseId});

    // Check if there are any users in the database
    console.log(users[0].scores)
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    else if(users[0].scores[round].eligible == true && users[0].scores[round].attempted == false){
        return res.status(200).json({attempt:true})
    }

    // Return all users
    res.status(200).json({ attempt:false });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { is_eligible };
