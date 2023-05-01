const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "token random text", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/auth");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/auth");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "token random text", async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.locals.user = false;
        next();
      } else {
        let user = await User.findById(decodedToken.user._id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = false;
    next();
  }
};

module.exports = {
  isLoggedIn,
  checkUser,
};
