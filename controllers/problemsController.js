const fs = require('fs');
const fileUtils = require('../utils/fileUtils');

exports.getProblems = (req, res) => {
  fs.readFile('question.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading JSON file');
    }
    res.setHeader('Content-Type', 'application/json');
    console.log(data)
    res.send(data);
  });
};

exports.getProblemById = (req, res) => {
  const problemId = req.params.id;
  fs.readFile('question.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    const problemList = JSON.parse(data);
      const problem = problemList.problems.find(p => p.id === problemId);
    if (problem) {
      res.json(problem);
    } else {
      res.status(404).json({ message: 'Problem not found' });
    }
  });
};