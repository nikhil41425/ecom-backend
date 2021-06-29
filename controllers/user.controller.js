const userModel=require('../models/user.model');

exports.register=(req,res)=>{
    var user=req.body;
    console.log(user);

    var userDoc=new userModel(user);

    userDoc.save(function(err,doc){
        if(err){
            console.log(err);
        }
        else{
            console.log(doc);
        }
    });
}