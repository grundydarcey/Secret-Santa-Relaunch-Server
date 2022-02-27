/* eslint-disable no-unused-vars */
const express = require('express');
const xss = require('xss');
const path = require('path');
const MembersService = require('./members-service');
const MembersRouter = express.Router();

//const app = express();

const serializeMember = member => ({
  id: member.id,
  member_name: xss(member.member_name),
  member_partner: xss(member.member_partner),
  price: member.price,
  member_picture: xss(member.member_picture),
  group_name: xss(member.group_name)
});

MembersRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    MembersService.getAllMembers(knexInstance)
      .then(members => {
        res.json(members.map(serializeMember));
      })
      .catch(next);
  });

module.exports = MembersRouter;