const sgMail=require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sgMail=function(options){
    let opt={
        to:"nikhilaree@gmail.com",
        from:process.env.SENDER_EMAIL,
        subject:"hello",
        text:options.text,
        html:options.html
    }

    sgMail.send(opt).then(
        response=>{
      console.log(response);
        },
        error=>{
            console.log(error)
        }
    )
}

