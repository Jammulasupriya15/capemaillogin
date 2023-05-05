require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// passport setup
app.use(passport.initialize());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // This function will be called when the user has successfully authenticated with Google
      // You can use the profile information to create a new user account, or authenticate an existing user
      // Once you have authenticated the user, call the `done` function with the user object
      console.log(profile);
      done(null, profile);
    }
  )
);

// routes
app.use("/api/users", userRoutes);

// Google authentication routes
app.get(
    "/api/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      // This function will be called when the user has successfully authenticated with Google
      // You can generate a JWT token here, and send it back to the client to authenticate the user
      res.json({ message: "Google login successful", user: req.user });
    }
  );
  

app.use("/api/auth", authRoutes);


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));