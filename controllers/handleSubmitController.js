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
    var { selectedQuestion, selectedBugs , elapsed_time,selectedRound,firebaseId, final_submit,score} = req.body;
    
    const allBugLines = selectedQuestion.code
      .map((line, index) => (line.hasBug ? index : null))
      .filter(index => index !== null); 

    const linesWithBugs = searchLinesWithBugs(selectedQuestion, selectedBugs);

    const correctBugs = selectedBugs.filter(bugId => allBugLines.includes(bugId));
    const missedBugs = allBugLines.filter(bugId => !selectedBugs.includes(bugId));
    const incorrectBugs = selectedBugs.filter(bugId => !allBugLines.includes(bugId));

    score += (correctBugs.length * 10);

    score -= (incorrectBugs.length * 2);
    if(final_submit){
      const data = { firebaseId, selectedRound, score, elapsed_time };
      try {
        const response = await fetch('https://server-jt5f.onrender.com/is_eligible', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ round,firebaseId}),
      });
  
      const result = await response.json();
  
      if(result.attempt === false){
        res.status(200).JSON({ message: 'User already participated' })
        return 0;
      }
    } catch {
    }
      try {
        const response = await fetch('https://server-jt5f.onrender.com/update-score', {
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

    }

    res.json({
      selectedBugs,
      correctBugs,
      missedBugs,
      incorrectBugs,
      linesWithBugs,
      elapsed_time,
      score
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { handleSubmit };
