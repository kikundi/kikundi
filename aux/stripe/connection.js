// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
require('dotenv').config();
const stripeSecret = `${process.env.STRIPE_SECRET}`;
const stripeMailRcpt = `${process.env.STRIPE_MAILRECEIPT}`

var stripe = require("stripe")(`${stripeSecret}`);
console.log(stripeSecret);

(async () => {
  const charge = await stripe.charges.create({
    amount: 999,
    currency: 'eur',
    source: 'tok_visa',
    receipt_email: `${stripeMailRcpt}`
  }).then(
    charge => {console.log(charge)}
  );
})();