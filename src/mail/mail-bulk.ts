import nodemailer from "nodemailer"

export const sendBulkEmails = async (
  to: string,
  template: any,
  body?: any,
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
    to: to,
    subject: subject,
    html: template(body),
  }
  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}
