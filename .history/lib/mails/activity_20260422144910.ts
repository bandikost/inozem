import * as nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
})
export async function sendActivityEmail(email: string, name: string) {
  await transporter.sendMail({
    from: `"Академия медицинского образования имени Ф.И.Иноземцева" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Вы успешно зарегистрировались на мероприятие",
    html: `
      <div>
        <h2>Здравствуйте, ${name}!</h2>
        <p>Поздравляем! Вы зарегистрировались на мероприятие.</p>

      
        <p>* Это письмо сформировано автоматически, на него не нужно отвечать.</p>
        <p>В случае, если у вас появились вопросы, вы можете обратиться в поддержку через форму или по номеру телефона указаных на сайте академии <a href="https://inozem.online">Академия медицинского образования имени Ф.И.Иноземцева</a></p>
      </div>
    `,
  })
}