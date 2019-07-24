const express = require("express");
const router = express.Router();
const Items = require("../models/itemsModel")

const _ = require("lodash");

router.put("/updateFirst", (req, res) => {
    let updateContent = req.body.content;
    let updateName = req.body.username;

    let object = objectMaker(updateName, updateContent);
    _.set(myArray, 0, object);
    res.send("first content updated");
});

// router.delete("/delete", (req, res) => {
//     _.pullAt(myArray, 0);
//     res.send("First content deleted");
// });

function objectMaker(name, cont) {
    const object = {
        username: name,
        content: cont
    }

    return object;
}


// @routes GET item/all
// @desc Get all items
// @access Public

router.get("/getAll", (req, res) => {

    const errors = {};

    Items.find()
        .then(items => {
            if (!items) {
                errors.noItems = "There are no items"
                res.status(404).json(errors);
            }
            res.json(items)
        })
        .catch(err => {
            res.status(404).json(errors)
        });
});



router.delete("/delete", (req, res) => {
    const errors = {};

    Items.deleteOne({
            username: req.body.username
        }).then(({
            ok,
            n
        }) => {
            if (n === 0) {
                errors.noDelete = "Item not deleted"
                res.status(404).json(errors);
            }
            res.send("item deleted")
        })
        .catch(err => {
            res.status(404).json(errors)
        });
});

// @routes POST item/create
// @desc Create item
// @access Public

router.post("/create", (req, res) => {

    const item = new Items({
        username: req.body.username,
        content: req.body.content
    })
    item.save()
        .then(() =>
            res.send("item added"),
            (err) => res.send(err));
});

// @routes PUT item/update
// @desc Update item
// @access Public

router.put("/update", (req, res) => {
    Items.updateOne(
        {username: req.body.username},
        { $set: {"content" : req.body.newContent}}
    ).then(() =>
        res.send("item updated"),
        (err) => res.send(err)
    );
});

module.exports = router;