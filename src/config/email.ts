import nodemailer from 'nodemailer';

type MailData = {
    title: string,
    content: string,
    receiver: string
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gabrielraulinoschoenell@gmail.com',
        pass: 'ykrushfcrcvcofvc'
    }
})

export const sendEmail = async (data: MailData)=>{
    const email = await transporter.sendMail({
        from: "Gabizinho",
        to: "gabrielschoenell@gmail.com",
        subject: 'Hello',
        html: '<h1>Oi</h1>'
    })
}