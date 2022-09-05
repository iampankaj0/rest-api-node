const express = require("express");
const mongoose = require("mongoose");
const Model = require("../model/model")

const router = express.Router();

// register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  Model.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already exist!" });
    } else {
      const user = new Model({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send({ message: "not registered" });
          res.status(400).json();
        } else {
          res.send({ message: "Successfully registered" });
        }
      });
    }
  });
});

// login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Model.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Successfully Login", user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});

// get user by id
router.get("/get-user/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete user by id
router.delete("delete-user/:id", async (req, res) => {
  try {
    // const id = req.params.id;
    const data = await Model.findByIdAndDelete(req.params.id);
    res.send(`Document with name ${data.name} has been deleted`);
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
