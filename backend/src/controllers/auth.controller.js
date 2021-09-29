const config = require("../config/auth.config");
const User = require('../models/user.model');       //import user model
const Role = require('../models/role.model');       //import role model
const mongoose = require("mongoose");

var jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const user = new User({
    userName: req.body.userName,
    password: req.body.password
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.role) {
      Role.findOne(
        {
          name: req.body.role
        },
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.role = role._id;
          
          user.save()
            .then(data => {
              res.status(200).send({ message: "User was registered successfully!", data: data });
              console.log("User: ", data);
            })
            .catch(error => {
              res.status(500).send({ error: error.message });
            });
        }
      );
    } else {
      Role.findOne({ name: "customer" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.role = role._id;
        user.save()
          .then(data => {
            res.status(200).send({ message: "User was registered successfully!", data: data });
            console.log("User: ", data);
          })
          .catch(error => {
            res.status(500).send({ error: error.message });
          });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    userName: req.body.userName,
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if (req.body.password.localeCompare(user.password)) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        userName: user.userName,
        role: user.role,
        pic: user.pic,
        accessToken: token
      });
    });
};

exports.deleteCustomerUser = async (req, res) => {              
  if (req.params && req.params.id) {
      const {id} = req.params;            
      if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);       
      await User.findByIdAndRemove(id);        
      res.json({message: "User deleted successfully."});
  }
}

exports.updateSelectedUser = async (req, res) => {
  if (req.params && req.params.id) {
      const { id } = req.params;
      const user = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user With that id');
      const updatedUser = await User.findByIdAndUpdate(id, {$set: {
          password: user.password,
      }});
      res.json(updatedUser);
  }
}