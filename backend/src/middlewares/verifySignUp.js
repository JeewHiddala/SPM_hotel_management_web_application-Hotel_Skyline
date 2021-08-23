/*const ROLES = ["customer", "manager", "kitchen", "reception"];*/
const User = require('../models/user.model');       //import user model

checkDuplicateUsername = (req, res, next) => {
  // userName
  User.findOne({
    userName: req.body.userName
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! username is already in use!" });
      console.log(user);
      return;
    }
    next();
  });
};

const verifySignUp = {
    checkDuplicateUsername
};
  
module.exports = verifySignUp;