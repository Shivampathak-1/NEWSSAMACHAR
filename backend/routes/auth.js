const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fetchUser = require("./middleware/fetchUser")

const { body, validationResult } = require("express-validator");

const jwt_sign = "jaishreeram";

// endpoint for creating a user /auth/signup
router.post(
  "/signup",
  [
    body("email").isEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password should at least contain 8 characters."),
    body("mobile")
      .isLength({ min: 10, max: 13 })
      .withMessage("Please enter correct mobile number."),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(401).send({ errors: err.array() });
      return;
    }
    try {
      const salt = await bcryptjs.genSalt(6);
      const secPass = await bcryptjs.hash(req.body.password, salt);
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        gender: req.body.gender,
        password: secPass,
        profile_image: req.body.profile_image,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_sign);

      res.send({ message: "Registered Successfully", authtoken });
    } catch (err) {
      res.status(400).send({ message: err.message });
      return;
    }
  }
);

// endpoint for creating a user /auth/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format."),
    body("password").notEmpty().withMessage("Password cannot be blank."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log("Login request received. Body:", req.body);

    try {
      // Check if the user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password." });
      }

      // Compare password
      const passwordCompare = await bcryptjs.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid email or password." });
      }

      // Generate auth token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_sign);

      // Send success response
      return res.json({ message: "Logged in successfully", authtoken });
    } catch (err) {
      console.error(err.message); // Log the error for debugging
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);


router.post("/fetchUser",fetchUser ,async (req, res) =>{
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);

  } catch (err) {
    res.status(400).send({ message: err.message });
    return;
  }
})

module.exports = router;
