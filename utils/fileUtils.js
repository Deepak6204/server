const fs = require('fs');

exports.readFile = (filePath, callback) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};