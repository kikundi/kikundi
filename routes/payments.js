const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const bodyParser   = require('body-parser');
require('dotenv').config('');
const stripeSecret = process.env.STRIPE_KEYSECRET;
const stripeMailRcpt = process.env.STRIPE_MAILRECEIPT;
var stripe = require("stripe")(`${stripeSecret}`);


//All the payments
router.get('/payments', (req, res, next) => {
  Payment.find({}).then(payments => {
    res.json(payments);
  })
  ;
});

//New payment test screen
router.get('/payments/create', (req, res, next) => {
  res.render('payments/create');
});

//New payment
router.post('/payments/create', (req, res, next) => {
  let { idUser, idGrupo, groupLeader, quota, status } = req.body;
  const newPayment = new Payment({ idUser, idGrupo, groupLeader, quota, status })
  newPayment.save()
    .then((payments) => {
      res.redirect('/payments');
    })
    .catch((error) => {
      console.log(error);
    })
});

//execute payment
router.post('/payments/execute', (req, res, next) => {
  Payment.findById(req.body.idPayment).then( paymentToExec => {
    console.log('Pagado!');
    stripe.tokens.create({
      card:{
        number: req.body.cardNumber,
        exp_month: req.body.cardMonth,
        exp_year: req.body.cardYear}})
      .then(token =>{
        console.log('Token!');
        console.log(token);
        stripe.charges.create({
          amount: req.body.paymentAmount * 100 ,
          currency: 'eur',
          source: token.id ,
          receipt_email: `${stripeMailRcpt}`
        }).then(charge => {
            Payment.findByIdAndUpdate(req.body.idPayment , {status: 'Completed', invoice:charge.receipt_url})
            .then((paymentProcesed)=>{res.redirect('/payments');
            });
          }
        )
      })
  }).catch(
    err => {console.log()}
  );
});

/* router.post('/payments/:idpayment/execute', (req, res, next) => {
  Payment.findByIdAndUpdate(req.body.idPayment , {status: 'Completed'})
  .then((paymentProcesed)=>{
    res.redirect('/payments');
  })
}); */

//reject payment
router.post('/payments/reject', (req, res, next) => {
  Payment.findByIdAndUpdate(req.body.idPayment , {status: 'Rejected'})
  .then((paymentProcesed)=>{
    res.redirect('/payments');
  })
});

module.exports = router;