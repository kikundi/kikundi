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

let services = [
  {
    name: "Netflix",
    picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0wW-0Pc652eZO4HoRmID4ViwLJ1sl4mU4ZikYtFnl6FtjYcFz"
  },
  {
    name: "Spotify",
    picture: "https://developer.spotify.com/assets/branding-guidelines/icon1@2x.png"
  },
  {
    name: "Movistar",
    picture: "https://ferialplaza.es/wp-content/uploads/2018/06/logo-movistar.jpg"
  },
  {
    name: "HBO",
    picture: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052012/hbo.png?itok=SY1aEhtQ"
  },
  {
    name: "beIn Sport",
    picture: "https://seeklogo.com/images/B/bein-sport-1-logo-9DADBC761B-seeklogo.com.png"
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

/* let roles = [
  {
    name: "Admin",
    picture: "img1"
  },
  {
    name: "Member",
    picture: "img2"
  }
]; */

/* Role.deleteMany()
.then(() => {
  return Role.create(roles)
})
.then(() => {
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
}) */