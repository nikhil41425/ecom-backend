const userModel = require("../models/user.model");
const eService=require('../services/emailService');

const bcrypt = require("bcryptjs");

const { options } = require("../routes/user.routes");




exports.register = async (req, res) => {
  // var user=req.body;
  var user = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password),
    email: req.body.email,
  };

  try {
    console.log(user);

    var userDoc = new userModel(user);

    userDoc = await userDoc.save();

    if (!userDoc) {
      return res.status(404).send("registration failed");
    }
     else 
    {
        let opt={
            to:req.body.email,
            subject:"Registration Successful",
            text:'',
            html:`

            Hello ${req.body.username},

            thanks for registering
            
            `
        }

        eService.sendMail(opt);
        return res.status(201).send(userDoc);

    }
   
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};

exports.login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  try {
    let user = await userModel.findOne({ username: username });

    if (!user) {
      console.log("user not found");
      return res.status(404).send("user not found");
    } else if (bcrypt.compareSync(password, user.password)) {
      console.log("login success");
      return res.status(200).send("login success");
    } else {
      console.log("incorrect password");
      return res
        .status(401)
        .send("authentication failed due to incorrect password");
    }
  } catch (err) {
    return res.status(500).send({ success: false, error: err.message });
  }
};
