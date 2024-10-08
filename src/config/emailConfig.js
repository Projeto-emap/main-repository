const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email@gmail.com',
        pass: 'senha',
    },
})

function sendPasswordResetEmail(to, resetLink) {
    const mailOptions = {
        from: 'email@gmail.com',
        to,
        subject: 'Recuperação de senha',
        text: 'Clique no link abaixo para redefinir a sua senha: ${resetLink}',
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log('E-mail enviado: ' + info.response)
        }
    })
}