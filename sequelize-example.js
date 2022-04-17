const sequelize = require("./lib/sequelize");

const User = require("./models/User");
const Address = require("./models/Address");

let userID = null;

sequelize
  .sync()
  .then(() => {
    return User.create({
      full_name: "Person",
      email: "person@mail.com",
      password: "password",
    });
  })
  .then((user) => {
    //@ts-ignore
    userID = user.id;
    console.log(`User created: ${user}`);
    // despite warnings, this works.
    //@ts-ignore
    return user.createAddress({
      address: "Jalan Kelapa Sawit",
      postcode: 41823,
    });
  })
  .then((address) => {
    console.log(`Address is ${address}`);
    return Address.findAll({ where: userID });
  })
  .then((addresses) => {
    console.log(`All the addresses are: ${addresses.toString()}`);
  })
  .catch((err) => {
    console.error(err);
  });
