router.delete("/delete", (req, res) => {
  const errors = {};

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
});


router.delete("/delete", (req, res) => {
  const errors = {};

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
});



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
})
});