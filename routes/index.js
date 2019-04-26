const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Group = require("../models/Group");
const Belong = require("../models/Belong");


/* GET home page */
router.get('/', ensureLoggedIn('auth/login'), (req, res, next) => {
  Belong.find({idUser: req.user.id})
  .populate('idUser')
  .populate('idGrupo')
  .populate('idService')
  .then((belong) => {
    console.log(req.username)
    res.render('index', {belong, username:req.user.username} );
  });
  
});


module.exports = router;


