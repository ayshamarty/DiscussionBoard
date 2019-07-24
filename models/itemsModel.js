const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// @ Create schema

let itemSchema = new Schema ({
    username: {
        type: String,
        required: true,
        minlength: 2
    },
    content: {
        type: String,
        minlength: [2, "please write at least two characters"]
    }
})

let Items = mongoose.model(
    'Items',
    itemSchema
);

module.exports = Items;


