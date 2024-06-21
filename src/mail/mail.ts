import nodemailer from "nodemailer"

export const sendCodeConfirmation = async (
  code: string,
  email: string,
  template: any,
  ip?: string,
  device?: string,
  subject?: string,
) => {
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
    subject: subject,
    html: template(code, ip, device),
  }
  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}
