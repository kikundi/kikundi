// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Service = require("../models/Service");
const Role = require("../models/Role");
const Belong = require("../models/Belong");

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

let services = [
  {
    name: "Netflix",
    picture: "https://res.cloudinary.com/dviu0dsxd/image/upload/v1556221019/kikundi-logos/logo_Netflix_exbwex.png"
  },
  {
    name: "Spotify",
    picture: "https://res.cloudinary.com/dviu0dsxd/image/upload/v1556221019/kikundi-logos/logo_Spotify_x3slvl.png"
  },
  {
    name: "Movistar",
    picture: "https://res.cloudinary.com/dviu0dsxd/image/upload/v1556221019/kikundi-logos/logo_Movistar_wmlq5u.png"
  },
  {
    name: "HBO",
    picture: "https://res.cloudinary.com/dviu0dsxd/image/upload/v1556221019/kikundi-logos/logo_Hbo_qsgmmr.png"
  },
  {
    name: "beIn Sport",
    picture: "https://res.cloudinary.com/dviu0dsxd/image/upload/v1556221019/kikundi-logos/logo_Bein_g1wyik.png"
  }
];

Service.deleteMany()
.then(() => {
  return Service.create(services)
})
.then(() => {
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})

// let belongs = [
//   {
//   idUser: '5cbf23ba1612325412183f5c',
//   idGrupo: '5cc183c4e339440dbf0dd9f2',	
//   idRole: 'Member'
//   },
//   {
//   idUser: '5cc07f5f5bbe001b0fbc387c',
//   idGrupo: '5cc183c4e339440dbf0dd9f2',	
//   idRole: 'Member'
//   }
// ];

// Service.deleteMany()
// .then(() => {
//   return 
// })
// Belong.create(belongs)
// .then(() => {
//   console.log("success")
//   mongoose.disconnect();
// })
// .catch(err => {
//   console.log(err)
//   mongoose.disconnect()
//   throw err
// })


// let belongs = [
//   {
//   idUser: '5cbf23ba1612325412183f5c',
//   idGrupo: '5cc183c4e339440dbf0dd9f2',	
//   idRole: 'Member'
//   },
//   {
//   idUser: '5cc07f5f5bbe001b0fbc387c',
//   idGrupo: '5cc183c4e339440dbf0dd9f2',	
//   idRole: 'Member'
//   }
// ]; */

// .then(() => {
//   console.log("success")
//   mongoose.disconnect();
// })
// .catch(err => {
//   console.log(err)
//   mongoose.disconnect()
//   throw err
// })


