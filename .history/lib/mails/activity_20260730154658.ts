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

type ActivityEmailData = {
  email: string
  name: string
  lastName: string
  patronymic: string
  phone: string
  city: string
  educationLevel: string
  activityName: string
}

export async function sendActivityEmail({
  email,
  name,
  lastName,
  patronymic,
  phone,
  city,
  educationLevel,
  activityName,
}: ActivityEmailData) {

  await transporter.sendMail({
    from: `"Академия медицинского образования имени Ф.И. Иноземцева" <${EMAIL_USER}>`,
    to: email,
    subject: "Вы успешно зарегистрировались на мероприятие",
    html: `
      <div>
        <h2>Здравствуйте, ${name}!</h2>

        <p>Вы зарегистрировались на мероприятие:</p>

        <p>
          <strong>${activityName}</strong>
        </p>
      </div>
    `,
  })


  await transporter.sendMail({
    from: `"Мероприятие" <${EMAIL_USER}>`,
    to: EMAIL_RECIP,
    subject: "Мероприятие",
    html: `
      <div>
        <h2>Новая заявка на мероприятие</h2>

        <p>
          <strong>ФИО:</strong>
          ${lastName} ${name} ${patronymic}
        </p>

        <p>
          <strong>Email:</strong>
          ${email}
        </p>

        <p>
          <strong>Телефон:</strong>
          ${phone}
        </p>

        <p>
          <strong>Город:</strong>
          ${city || "Не указан"}
        </p>

        <p>
          <strong>Специальность:</strong>
          ${educationLevel}
        </p>

        <p>
          <strong>Мероприятие:</strong>
          ${activityName}
        </p>
      </div>
    `,
  })
}