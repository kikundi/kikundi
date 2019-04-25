const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require("../models/User");
const Group = require("../models/Group");
const Service = require("../models/Service");
const Belong = require("../models/Belong");
const Payment = require("../models/Payment");
const Role = require("../models/Role");
const Notification = require("../models/Notification");


//create new tribe
router.get('/create-new-tribe', ensureLoggedIn('auth/login'), (req, res, next) => {
  Service.find()
  .then((services) => {
    res.render('group/newGroup', {services});
  })
  .catch((err) => {
    next(err);
  });
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
  });
  group.save()
  .then((grupo) => {
    let belong = new Belong({
      idUser: req.user.id,
      idGrupo: grupo._id,
      idRole: "Admin"
    });
    belong.save()
    .then()
    .catch((err) => {
    next(err);
    });
    
    res.redirect('/');
  })
  .catch((err) => {
    next(err);
  });
 });


//search tribes 
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

//roles
function checkMembership() {
	return (req, res, next) => {
    return Belong.find({idGrupo: {$eq: req.params.groupid}})
    .populate('idUser')
    .then((belong) => {
      const result = belong.filter(user => {
        return user.idUser.id === req.user.id;
      });
     if(result.length === 0){
       req.role = "none";
     }else {
       req.role = result[0].idRole;
     }
     return next();
    }); 
	};
}

//tribe page 
router.post('/group/:groupid', ensureLoggedIn('auth/login'), checkMembership(), (req, res, next) => {
  Group.findById(req.params.groupid)
  .populate('leader')
  .populate('service')
  .then((group) => {
    Belong.find({$and:[{idGrupo: group._id},{idRole:'Member'}]})
    .populate('idUser')
    .then(belong => {
      Notification.find({idGroup: {$eq: group._id}})
      .populate('idUserFrom')
      .populate('idGroup')
      .then((notifications) => {
        Payment.find({idGroup: {$eq: group._id}})
        .populate('idUser')
        .populate('idGroupLeader')
        .populate('idGrupo')
        .then(payments => {
          console.log(payments);
          res.render('group/group', {notifications, group, user:req.role, belong, payments})
        })
        
      });
    })
    .catch((err) => {
      next(err);
    });
  })
  .catch((err) => {
    next(err);
  });
});

//Only for testing
router.get('/group/:groupid', (req, res, next) => {
  Group.findById(req.params.groupid)
  .populate('leader')
  .populate('service')
  .then((group) => {
    Belong.find({$and:[{idGrupo: group._id},{idRole:'Member'}]})
    .populate('idUser')
    .then(belong => {
      console.log("belong");
      console.log(belong);
      Notification.find({idGroup: {$eq: group._id}})
      .populate('idUserFrom')
      .populate('idGroup')
      .then((notifications) => {
        Payment.find({idGrupo: {$eq: group._id}})
        .populate('idUser')
        .populate('idGroupLeader')
        .populate('idGrupo')
        .then(payments => {
          console.log("Payments");
          console.log(payments);
          res.render('group/group', {notifications, group, user:req.role, belong, payments})
        })
        
      });
    })
    .catch((err) => {
      next(err);
    });
  })
  .catch((err) => {
    next(err);
  });
});

//send request for entry in a tribe
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
    .then(() => {
      res.redirect("/search-tribes");
    })
    .catch((err) => {
      next(err);
    });
  })
  .catch((err) => {
    next(err);
  });
});

//add member 
router.post('/addMember/:userid/:groupid/:notificationid', (req, res, next) => {
  let belong = new Belong({
    idUser: req.params.userid,
    idGrupo: req.params.groupid,
    idRole: "Member"
  });
  belong.save()
  .then(() => {
    Group.findByIdAndUpdate(req.params.groupid, {$inc: {freePlace:-1}}, {new:true})
    .then(() => {   
        Notification.findByIdAndRemove(req.params.notificationid)
        .then(
          res.redirect(`/payments/create/${req.params.userid}/${req.params.groupid}`)          
          )
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
  })
  .catch((err) => {
    next(err);
  });
});

//decline request
router.post('/declineMember/:notificationid', (req, res, next) => {
  Notification.findByIdAndRemove(req.params.notificationid)
  .then(() => {
    res.redirect("/search-tribes");
  })
  .catch((err) => {
    next(err);
  });
});

//remove a member
router.post('/removeMember/:belongid/:grupoid', (req, res, next) => {
  Belong.findByIdAndRemove(req.params.belongid)
  .then(() => {
    Group.findByIdAndUpdate(req.params.grupoid, {$inc: {freePlace:+1}}, {new:true})
    .then(() => {
      res.redirect("/search-tribes");
    })
    .catch((err) => {
      next(err);
    });
  })
  .catch((err) => {
    next(err);
  });
});

//delete group
router.post('/deleteGroup/:groupid', (req, res, next) => {
  Group.findByIdAndRemove(req.params.groupid)
  .then(() => {
    res.redirect("/search-tribes");
  })
  .catch((err) => {
    next(err);
  });
  Belong.deleteMany({idGrupo:{$eq:req.params.groupid}})
  .then()
  .catch((err) => {
    next(err);
  });
});

module.exports = router;