const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifySignUp } = require("../middlewares");

module.exports = function() {
    router.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    router.post(
        "/signup",
        [
          verifySignUp.checkDuplicateUsername,
        ],
        authController.signup
      );
    router.post("/signin", authController.signin);
    router.patch("/:id", authController.updateSelectedUser);
    router.delete('/:id', authController.deleteCustomerUser);
    return router;
  }