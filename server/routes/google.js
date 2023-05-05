const router = require("express").Router();
const passport = require("passport");
const { User } = require("../models/user");

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  async (req, res) => {
    try {
      const user = await User.findOne({ googleId: req.user.id });
      if (user) {
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "logged in successfully" });
      } else {
        const newUser = await new User({
          name: req.user.displayName,
          email: req.user.emails[0].value,
          googleId: req.user.id,
        }).save();
        const token = newUser.generateAuthToken();
        res.status(201).send({ data: token, message: "User created successfully" });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

module.exports = router;