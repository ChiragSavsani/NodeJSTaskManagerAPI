const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'chirag.savsani26@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Hello ${name}, \nWelcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'chirag.savsani26@gmail.com',
        subject: `Good Bye ${name}`,
        text: `Hello ${name}, \n\nPlease write us why you are leaving us. It will be great for us. \n\n\nHave a nice day.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}

// sgMail.send({
//     to: 'chirag.savsani12@gmail.com',
//     from: 'chirag.savsani26@gmail.com',
//     subject: 'This is my first creation!',
//     text: 'I hope this one actually get to you.'
// })
