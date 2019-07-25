const express = require("express");
const router = express.Router();
const Items = require("../models/itemsModel");
const validator = require("../validator/itemValidator");
const bcrypt = require("bcrypt");

const _ = require("lodash");

// @routes GET item/all
// @desc Get all items
// @access Public

router.get("/getAll", (req, res) => {
  const errors = {};

  Items.find({}, "-email -_id -__v")
    .then(items => {
      if (!items) {
        errors.noItems = "There are no items";
        res.status(404).json(errors);
      }
      res.json(items);
    })
    .catch(err => {
      res.status(404).json(errors);
    });
});


//delete

router.delete("/delete", (req, res) => {
  errors = {};
  
  const checkEmail =req.body.email;
  const checkUsername = req.body.username;
  let hashEmail;

  Items.findOne( {username : checkUsername} )
  .then( item => {
   hashEmail = item.email;

   bcrypt.compare(checkEmail, hashEmail).then(isMatch => {
    if (isMatch) {
      Items.deleteOne({
        username: req.body.username
      })
        .then(({ ok, n }) => {
          if (n === 0) {
            errors.noDelete = "item not deleted";
            res.status(404).json(errors);
          }
          res.status(200).json({ message: "item deleted" });
        })
        .catch(err => {
          res.send(err);
        });
    } else {
      errors.checkEmail = "emails do not match";
      errors.first = checkEmail;
      errors.second = hashEmail;
      res.status(404).json(errors);
    }
  }).catch((err) => res.status(404).send(err));
}).catch(() => res.status(404).json({message :"user does not exist"}));
});

// @routes POST item/create
// @desc Create item
// @access Public

router.post("/create", (req, res) => {
  const item = new Items({
    username: req.body.username,
    content: req.body.content,
    email: req.body.email
  });

  const response = validator.itemVal(item);

  if (response.isValid) {
    payload = {};

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.email, salt, (err, hash) => {
        if (err) throw err;
        item.email = hash;
        item.save();
        res.status(200).json({ message: "item added" });
      });
    });
  } else {
    res.send(response.errors);
  }
});

// @routes PUT item/update
// @desc Update item
// @access Public

router.put("/update", (req, res) => {
  Items.updateOne(
    { username: req.body.username },
    { $set: { content: req.body.content } },
    { $set: { email: req.body.email } }
  )
    .then(() => res.status(200).json({ message: "item updated" }))
    .catch(err => res.send(err));
});



// @route POST decrypt
// @desk check matching value
// @access Public

router.post("/check", (req, res) => {
  errors = {};

  const checkEmail = req.body.email;
  const checkUsername = req.body.username;
  let hashEmail;

  Items.findOne({ username: checkUsername }).then(item => {
    hashEmail = item.email;

    bcrypt
      .compare(checkEmail, hashEmail)
      .then(isMatch => {
        if (isMatch) {
          res.json({ message: "emails match" });
        } else {
          errors.checkEmail = "emails do not match";
          errors.first = checkEmail;
          errors.second = hashEmail;
          res.status(404).json(errors);
        }
      })
      .catch(err => res.status(404).send(err));
  });
});

//compare email values

module.exports = router;
