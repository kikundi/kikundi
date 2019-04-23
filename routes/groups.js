const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get('/tribe', (req, res, next) => {
  res.render('group/group');
});

router.get('/create-new-tribe', (req, res, next) => {
  res.render('group/newGroup');
});

router.get('/search-tribes', (req, res, next) => {
  res.render('group/searchGroups');
});

module.exports = router;