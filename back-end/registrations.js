const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");

//
// Registration
//

const User = users.model;
const validUser = users.valid;

// This is the schema for a registration
const registrationSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    reporter: String,
    gamertag: String,
    info: String,
    setup: Boolean,
    status: {
      type: String,
      default: "Waiting"
    },
    response: {
      type: String,
      default: ""
    },
    created: {
      type: Date,
      default: Date.now
    },
  });


// The model for a registration
const Registration = mongoose.model('Registration', registrationSchema);

// get registration -- will list registration that a user has submitted
router.get('/', validUser, async (req, res) => {
    let registrations = [];
    try {
      if (req.user.role === "admin") {
        registrations = await Registration.find().sort({
          created: -1
        });
        console.log(registrations.reporter);
      } else {
        registrations = await Registration.find({
          user: req.user
        }).sort({
          created: -1
        });
      }
      return res.send({
        registrations: registrations
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

// create a registration
router.post('/', validUser, async (req, res) => {
    const registration = new Registration({
      user: req.user,
      reporter: req.body.reporter,
      gamertag: req.body.gamertag,
      info: req.body.info,
      setup: req.body.setup
    });
    console.log(registration);
    try {
      await registration.save();
      return res.send({
        registration: registration
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

// edit a registration -- only edits status and response
router.put('/:id', validUser, async (req, res) => {
    // can only do this if administrator
    if (req.user.role !== "admin") {
      return res.sendStatus(403);
    }
    if (!req.body.status || !req.body.response) {
      return res.status(400).send({
        message: "status and response are required"
      });
    }
    try {
      registration = await Registration.findOne({
        _id: req.params.id
      });
      registration.status = req.body.status;
      registration.response = req.body.response;
      await registration.save();
      return res.send({
        registration: registration
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

router.get('/', validUser, async (req, res) => {
    let registrations = [];
    try {
      if (req.user.role === "admin") {
        registrations = await Registration.find().sort({
          created: -1
        });
        console.log(registrations.reporter);
      } else {
        registrations = await Registration.find({
          user: req.user
        }).sort({
          created: -1
        });
      }
      return res.send({
        registrations: registrations
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

// delete all
router.delete('/delete', validUser, async (req, res) => {
  // can only do this if an administrator
  if (req.user.role !== "admin") {
    return res.sendStatus(403);
  }
  try {
    console.log("works!");
    await Registration.deleteMany({});
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

  module.exports = {
    routes: router
  }