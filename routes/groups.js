const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require("../models/User");
const Group = require("../models/Group");


router.get('/tribe', (req, res, next) => {
  res.render('group/group');
});

router.get('/create-new-tribe', (req, res, next) => {
  // Service.find()
  // .then()
  res.render('group/newGroup');
});

router.post('/create-new-tribe', (req,res,next) => {
  let name = req.body.name;
  let services = req.body.services;
  let members = req.body.members;
  let price = req.body.price;
  let description = req.body.description;

  let group = new Group({
     name,
     leader: req.user.id,
     services,
     members,
     price,
     description
  })
  group.save()
  .then(res.redirect('/'));
 });

router.get('/search-tribes', (req, res, next) => {
  res.render('group/searchGroups');
});

module.exports = router;