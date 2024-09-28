const fs = require('fs').promises;
const path = require('path');

// File paths
// const selectedQuestionFilePath = path.join(__dirname, '../data/selectedQuestion.json');
// const selectedBugsFilePath = path.join(__dirname, '../data/selectedBugs.json');

const searchLinesWithBugs = (question, bugIds) => {
  return question.code
    .filter(line => line.hasBug && bugIds.includes(question.code.indexOf(line)))
    .map(line => line.line);
};

const handleSubmit = async (req, res) => {
  try {
    const { selectedQuestion, selectedBugs } = req.body;
    const selectedBugsList = selectedBugs;

    // if (selectedBugs.length !== 0) {
      const linesWithBugs = searchLinesWithBugs(selectedQuestion, selectedBugs);
      console.log("These are the final lines with bugs:", linesWithBugs);

      let score = linesWithBugs.length * 10;
      if (selectedBugs.length !== linesWithBugs.length) {
        score -= Math.abs(selectedBugs.length - linesWithBugs.length) * 12;
      }
      console.log("Score:", score);

      res.json({
        selectedBugs,
        linesWithBugs,
        score
      });
    // } else {
    //   res.json({ message: "No bugs selected" });
    // }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { handleSubmit };
