/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
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

ListsRouter
  .route(':/users_id')
  .all((req, res, next) => {
    ListsService.getByUserId(
      req.app.get('db'),
      req.params.users_id
    )
      .then(lists => {
        if (!lists) {
          return res.status(404).json({
            error: { message: `No items in users list` }
          });
        }
        res.lists = lists;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeList(res.lists));
  });

module.exports = ListsRouter;