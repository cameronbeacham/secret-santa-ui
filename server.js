const express = require('express');
const path = require('path');
const app = express();

// Serve static files....
app.use(express.static(__dirname + '/dist/secret-santa-ui'));

// Send all requests to index.html
app.get('/secret-santa/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/secret-santa-ui/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);