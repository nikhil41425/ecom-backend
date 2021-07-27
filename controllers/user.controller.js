const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

// exports.register=(req,res)=>{
//     // var user=req.body;
//  var user={
//      username:req.body.username,
//      password:bcrypt.hashSync(req.body.password),
//      email:req.body.email
//  }

//     console.log(user);

//     var userDoc=new userModel(user);

//     userDoc.save(function(err,doc){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log(doc);
//         }
//     });
// }

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
    } else return res.status(201).send(userDoc);
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
