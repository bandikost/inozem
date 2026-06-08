import * as nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER as string;
const EMAIL_RECIP = process.env.EMAIL_RECIP as string;
const EMAIL_PASS = process.env.EMAIL_PASS as string;

if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_RECIP) {
  throw new Error(
    "EMAIL_USER, EMAIL_RECIP или EMAIL_PASS не заданы в .env"
  );
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


export async function sendApplicationEmail(
  last_name: string,
  patronymic: string,
  name: string,
  phone: string,
  email: string,
  education_level: string,
  specialization: string,
   created_at: Date
) {
  const fullName = `${last_name} ${name} ${patronymic}`

  const createdDate = new Date(created_at);

const date = createdDate.toLocaleDateString("ru-RU");
const time = createdDate.toLocaleTimeString("ru-RU", {
  hour: "2-digit",
  minute: "2-digit",
})

  await transporter.sendMail({
    from: `"Академия медицинского образования имени Ф.И. Иноземцева" <${EMAIL_USER}>`,
    to: email,
    subject: "Ваша заявка на обучение принята",
    html: `
      <div>
        <h2>Здравствуйте, ${fullName}!</h2>

        <p>Вы подали заявку на обучение</p>
        <p><strong>По специальности:</strong> ${specialization}</p>
        <p><strong>Уровень образования:</strong> ${education_level}</p>
        <p>В ближайшее время с вами свяжется сотрудник академии.</p>
      </div>
    `,
  });

  await transporter.sendMail({
    from: `"Обучение" <${EMAIL_USER}>`,
    to: EMAIL_RECIP,
    subject: "Новая заявка на обучение",
    html: `
      <div>
        <h2>Поступила новая заявка</h2>

        <p><strong>ФИО:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Уровень образования:</strong> ${education_level}</p>
        <p><strong>Специальность:</strong> ${specialization}</p>
        <p><strong>Дата:</strong> ${date}</p>
        <p><strong>Время:</strong> ${time}</p>
      </div>
    `,
  });
}