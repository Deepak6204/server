exports.getProfile = (req, res) => {
    res.sendFile(__dirname + '/views/profile.html');
  };