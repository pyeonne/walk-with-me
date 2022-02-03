require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.URI;

mongoose.connect(URI).then(() => console.log('MongoDB is connected'));

app.use(express.json());
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
