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

// eslint-disable-next-line no-undef
app.listen(process.env.PORT);

function errorHandler(err, req, res, next) {
  res.status(500).send({ message: `Server error: ${err}` });
  next();
}

app.use(errorHandler);
