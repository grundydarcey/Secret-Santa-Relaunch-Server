/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const MembersRouter = require('./Members/members-router');
const MembersService = require('./Members/members-service');
const ListsRouter = require('./Lists/lists-router');
const ListsService = require('./Lists/lists-service');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/members', MembersRouter);
app.use('/lists', ListsRouter);

// app.get('/members', (req, res, next) => {
//   const knexInstance = req.app.get('db');
//   MembersService.getAllMembers(knexInstance)
//     .then(members => {
//       res.json(members);
//     })
//     .catch(next);
// });

// app.get('/lists', (req, res, next) => {
//   const knexInstance = req.app.get('db');
//   ListsService.getAllLists(knexInstance)
//     .then(lists => {
//       res.json(lists);
//     })
//     .catch(next);
// });

app.get('/', (req, res) => {
  res.send('Hello, Santa!');
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;