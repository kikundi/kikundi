// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Payment = require("../models/Payment");

require('dotenv').config('')


console.log(__dirname);
console.log(process.env.NVM_BIN)

mongoose
  .connect(process.env.MONGO, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let payments = [
  {"idUser":"5cc0adb4ab59ad54e9c094ef","idGrupo":"5cc0a02dc08468446ecdc17d","idGroupLeader":"5cc09c02c2c59b40a14b6d2c","quota":5,"status":"Completed","invoice":"https://pay.stripe.com/receipts/acct_1ES5V9FDLEiRtyVz/ch_1ESrzLFDLEiRtyVzcsouA9od/rcpt_EwlWTcQuHArZe6s4g8PJjgHxbOoiN5c",limitDay : new Date("2019-05-09").toISOString()},
  {"idUser":"5cc0adb4ab59ad54e9c094ef","idGrupo":"5cc0a02dc08468446ecdc17d","idGroupLeader":"5cc09c02c2c59b40a14b6d2c","quota":5,"status":"Pending",limitDay : new Date("2019-05-10").toISOString()},
  {"idUser":"5cc0adb4ab59ad54e9c094ef","idGrupo":"5cc0a02dc08468446ecdc17d","idGroupLeader":"5cc09c02c2c59b40a14b6d2c","quota":5,"status":"Pending",limitDay : new Date("2019-05-15").toISOString()},
  {"idUser":"5cc0adb4ab59ad54e9c094ef","idGrupo":"5cc0a02dc08468446ecdc17d","idGroupLeader":"5cc09c02c2c59b40a14b6d2c","quota":5,"status":"Pending",limitDay : new Date("2019-05-16").toISOString()},
  {"idUser":"5cc0a07ac08468446ecdc17f","idGrupo":"5cc185ce3c6aa541212cb9e1","idGroupLeader":"5cc09c02c2c59b40a14b6d2c","quota":5,"status":"Pending",limitDay : new Date("2019-05-17").toISOString()},
  {"idUser":"5cc0a07ac08468446ecdc17f","idGrupo":"5cc185ce3c6aa541212cb9e1","idGroupLeader":"5cc09c02c2c59b40a14b6d2c","quota":5,"status":"Pending",limitDay : new Date("2019-05-18").toISOString()},
  {"idUser":"5cc0adb4ab59ad54e9c094ef","idGrupo":"5cc18708ee3e67457701de58","idGroupLeader":"5cc09c02c2c59b40a14b6d2c","quota":6,"status":"Pending",limitDay : new Date("2019-05-19").toISOString()},
  {"idUser":"5cc0adb4ab59ad54e9c094ef","idGrupo":"5cc18708ee3e67457701de58","idGroupLeader":"5cc09c02c2c59b40a14b6d2c","quota":6,"status":"Pending",limitDay : new Date("2019-05-20").toISOString()},
  {"idUser":"5cc0a07ac08468446ecdc17f","idGrupo":"5cc18708ee3e67457701de58","idGroupLeader":"5cc09c02c2c59b40a14b6d2c","quota":6,"status":"Pending",limitDay : new Date("2019-05-21").toISOString()},
  {"idUser":"5cc188ebe44a5b46bb632c3b","idGrupo":"5cc18708ee3e67457701de58","idGroupLeader":"5cc09c02c2c59b40a14b6d2c","quota":6,"status":"Pending",limitDay : new Date("2019-05-22").toISOString()},
  {"idUser":"5cc188ebe44a5b46bb632c3b","idGrupo":"5cc18708ee3e67457701de58","idGroupLeader":"5cc09c02c2c59b40a14b6d2c","quota":6,"status":"Pending",limitDay : new Date("2019-05-23").toISOString()}
]

Payment.deleteMany()
.then(() => {
  return Payment.create(payments)
})
.then(paymentsCreated => {
  console.log(`${paymentsCreated.length} users created with the following id:`);
  console.log(paymentsCreated.map(p => p._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})