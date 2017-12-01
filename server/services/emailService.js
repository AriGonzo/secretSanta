var mailer = require("nodemailer");

if (!process.env.NODE_ENV) {
    var emailCreds = require('../creds/email');
}


module.exports = {
    sendEmail: function(user){
    // Use Smtp Protocol to send Email
        var smtpTransport = mailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL || emailCreds.user,
                pass: process.env.PASSWRD || emailCreds.pass,
            }
        });

        var mail = {
            from: "Secret Santa <secretsantaappcourier@gmail.com>",
            to: user.email,
            subject: "Reminder: Your Secret Santa Pick!",
            text: `Your secret santa pick is ${user.selected.name}!`,
            html: `<h1>Don't Forget! Your Secret Santa pick is ${user.selected.name}!</h1>`
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