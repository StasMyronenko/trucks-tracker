const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const { apiRouter } = require('./api/apiRouter');

require('dotenv').config();

const app = express();

mongoose.connect('mongodb+srv://admin:admin@epamhw3.zn9dcus.mongodb.net/?retryWrites=true&w=majority');

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api', apiRouter);

const start = () => {
  try {
    app.listen(process.env.PORT);
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
};

start();

function errorHandler(err, req, res, next) {
  res.status(500).send({ message: `Server error: ${err}` });
  next();
}

app.use(errorHandler);
