const User = require('../models/user');

const updateScore = async (req, res) => {
  console.log(req.body)
  const { firebaseId, selectedRound, score, elapsed_time } = req.body;
  console.log("a: ",firebaseId)
  console.log("a: ",selectedRound)
  console.log("a: ",score)
  console.log("a: ",elapsed_time)

  if (!firebaseId || !selectedRound || score === undefined || elapsed_time === undefined) {
    return res.status(400).json({ message: 'Invalid input. Please provide firebaseId, selectedRound, score, and elapsed_time.' });
  }
  try {
    // Find the user by Firebase ID
    const user = await User.findOne({ firebaseId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the score for the selectedRound has already been set
    // if (user.scores[selectedRound].score !== null) {
    //   return res.status(400).json({ message: `Score for selectedRound ${selectedRound} has already been submitted. Only one attempt is allowed.` });
    // }

    // Update score and elapsed_time for the specified selectedRound if it's the first attempt
    user.scores[selectedRound].score += score;
    user.scores[selectedRound].time = elapsed_time;
    user.scores[selectedRound].attempted = true;


    // Save updated user data
    await user.save();

    res.status(200).json({
      message: `Score and elapsed_time for selectedRound ${selectedRound} updated successfully`,
      scores: user.scores,
    });
  } catch (error) {
    console.error('Error updating score and elapsed_time:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { updateScore };
