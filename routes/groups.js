const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require("../models/User");
const Group = require("../models/Group");
const Service = require("../models/Service");
const Belong = require("../models/Belong");
const Role = require("../models/Role");
const Notification = require("../models/Notification");


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
  let pricePerson = req.body.pricePerson;
  let description = req.body.description;

  let group = new Group({
     name,
     leader: req.user.id,
     service,
     members,
     freePlace,
     pricePerson,
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

router.get('/search-tribes', ensureLoggedIn('auth/login'), (req, res, next) => {
  Group.find({ freePlace: { $gt: 0 }})
  .populate('leader')
  .populate('service')
  .then((groups) => {
    res.render('group/searchGroups', {groups});
  })
  .catch((err) => {
    next(err);
  });
});

router.post('/group/:groupid', ensureLoggedIn('auth/login'), (req, res, next) => {
  Group.findById(req.params.groupid)
  .populate('leader')
  .populate('service')
  .then((group) => {
    res.render('group/group', group);
  })
  .catch((err) => {
    next(err);
  });
});

router.post('/sendRequest/:groupid', (req, res, next) => {
  Group.findById(req.params.groupid)
  .then((group) => {
    let status = "Request";
    let notification = new Notification({
      idUserFrom: req.user.id,
      idUserTo: group.leader,
      idGroup: group._id,
      status: status
    });
    notification.save()
    .then()
    .catch((err) => {
      next(err);
    });
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;