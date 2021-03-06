const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const item = require("./routes/item.js");

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Using the routes
app.use("/item", item);

// Use default 5000 port
const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server running on port ${port}`));

// setting up mongo connection

const uri = 'mongodb://localhost:27017/example';
const opts = { useNewUrlParser: true };

mongoose.connect(uri, opts).then(
    () => {console.log("connection ready")},
    (err) => {console.log(err)}
);

