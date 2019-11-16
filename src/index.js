// Create express app
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const newsfeedRouter = require('./routers/newsfeed');

app.use('/api', newsfeedRouter);

// Server port
const port = process.env.PORT || 4000;
// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
