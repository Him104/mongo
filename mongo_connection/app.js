const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb+srv://him104:root@cluster0.qo8th.mongodb.net/mern_batch")

.then( () => console.log("Mongo is connected"))

.catch(err => console.log(err))



app.listen(process.env.PORT || 4000, function () {

    console.log(`express app running on port ` + (process.env.PORT || 4000 ));
    
})