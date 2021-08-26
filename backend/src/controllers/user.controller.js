const User = require('../models/user.model');       //import user model
const Role = require('../models/role.model');       //import role model
  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content");
  };
  
  exports.userBoard = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.findOne(
        {
          _id: user.role 
        },
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          res.status(200).send({ role });
          return;
        }
      );
    });
  };
  
  
  