import * as nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendWelcomeEmail(email: string, name: string) {
  await transporter.sendMail({
    from: `"Academy" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Регистрация успешна",
    html: `
      <div>
        <h2>Привет, ${name}</h2>
        <p>Вы успешно зарегистрировались в системе.</p>
      </div>
    `,
  })
}