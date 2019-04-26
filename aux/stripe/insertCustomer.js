// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
require('dotenv').config({path: __dirname + '/.env'})

const stripeSecret = process.env.STRIPE_KEYSECRET;
const stripeMailRcpt = process.env.STRIPE_MAILRECEIPT;

var stripe = require("stripe")(`${stripeSecret}`);
console.log(stripeSecret);

function createStripeCharge(amount ){
  stripe.charges.create({
    amount: amount,
    currency: 'eur',
    source: 'tok_visa',
    receipt_email: `${stripeMailRcpt}`
  }).then(
    charge => {console.log(charge)}
  )
};

function createStripeCustomer(customerData){
  stripe.tokens.create({
    card: {
      number: customerData.cardNumber,
      exp_month: customerData.cardMonth,
      exp_year: customerData.cardYear
    }
  })
/*   .then(token =>{
    stripe.customers.create({
      description: 'Customer for ' + customerData.email,
      source: token.id , 
      email: customerData.email ,
      name: customerData.username,
      phone: customerData.phone
    })
    .then( customer => { 
      console.log(customer.name);
      console.log( token.id);}    )
  
  }) */
}




var CustomerData = {
  username: "Customer01",
  email:"federuiz.entrepatios@gmail.com",
  phone: "+34660582994",
  cardName: "Federico Ruiz Ruiz",
  cardNumber: "4000056655665556",
  cardMonth: 09,
  cardYear: 2020
}
var newCustomer = createStripeCustomer(CustomerData);














/* customer => {
  stripe.customers.createSource({
    //Card data
    customer: customer.id,
    source:{
            name: customer.name,
            number: customer.cardNumber,
            exp_month: customer.cardMonth,
            exp_year: customer.cardYear,
            currency:"eur"
           }
  }).then(card => { console.log(card)})
} */


/* 


stripe.customers.createSource(
  'cus_EwIVM6lhK8CD8n',
  {
    source: 'tok_visa',
  },
  function(err, card) {
    // asynchronously called
  }
); */