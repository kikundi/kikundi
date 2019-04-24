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
  {
    idUser: 'iduser01',
    idGrupo: 'idgroup01',	
    groupLeader: 'iduser02',
    quota: 10,
    status: 'Pending',
    limitDay : new Date("2019-05-10").toISOString(),
    invoice: ""
  },
  {
    idUser: 'iduser03',
    idGrupo: 'idgroup02',	
    groupLeader: 'iduser04',
    quota: 15,
    status: 'Pending',
    limitDay : new Date("2019-05-02"),
    invoice: ""
  },
  {
    idUser: 'iduser04',
    idGrupo: 'idgroup01',	
    groupLeader: 'iduser02',
    quota: 10,
    status: 'Pending',
    limitDay : new Date("2019-05-03").toISOString(),
    invoice: ""
  },  
  {
    idUser: 'iduser05',
    idGrupo: 'idgroup01',	
    groupLeader: 'iduser02',
    quota: 10,
    status: 'Pending',
    limitDay : new Date("2019-05-04").toISOString(),
    invoice: ""
  }
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