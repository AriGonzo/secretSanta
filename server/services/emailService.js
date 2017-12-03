var mailer = require("nodemailer");

if (!process.env.NODE_ENV) {
    var emailCreds = require('../creds/email');
}


module.exports = {
    sendWishEmail: function(user, wisher){
        var mail = {
            from: "Secret Santa <secretsantaappcourier@gmail.com>",
            to: user.email,
            subject: "Your Secret Santa pick has made a wish!",
            text: `Your Secret Santa has updated their wishlist!`,
            html: `<h1>Your Secret Santa has updated their wishlist! <a href="frozen-dusk-64399.herokuapp.com">Click here to open the app</a></h1><p>If the link above does not work, copy and paste frozen-dusk-64399.herokuapp.com<em></em></p>`
        }
        this.sendEmail(mail)
    },
    sendReminderEmail: function(user){
        var mail = {
            from: "Secret Santa <secretsantaappcourier@gmail.com>",
            to: user.email,
            subject: "Reminder: Your Secret Santa Pick!",
            text: `Your secret santa pick is ${user.selected.name}!`,
            html: `<h1>Don't Forget! Your Secret Santa pick is ${user.selected.name}!</h1>`
        }
        this.sendEmail(mail)
    },
    sendEmail: function(mail){
    // Use Smtp Protocol to send Email
        var smtpTransport = mailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL || emailCreds.user,
                pass: process.env.PASSWRD || emailCreds.pass,
            }
        });

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