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
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        required: true
    }
})

let Items = mongoose.model(
    'Items',
    itemSchema
);

module.exports = Items;


