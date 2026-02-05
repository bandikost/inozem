'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  first_name: Yup.string().required('Имя обязательно'),
  last_name: Yup.string().required('Фамилия обязательна'),
  email: Yup.string().email('Некорректный email').required('Email обязателен'),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Некорректный номер телефона')
    .required('Телефон обязателен'),
  password: Yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен'),
});

export default function RegisterPage() {
  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h1>Регистрация</h1>

      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          password: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const res = await fetch('/api/users/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Ошибка регистрации');

            alert('Пользователь успешно зарегистрирован');
            resetForm();
          } catch (e: unknown) {
            if (e instanceof Error) {
              alert(e.message);
            } else {
              alert('Неизвестная ошибка');
            }
          }
          finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Field name="first_name" placeholder="Имя" />
            <ErrorMessage name="first_name">{(msg) => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>

            <Field name="last_name" placeholder="Фамилия" />
            <ErrorMessage name="last_name">{(msg) => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>
            <Field name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email">{(msg) => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>

            <Field name="phone" placeholder="Телефон" />
            <ErrorMessage name="phone">{(msg) => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>

            <Field name="password" type="password" placeholder="Пароль" />
            <ErrorMessage name="password">{(msg) => <div style={{ color: 'red' }}>{msg}</div>}</ErrorMessage>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
