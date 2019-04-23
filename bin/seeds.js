// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Service = require("../models/Service");
const Role = require("../models/Role");

const bcryptSalt = 10;

require('dotenv').config();

mongoose
  .connect(process.env.MONGO, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

// let users = [
//   {
//     username: "alice",
//     password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
//   },
//   {
//     username: "bob",
//     password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
//   }
// ]

// User.deleteMany()
// .then(() => {
//   return User.create(users)
// })
// .then(usersCreated => {
//   console.log(`${usersCreated.length} users created with the following id:`);
//   console.log(usersCreated.map(u => u._id));
// })
// .then(() => {
//   // Close properly the connection to Mongoose
//   mongoose.disconnect()
// })
// .catch(err => {
//   mongoose.disconnect()
//   throw err
// })

// let services = [
//   {
//     name: "Netflix",
//     picture: "img1"
//   },
//   {
//     name: "Spotify",
//     picture: "img2"
//   },
//   {
//     name: "Movistar",
//     picture: "img3"
//   },
//   {
//     name: "HBO",
//     picture: "img4"
//   },
//   {
//     name: "beIn Sport",
//     picture: "img5"
//   }
// ];

// Service.deleteMany()
// .then(() => {
//   return Service.create(services)
// })
// .then(() => {
//   mongoose.disconnect()
// })
// .catch(err => {
//   mongoose.disconnect()
//   throw err
// })

let roles = [
  {
    name: "Admin",
    picture: "img1"
  },
  {
    name: "Member",
    picture: "img2"
  }
];

Role.deleteMany()
.then(() => {
  return Role.create(roles)
})
.then(() => {
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})