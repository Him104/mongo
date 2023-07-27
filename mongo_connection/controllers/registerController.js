const registerModel = require("../models/registerModel.js");
const mongoose = require("mongoose");
const createUser = async function (req, res) {
  try {
    const data = req.body;
    if (!data.title) {
      return res
        .status(400)
        .send({ status: false, msg: "title is required field" });
    }
    if (!data.name) {
      return res.status(400).send({ status: false, msg: "name is required" });
    }
    if (!data.phone) {
      return res.status(400).send({ status: false, msg: "phone is required" });
    }
    const duplicatePhone = await registerModel.findOne({ phone: data.phone });

    if (duplicatePhone) {
      return res
        .status(400)
        .send({ status: false, msg: "phone# already exists" });
    }

    if (!data.email) {
      return res.status(400).send({ status: false, msg: "email is required" });
    }

    const duplicateEmail = await registerModel.findOne({ email: data.email });

    if (duplicateEmail) {
      return res
        .status(400)
        .send({ status: false, msg: "email already exists" });
    }

    if (!data.password) {
      return res
        .status(400)
        .send({ status: false, msg: "password is required" });
    }

    if (!(data.password.length > 8 && data.password.length < 15)) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "password length should be between 8 to 15 characters",
        });
    }

    const userCreated = await registerModel.create(data);
    res
      .status(201)
      .send({
        status: true,
        message: "User created successfully",
        data: userCreated,
      });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};


const getUser= async function(req,res){
    try {
const userId = req.params.userId

if (!userId) {
  return res.status(400).send({status:false,message:"Please provide a valid user id"})
  
}

const user = await registerModel.findOne({_id:userId})

if (!user) {

  return res.status(404).send({status:false, message: "No user found according to your seearch"})
  
}

return res.status(200).send({status:true, message: "user details found", data:user})
      
    } catch (error) {

        res.status(500).send({status:false,message:err.message})
        
    }
}

module.exports.getUser = getUser;
module.exports.createUser = createUser;
