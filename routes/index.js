const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Group = require("../models/Group");
const Belong = require("../models/Belong");


/* GET home page */
router.get('/', ensureLoggedIn('auth/login'), (req, res, next) => {
  Belong.find({idUser: req.user.id})
  .populate('idUser')
  .populate({ path: 'idGrupo', populate: { path: 'service', model:'Service' }})
  .then((belong) => {
    res.render('index', {belong});
  });
  
});


module.exports = router;


