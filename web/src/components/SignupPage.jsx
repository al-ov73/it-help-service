import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { FormikProvider, useFormik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import DatePicker from "react-datepicker";

import routes from '../routes/routes.js';
import useAuth from '../hooks/index.js';
import IndexNavbar from './Navbar.jsx';

import "react-datepicker/dist/react-datepicker.css";
import { Row } from 'react-bootstrap';


const SignupPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const auth = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');

  const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
    .min(3, 'от 3 о 20 символов')
    .max(20, 'от 3 о 20 символов')
    .required('required field'),
    last_name: Yup.string()
    .min(3, 'от 3 о 20 символов')
    .max(20, 'от 3 о 20 символов')
    .required('required field'),
    username: Yup.string()
      .min(3, 'от 3 о 20 символов')
      .max(20, 'от 3 о 20 символов')
      .required('required field'),
    password: Yup.string().min(2, 'больше 2 символов'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
    date_birth: Yup.date().required(),
  });


  const handleSubmit = (values, actions) => async () => {
    setLoading(true)
    console.log('values', values)
    try {
      const response = await axios.post(routes.signupPath, {
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
        password: values.password,
        role: values.role,
        date_birth: new Date(values.date_birth).toISOString(),
      });
      console.log('response', response.data)
      const tokens = response.data;
      if (tokens.access) {
        const username = values.username;
        const credentials = { username, tokens }
        localStorage.setItem('user', JSON.stringify(credentials))
        auth.loggedIn = true;
        setLoading(false)
        return navigate('/');
      }
    } catch (e) {
      console.log('e', e);
      setLoading(false)
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      date_birth: Date.now(),
    },
    validationSchema: SignupSchema,
    onSubmit: (values, actions) => dispatch(handleSubmit(values, actions)),
  });

  return <>
    <IndexNavbar/>
    <div className='d-flex flex-column h-100'>
      <div className='container-fluid h-100'>
        <div className='row justify-content-center align-content-center h-100'>
          <div className='col-12 col-md-8 col-xxl-6'>
            <div className='card shadow-sm'>
              <div className='card-body row p-5'>
                <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                  <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
                </div>
                <FormikProvider value={formik}>
                  <Form onSubmit={formik.handleSubmit}>
                      <h1 className="text-center mb-4">Зарегистрироваться</h1>

                      <Form.Group className="mb-3">
                      <Form.Label htmlFor="first_name">Ваше имя</Form.Label>
                        <Form.Control type="text"
                          placeholder="Ваше имя"
                          autoComplete="first_name"
                          id="first_name"
                          onChange={formik.handleChange}
                          value={formik.values.first_name}
                          />
                      <ErrorMessage name="username" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="last_name">Ваша фамилия</Form.Label>
                        <Form.Control type="text"
                          placeholder="Ваша фамилия"
                          autoComplete="last_name"
                          id="last_name"
                          onChange={formik.handleChange}
                          value={formik.values.last_name}
                          />
                      <ErrorMessage name="username" />
                    </Form.Group>

                      <Form.Group className="mb-3">
                      <Form.Label htmlFor="username">Ваш ник</Form.Label>
                        <Form.Control type="text"
                          placeholder="Ваш ник"
                          autoComplete="username"
                          id="username"
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          />
                      <ErrorMessage name="username" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                      <Form.Label htmlFor="password">Пароль</Form.Label>
                      <Form.Control type="password"
                        placeholder="Пароль"
                        id="password"
                        autoComplete="password"
                        onChange={formik.handleChange}
                        value={formik.values.password} />
                      <ErrorMessage name="password" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                      <Form.Label htmlFor="passwordConfirmation">Подтвердите пароль</Form.Label>
                      <Form.Control type="password"
                        placeholder="Подтвердите пароль"
                        id="passwordConfirmation"
                        autoComplete="passwordConfirmation"
                        onChange={formik.handleChange}
                        value={formik.values.passwordConfirmation} />
                      <ErrorMessage name="passwordConfirmation" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                    <Form.Label htmlFor="role">Ваша роль</Form.Label>
                    <Form.Select aria-label="role"
                                  id="role"
                                  onChange={formik.handleChange}
                                  value={formik.values.role}>
                      <option>Выберите роль</option>
                      <option value="EM">Сотрудник</option>
                      <option value="IT">IT-специалист</option>
                      <option value="MG">Руководитель IT-службы</option>
                    </Form.Select>
                    </Form.Group>
                    
                    <Row>
                    <DatePicker
                      selected={startDate}
                      label="date_birth"
                      id="date_birth"
                      name="date_birth"
                      value={formik.values.date_birth}
                      onChange={(date) => {
                        setStartDate(date)
                        formik.setFieldValue('date_birth', date);
                        }}
                    />

                    </Row>
                    <Button type="submit" disabled={isLoading}>
                      Зарегистрироваться
                    </Button>
                  </Form>
                </FormikProvider>
              </div>
          </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <a onClick={() => navigate('/login')}>Залогиниться</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  </>
};

export default SignupPage;
