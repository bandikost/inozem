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
});

export async function sendApplicationEmail(
  last_name: string,
  patronymic: string,
  name: string,
  phone: string,
  email: string,
  education_level: string,
  specialization: string,
  programm_name: string,
  created_at: Date
) {
  const fullName = `${last_name} ${name} ${patronymic}`;

  const date = created_at.toLocaleDateString(
    "ru-RU",
    {
      timeZone: "Europe/Moscow",
    }
  );

  const time = created_at.toLocaleTimeString(
    "ru-RU",
    {
      timeZone: "Europe/Moscow",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  try {
    await transporter.sendMail({
      from: `"Академия медицинского образования имени Ф.И. Иноземцева" <${EMAIL_USER}>`,
      to: email,
      subject: "Ваша заявка на обучение принята",

      html: `
        <div>
          <p>Здравствуйте, ${fullName}!</p>

          <p>
            Вы подали заявку на обучение
            в Академии медицинского образования
            имени Ф.И. Иноземцева.
          </p>

          <p>
            <strong>Образовательная программа:</strong>
            ${programm_name}
          </p>

          <p>
            <strong>Специальность:</strong>
            ${specialization || "—"}
          </p>

          <p>
            <strong>Уровень образования:</strong>
            ${education_level}
          </p>

          <p>
            В ближайшее время с вами свяжется
            сотрудник академии.
          </p>
        </div>
      `,
    });

    console.log(
      "USER APPLICATION EMAIL SENT:",
      email
    );
  } catch (error) {
    console.error(
      "USER APPLICATION EMAIL ERROR:",
      error
    );

    throw error;
  }


  try {
    await transporter.sendMail({
      from: `"Обучение" <${EMAIL_USER}>`,
      to: EMAIL_RECIP,
      subject: "Новая заявка на обучение",

      html: `
        <div>
          <h2>Поступила новая заявка</h2>

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

          <p>
            <strong>Уровень образования:</strong>
            ${education_level}
          </p>

          <p>
            <strong>Специальность:</strong>
            ${specialization || "—"}
          </p>

          <p>
            <strong>Программа:</strong>
            ${programm_name}
          </p>

          <p>
            <strong>Дата:</strong>
            ${date}
          </p>

          <p>
            <strong>Время:</strong>
            ${time}
          </p>
        </div>
      `,
    });

    console.log(
      "ADMIN APPLICATION EMAIL SENT:",
      EMAIL_RECIP
    );
  } catch (error) {
    console.error(
      "ADMIN APPLICATION EMAIL ERROR:",
      error
    );

    throw error;
  }
}