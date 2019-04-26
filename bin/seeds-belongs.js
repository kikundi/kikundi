// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Belong = require("../models/Belong");

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

let belongs = [
  {"idUser":{"$oid":"5cc09c02c2c59b40a14b6d2c"},"idGrupo":{"$0id":"5cc0a02dc08468446ecdc17d","idRole":"Admin" }},
  {"idUser":{"$oid":"5cc0adb4ab59ad54e9c094ef"},"idGrupo":{"$0id":"5cc0a02dc08468446ecdc17d","idRole":"Member"}},
  {"idUser":{"$oid":"5cc0adb4ab59ad54e9c094ef"},"idGrupo":{"$0id":"5cc0a02dc08468446ecdc17d","idRole":"Member"}},
  {"idUser":{"$oid":"5cc09c02c2c59b40a14b6d2c"},"idGrupo":{"$0id":"5cc185ce3c6aa541212cb9e1","idRole":"Admin" }},
  {"idUser":{"$oid":"5cc0a07ac08468446ecdc17f"},"idGrupo":{"$0id":"5cc185ce3c6aa541212cb9e1","idRole":"Member"}},
  {"idUser":{"$oid":"5cc0a07ac08468446ecdc17f"},"idGrupo":{"$0id":"5cc185ce3c6aa541212cb9e1","idRole":"Member"}},
  {"idUser":{"$oid":"5cc09c02c2c59b40a14b6d2c"},"idGrupo":{"$0id":"5cc18708ee3e67457701de58","idRole":"Admin" }},
  {"idUser":{"$oid":"5cc0adb4ab59ad54e9c094ef"},"idGrupo":{"$0id":"5cc18708ee3e67457701de58","idRole":"Member"}},
  {"idUser":{"$oid":"5cc0a07ac08468446ecdc17f"},"idGrupo":{"$0id":"5cc18708ee3e67457701de58","idRole":"Member"}},
  {"idUser":{"$oid":"5cc188ebe44a5b46bb632c3b"},"idGrupo":{"$0id":"5cc18708ee3e67457701de58","idRole":"Member"}}
]

Belong.deleteMany()
.then(() => {
  return Belong.create(belongs)
})
.then(belongsCreated => {
  console.log(`${belongsCreated.length} belongs created with the following id:`);
  console.log(belongsCreated.map(p => p._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})