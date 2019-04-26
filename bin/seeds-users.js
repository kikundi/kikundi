// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

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

let users = [
  {"status":"Pending confirmation","username":"user01","password":"$2b$10$/40kZmBdt2Bs4Vo4Ot1fjecKfAWSN.A3VasJhSFI0GA9aC3o0LZ12","email":"kikundiapp@gmail.com","phone":"+34660582994","cardNumber":"4000056655665556","cardName":"User01 Test","cardMonth":1,"cardYear":2020},
  {"status":"Pending confirmation","username":"user03","password":"$2b$10$Yxyfw6y0l6yHFYDnS1LhVeDWNC8srwMqBpIrpTbUN8eXXDkoh8XC6","email":"kikundiapp@gmail.com","phone":"+34660582994","cardNumber":"4000056655665556","cardName":"User03 Test","cardMonth":1,"cardYear":2020},
  {"status":"Pending confirmation","username":"user02","password":"$2b$10$QmDbB2Um/FcvB9i0S4KKjuevGQjO8FLthn4MCcwawAMM3UF15Fh7K","email":"kikundiapp@gmail.com","phone":"+34660582994","cardNumber":"4000056655665556","cardName":"User02 Test","cardMonth":3,"cardYear":2020},
  {"status":"Pending confirmation","username":"user04","password":"$2b$10$jbdN7JtfcJMVEu7BP75eZex87sUIL3qldmu/aF1DsIDcJXXfAgvFO","email":"kikundiapp@gmail.com","phone":"+34660582994","cardNumber":"4000056655665556","cardName":"User04 Test","cardMonth":3,"cardYear":2020},
  {"status":"Pending confirmation","username":"user05","password":"$2b$10$a9/dspgmq.oUYbQKI1C4qufSUd2oPE6F0STkL26m5oXK6HXhapmiy","email":"kikundiapp@gmail.com","phone":"+34660582994","cardNumber":"4000056655665556","cardName":"User05 Test","cardMonth":4,"cardYear":2020},
  {"status":"Pending confirmation","username":"user06","password":"$2b$10$y4lAKu3RLBw8Vab08UY0mOYeAeb7IvUfSo4iZZ4isaHbRWcnJqswu","email":"kikundiapp@gmail.com","phone":"+34660582994","cardNumber":"4000056655665556","cardName":"User06 Test","cardMonth":5,"cardYear":2021},
  {"status":"Pending confirmation","username":"user07","password":"$2b$10$1Pn0TzFPA5OAInnxI4zWbeK6EldFkG1I1RH6SsIC/tDQXPl3.gMXu","email":"kikundiapp@gmail.com","phone":"+34660582994","cardNumber":"4000056655665556","cardName":"User07 Test","cardMonth":9,"cardYear":2024},
  {"status":"Pending confirmation","username":"user08","password":"$2b$10$2M.vXjsDDMTXkBDrowuqYe4WvPZG3kaLvZlYVfBvP4/IPiVJmkFrG","email":"kikundiapp@gmail.com","phone":"+34660582994","cardNumber":"4000056655665556","cardName":"User08 Test","cardMonth":8,"cardYear":2024},
  {"status":"Pending confirmation","username":"user09","password":"$2b$10$3/sNcHsG2ts/Y4wtHUH0..RXsWDe5jwRmNB1H3AUv1hnGYYuFFGye","email":"kikundiapp@gmail.com","phone":"+34660582994","cardNumber":"4000056655665556","cardName":"User09 Test","cardMonth":9,"cardYear":2024},
  {"status":"Pending confirmation","username":"user10","password":"$2b$10$GIPe20qH6PNStSGIB.Nc0OGbzGFjLI6tRT2w3KVmpn.SmJYyk/VT.","email":"kikundiapp@gmail.com","phone":"+34660582994","cardNumber":"4000056655665556","cardName":"User10 Test","cardMonth":10,"cardYear":2023}
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(p => p._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})