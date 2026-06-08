import * as nodemailer from "nodemailer"

const EMAIL_USER = process.env.EMAIL_USER as string
const EMAIL_RECIP = process.env.EMAIL_RECIP as string
const EMAIL_PASS = process.env.EMAIL_PASS as string

if (!EMAIL_USER || !EMAIL_PASS) {
  throw new Error("EMAIL_USER или EMAIL_PASS не заданы в .env")
}

export const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
})

export async function sendActivityEmail(
  email: string,
  name: string,
  activity_name: string
) {
  
  await transporter.sendMail({
    from: `"Академия медицинского образования имени Ф.И.Иноземцева" <${EMAIL_USER}>`,
    to: email,
    subject: "Вы успешно зарегистрировались на мероприятие",
    html: `
      <div>
        <h2>Здравствуйте, ${name}!</h2>
        <p>Вы зарегистрировались на мероприятие:</p>
        <p><strong>${activity_name}</strong></p>
      </div>
    `,
  })


  await transporter.sendMail({
    from: `"Мероприятие" <${EMAIL_USER}>`,
    to: EMAIL_RECIP,
    subject: "Регистрация на мероприятие",
    html: `
      <div>
        <h2>Новая регистрация на мероприятие</h2>
        <p><strong>ФИО:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Мероприятие:</strong> ${activity_name}</p>
      </div>
    `,
  })
}