const express = require('express');
const xss = require('xss');
//const path = require('path');
const ListsService = require('./lists-service');
const ListsRouter = express.Router();

const serializeList = list => ({
  id: list.id,
  users_id: list.users_id,
  link: xss(list.link)
});

ListsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    ListsService.getAllLists(knexInstance)
      .then(lists => {
        res.json(lists.map(serializeList));
      })
      .catch(next);
  });

module.exports = ListsRouter;