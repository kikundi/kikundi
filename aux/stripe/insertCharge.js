require('dotenv').config({path: __dirname + '/.env'})

const stripeSecret = process.env.STRIPE_KEYSECRET;
const stripeMailRcpt = process.env.STRIPE_MAILRECEIPT;

console.log(stripeSecret);

var stripe = require("stripe")(`${stripeSecret}`);

function createStripeCharge(token, amount ){
  stripe.charges.create({
    amount: amount * 100 ,
    currency: 'eur',
    source: token ,
    receipt_email: `${stripeMailRcpt}`
  }).then(
    charge => {console.log(charge)}
  )
};




function createStripeCharge(customerData, amount){
  stripe.tokens.create({
    card: {
      number: customerData.cardNumber,
      exp_month: customerData.cardMonth,
      exp_year: customerData.cardYear
    }
  }).then(token =>{
    stripe.charges.create({
      amount: amount * 100 ,
      currency: 'eur',
      source: token.id ,
      receipt_email: `${stripeMailRcpt}`
    }).then(
      charge => {console.log(charge)}
    )
  
  })
}


var CustomerData = {
  id:"cus_EwN12iZVY4RfQm",
  username: "Customer01",
  email:"federuiz.entrepatios@gmail.com",
  phone: "+34660582994",
  cardName: "Federico Ruiz Ruiz",
  cardNumber: "4000056655665556",
  cardMonth: 09,
  cardYear: 2020
}

createStripeCharge( CustomerData , 150.00 );