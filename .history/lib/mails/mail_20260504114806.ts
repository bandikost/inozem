import * as nodemailer from "nodemailer"

const EMAIL_USER = process.env.EMAIL_USER as string
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

export async function sendWelcomeEmail(
  email: string,
  name: string,
  password: string
) {

  await transporter.sendMail({
    from: `"Академия медицинского образования имени Ф.И.Иноземцева" <${EMAIL_USER}>`,
    to: email,
    subject: "Вы успешно прошли регистрацию",
    html: `
      <div>
        <h2>Здравствуйте, ${name}!</h2>
        <p>Поздравляем! Вы успешно зарегистрировались в системе.</p>

        <p><strong>Ваши данные для входа:</strong></p>
        <p>Email: ${email}</p>
        <p>Пароль: ${password}</p>

        <p>Никому не сообщайте свои данные для входа!</p>
      </div>
    `,
  })


  await transporter.sendMail({
    from: `"Система уведомлений" <${EMAIL_USER}>`,
    to: EMAIL_USER,
    subject: "Новая регистрация пользователя",
    html: `
      <div>
        <h2>Новый пользователь зарегистрировался</h2>
        <p><strong>ФИО:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
      </div>
    `,
  })
}