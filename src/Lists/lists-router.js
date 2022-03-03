/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
const express = require('express');
const xss = require('xss');
const path = require('path');
const ListsService = require('./lists-service');
const ListsRouter = express.Router();
const jsonParser = express.json();

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
  })
  .post(jsonParser, (req, res, next) => {
    const { link } = req.body;
    const newItem = { link };
    for (const [key, value] of Object.entries(newItem))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });

    ListsService.insertMember(
      req.app.get('db'),
      newItem
    )
      .then(item => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${item.id}`))
          .json(serializeList(item));
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
      .then(list => {
        if (!list) {
          return res.status(404).json({
            error: { message: `No items in users list` }
          });
        }
        res.list = list;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeList(res.list));
  });

module.exports = ListsRouter;