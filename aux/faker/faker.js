const bcrypt = require('bcrypt');
const faker = require('faker');

const a = new Array(50).fill(null)
  .map(e =>
    e = ({ username: faker.name.findName(), password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)), email:faker.internet.email()}))

console.log(a)