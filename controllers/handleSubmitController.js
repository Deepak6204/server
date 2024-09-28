const searchLinesWithBugs = (question, bugIds) => {
  return question.code
    .map((line, index) => ({
      line: line.line,
      hasBug: line.hasBug,
      index: index
    }))
    .filter(lineObj => lineObj.hasBug && bugIds.includes(lineObj.index))
    .map(lineObj => lineObj.line);
};

const handleSubmit = async (req, res) => {
  try {
    const { selectedQuestion, selectedBugs , elapsed_time,selectedRound,firebaseId} = req.body;
    
    const allBugLines = selectedQuestion.code
      .map((line, index) => (line.hasBug ? index : null))
      .filter(index => index !== null); 

    const linesWithBugs = searchLinesWithBugs(selectedQuestion, selectedBugs);

    const correctBugs = selectedBugs.filter(bugId => allBugLines.includes(bugId));
    const missedBugs = allBugLines.filter(bugId => !selectedBugs.includes(bugId));
    const incorrectBugs = selectedBugs.filter(bugId => !allBugLines.includes(bugId));

    let score = correctBugs.length * 10; 

    score -= (missedBugs.length + incorrectBugs.length) * 12;
    const data = { firebaseId, selectedRound, score, elapsed_time };

    try {
      const response = await fetch('http://localhost:5000/update-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the data as JSON
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Score updated successfully:', result);
      } else {
        console.error('Error updating score:', result.message);
      }
    } catch (error) {
      console.error('Error in request:', error);
    }

    // console.log("Correct Bugs:", correctBugs);
    // console.log("Missed Bugs:", missedBugs);
    // console.log("Incorrect Selections:", incorrectBugs);
    // console.log("Final Score:", score);
    // console.log("final time:", elapsed_time)

    res.json({
      selectedBugs,
      correctBugs,
      missedBugs,
      incorrectBugs,
      linesWithBugs,
      score
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { handleSubmit };
