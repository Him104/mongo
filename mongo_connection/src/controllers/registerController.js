const registerModel = require("../models/registerModel.js");
const jwt = require('jsonwebtoken');
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

if (user.isDeleted==true) {

  return res.status(400).send({status:false, message:"user has already been deleted"});
  
}

return res.status(200).send({status:true, message: "user details found", data:user})
      
    } catch (error) {

        res.status(500).send({status:false,message:err.message})
        
    }
}



const updateUser = async function(req,res){
  try {

    let data = req.body;

    let userId = req.params.userId;

    if (!userId) {
      return res.status(400).send({status:false, message: "Please enter user id"});
      
    }

    const user = await registerModel.findById(userId);

    if (!user) {

      return res.status(400).send({status:false, message: "Please enter valid user id"})
      
    }
const updateUser = await registerModel.findOneAndUpdate({_id:userId},
  {$set:{title:data.title, name:data.name, email:data.email, phone:data.phone , password:data.password}},
  {new:true})

  return res.status(200).send({status:true,message:"user details updated successfully", data:updateUser})



    
  } catch (error) {
    res.status(500).send({status:false, error:error.message})
  }
}

const deleteUser = async function (req,res) {
  try {
    const userId = req.params.userId


    const user = await registerModel.findById(userId);
if (!user) {

  return res.status(404).send({status:false,message:"user not found"})

}
if (user.isDeleted == true) {

  return res.status(400).send({status:false, message: "user has already been deleted"})
  
}

const deletedUser = await registerModel.findByIdAndUpdate(userId ,
{$set: {isDeleted:true}}, {new:true})

return res.status(201).send({status:true,msg:"user deleted successfully"})


  } catch (error) {

    res.status(500).send({status:false,error:error.msg})
  
    
  }
  
}

const login = async function(req,res){
  try {
    const data = req.body;

    if (!data.email) {
      return res.status(400).send({status:false, msg:"email is required"});
      
    }

    if (!data.password) {
      return res.status(400).send({status:false, msg:"password is required"});
      
    }
    const userMatch = await registerModel.findOne({email:data.email,password:data.password})

   
 if (!userMatch) {

      return res.status(400).send({status:false, msg:"email or password is incorrect"});
      
    }

    const token = jwt.sign({userId:userMatch._id.toString,
     }, process.env.SECRET_KEY,{expiresIn:'80h'})
    return res.status(200).send({status:true,msg:"you have successfully logged in", token});


  } catch (error) {

    res.status(500).send({status:false, error:error.msg})
    
  }
}

module.exports.login=login;
module.exports.deleteUser = deleteUser;
    module.exports.updateUser=updateUser;
module.exports.getUser = getUser;
module.exports.createUser = createUser;
