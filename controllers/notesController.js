exports.getNotes = (req, res) => {
    res.sendFile(__dirname + '/views/notes.html');
  };