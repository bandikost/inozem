import * as nodemailer from "nodemailer"

const EMAIL_USER = process.env.EMAIL_USER as string
const EMAIL_RECIP = process.env.EMAIL_RECIP as string
const EMAIL_PASS = process.env.EMAIL_PASS as string

if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_RECIP) {
  throw new Error(
    "EMAIL_USER, EMAIL_RECIP или EMAIL_PASS не заданы в .env"
  )
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

export async function sendQuestionEmail(
  last_name: string,
  patronymic: string,
  name: string,
  phone: string,
  email: string,
  question: string
) {
  const fullName = `${last_name} ${name} ${patronymic}`

  await transporter.sendMail({
    from: `"Предложение/Проблема с сайта" <${EMAIL_USER}>`,
    to: EMAIL_RECIP,
    subject: "Предложение/Проблема с сайта",
    html: `
      <div>
        <h2>Предложение/Проблема с сайта</h2>

        <p>
          <strong>ФИО:</strong>
          ${fullName}
        </p>

        <p>
          <strong>Email:</strong>
          ${email}
        </p>

        <p>
          <strong>Телефон:</strong>
          ${phone}
        </p>

        <hr />

        <p>
          <strong>Предложение/Проблема:</strong>
        </p>

        <p>
          ${question}
        </p>
      </div>
    `,
  })
}