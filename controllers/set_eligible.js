const User = require('../models/user');

const setRound1Eligible = async (req, res) => {
  try {
    const result = await User.updateMany(
      { 'scores.round1.eligible': false },
      { $set: { 'scores.round1.eligible': true } }
    );
    res.status(200).json({ message: 'All users are now eligible for round1', result });
  } catch (error) {
    res.status(500).json({ message: 'Error updating eligibility', error });
  }
};

const setRound2EligibleForTop60 = async (req, res) => {
  try {
    const users = await User.find({ 'scores.round1.attempted': true });

    const sortedUsers = users.sort((a, b) => {
      const scoreA = a.scores?.round1?.score ?? 0;
      const scoreB = b.scores?.round1?.score ?? 0;

      if (scoreA > scoreB) return -1;
      if (scoreA < scoreB) return 1;

      const timeA = a.scores?.round1?.time ?? Number.MAX_SAFE_INTEGER;
      const timeB = b.scores?.round1?.time ?? Number.MAX_SAFE_INTEGER;

      return timeA - timeB;
    });

    const top60Percent = Math.ceil(sortedUsers.length * 0.6);
    const topUsers = sortedUsers.slice(0, top60Percent);

    const userIds = topUsers.map(user => user._id);

    await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { 'scores.round2.eligible': true } }
    );

    res.status(200).json({ message: 'Eligible users for round 2 updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating eligibility', error });
  }
};

const setRound3EligibleForTop30 = async (req, res) => {
  try {
    const users = await User.find({ 'scores.round2.attempted': true });

    const sortedUsers = users.sort((a, b) => {
      const scoreA = a.scores?.round2?.score ?? 0;
      const scoreB = b.scores?.round2?.score ?? 0;

      if (scoreA > scoreB) return -1;
      if (scoreA < scoreB) return 1;

      const timeA = a.scores?.round2?.time ?? Number.MAX_SAFE_INTEGER;
      const timeB = b.scores?.round2?.time ?? Number.MAX_SAFE_INTEGER;

      return timeA - timeB;
    });

    const top30Percent = Math.ceil(sortedUsers.length * 0.3);
    const topUsers = sortedUsers.slice(0, top30Percent);

    const userIds = topUsers.map(user => user._id);

    await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { 'scores.round3.eligible': true } }
    );

    res.status(200).json({ message: 'Eligible users for round 3 updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating eligibility', error });
  }
};

module.exports = { setRound1Eligible, setRound2EligibleForTop60, setRound3EligibleForTop30 };
