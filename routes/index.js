const express = require('express');
const cors = require('cors');

const router = express.Router();
const problemsController = require('../controllers/problemsController');
const notesController = require('../controllers/notesController');
const profileController = require('../controllers/profileController');
const CodeController = require('../controllers/codeController');
const handleSubmitController = require('../controllers/handleSubmitController')
const userController = require('../controllers/create_user.js');
const { updateScore } = require('../controllers/score_time.js');
const users = require('../controllers/get_users.js');
const { is_eligible } = require('../controllers/is_eligible.js');

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

router.use(cors());
router.get('/problems', problemsController.getProblems);
router.get('/problems/:id', problemsController.getProblemById);
router.get('/notes', notesController.getNotes);
router.get('/profile', profileController.getProfile);
router.post('/execute-code', CodeController.executeCode);
router.post('/handle-submit', handleSubmitController.handleSubmit);
router.post('/api/users', userController.loginUser);
router.post('/update-score', updateScore);
router.get('/get_users', users.getAllUsers);
router.post('/is_eligible', is_eligible)

module.exports = router;