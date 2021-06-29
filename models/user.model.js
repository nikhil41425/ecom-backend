const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minLength:[5,"should be min 5 characters"],
        maxLength:[10,"should be max 10 characters"]
    },
    password:{
        type:String,
        required:true,
        minLength:[5,"should be atleast 5 characters"],
        maxLength:20

    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        required:"email is required",
        validate: [validateEmail, 'Please fill a valid email address']
      

    },
    role:{
        type:String,
        required:true,
        default:"role_customer"
    }
});



module.exports=mongoose.model('user',UserSchema);