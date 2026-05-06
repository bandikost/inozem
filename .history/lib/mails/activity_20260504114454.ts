import * as nodemailer from "nodemailer"

const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS

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


export async function sendActivityEmail(email: string, name: string, activity_name: string) {
  await transporter.sendMail({
    from: `"Академия медицинского образования имени Ф.И.Иноземцева" <${EMAIL_USER}>`,
    to: [email, EMAIL_USER],
    subject: "Вы успешно зарегистрировались на мероприятие",
    html: `
      <div>
        <h2>Здравствуйте, ${name}!</h2>
        <p>Поздравляем! Вы зарегистрировались на мероприятие:</p>
        <p><strong>${activity_name}</strong></p>
      
        <p>* Это письмо сформировано автоматически, на него не нужно отвечать.</p>
        <p>В случае, если у вас появились вопросы, вы можете обратиться в поддержку через форму или по номеру телефона указаных на сайте академии <a href="https://inozem.online">Академия медицинского образования имени Ф.И.Иноземцева</a></p>
      </div>
    `,
  })
}