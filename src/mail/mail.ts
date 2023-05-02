import nodemailer from "nodemailer"
import { codeConfirmationTemplate } from "mail"

export const sendCodeConfirmation = async (code: string, email: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
  const mailOptions = {
    from: `<${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Confirm your code",
    html: codeConfirmationTemplate(code),
  }
  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}
