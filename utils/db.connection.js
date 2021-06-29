const mongoose=require('mongoose');

exports.connectToDb=function(){

    mongoose.connect(process.env.MONGODB_URL,{ useUnifiedTopology: true,useNewUrlParser: true },function(err){
        if(err){
            console.log("error");
        }
        else{
            console.log("connected to db");
        }
    });

}

