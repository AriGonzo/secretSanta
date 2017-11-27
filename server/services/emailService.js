var mailer = require("nodemailer");
var emailCreds = require('../creds/email')


module.exports = {
    sendEmail: function(){
    // Use Smtp Protocol to send Email
        var smtpTransport = mailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL || emailCreds.user,
                pass: process.env.PWD || emailCreds.pass,
            }
        });

        var mail = {
            from: "Secret Santa <secretsantaappcourier@gmail.com>",
            to: "gonzoucf@gmail.com",
            subject: "Send Email Using Node.js",
            text: "Node.js New world for me",
            html: "<b>Node.js New world for me</b>"
        }

        smtpTransport.sendMail(mail, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }

            smtpTransport.close();
        });
    }
}