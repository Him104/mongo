const registerModel = require("../models/registerModel.js");

const createUser = async function(req,res){

try{
   
    const data = req.body;
    if (!data.title) {
         return res.status(400).send({ status: false, msg: "title is required field" })
         }
    if (!data.name) {
         return res.status(400).send({ status: false, msg: "name is required" })
      }
    if(!data.phone) {
         return res.status(400).send({ status: false, msg: "phone is required" }) 
     }
    if (!data.email) {
         return res.status(400).send({ status: false, msg: "email is required" }) 
     }
         
    if (!data.password) {
         return res.status(400).send({ status: false, msg: "password is required" })
         }

         const userCreated = await registerModel.create(data);
         res.status(201).send({ status: true, message: "User created successfully", data: userCreated })
         
        }
         catch(error){
            return res.status(500).send({msg:error.message})

         }
        }

        module.exports.createUser = createUser;