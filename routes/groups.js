const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require("../models/User");
const Group = require("../models/Group");
const Service = require("../models/Service");
const Belong = require("../models/Belong");
const Role = require("../models/Role");


router.get('/tribe', ensureLoggedIn('auth/login'), (req, res, next) => {
  res.render('group/group');
});

router.get('/create-new-tribe', ensureLoggedIn('auth/login'), (req, res, next) => {
  Service.find()
  .then((services) => {
    res.render('group/newGroup', {services});
  })
  .catch((err) => {
    next(err);
  })
});

router.post('/create-new-tribe', (req,res,next) => {
  let name = req.body.name;
  let service = req.body.services;
  let members = req.body.members;
  let freePlace = members; 
  let price = req.body.price;
  let description = req.body.description;

  let group = new Group({
     name,
     leader: req.user.id,
     service,
     members,
     freePlace,
     price,
     description
  })
  group.save()
  .then((grupo) => {
    Role.findOne({name: "Admin"})
    .then((role) => {

      let belong = new Belong({
        idUser: req.user.id,
        idGrupo: grupo._id,
        idRole: role._id
      })
      belong.save()
      .then()
      .catch((err) => {
      next(err);
      });
      
      res.redirect('/')
    });
  })
  .catch((err) => {
    next(err);
  });


 });

router.get('/search-tribes', (req, res, next) => {
  res.render('group/searchGroups');
});

module.exports = router;