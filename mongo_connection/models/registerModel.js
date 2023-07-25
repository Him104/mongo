const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({


    title: {type: String,required: true,enum: ["Mr", "Mrs", "Miss","Must be mr,mrs or miss, no ther values can be accepted, got {VALUE}" ],trim: true},
    name: {type: String,required: true,trim: true},
    phone: {type: String, required: true, unique: true, trim: true },
    email: {type: String, required: true,unique: true,trim: true },
    password: {type: String,required: true,trim: true, min:[8, 'Must be atleast 8 characters, got {value}'], max:[15, 'Must be atmost 15 characters, got {value}'] },
    
    }
    , { timestamps: true });
    
    module.exports = mongoose.model('User', userSchema) 

