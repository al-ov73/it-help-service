import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from "react-router-dom";
import { FormikProvider, useFormik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

import routes from '../routes/routes.js';
import useAuth from '../hooks/index.js';
import IndexNavbar from './Navbar.jsx';


const LoginPage = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const auth = useAuth();

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: Yup.string().min(2, 'Не менее 6 символов'),
  });

  const handleSubmit = (values, actions) => async () => {
    setLoading(true)
    const username = values.username;
    const password = values.password;
    try {
      const response = await axios.post(routes.loginPath, {
        username,
        password,
      });
      const tokens = response.data;
      
      if (tokens.access) {
        const credentials = { username, tokens }
        localStorage.setItem('user', JSON.stringify(credentials))
        auth.loggedIn = true;
        setLoading(false)
        return navigate('/');
      }
    } catch (e) {
      if (e.message === "Request failed with status code 401") {
        actions.setFieldError('password', 'Неверное имя пользователя или пароль')
      }
      console.log('e', e);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
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
                  <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">Логин</h1>
                    <Form.Group className="form-floating mb-3">
                    <Form.Control
                      autoComplete="username"
                      id="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      />
                    <Form.Label htmlFor='username' >Ваш ник</Form.Label>
                    <ErrorMessage component="div" name="username" />
                    </Form.Group>

                    <Form.Group className="form-floating mb-3" >
                    <Form.Control type="password"
                      id="password"
                      autoComplete="password"
                      onChange={formik.handleChange}
                      value={formik.values.password} />
                    <Form.Label htmlFor='password' >Пароль</Form.Label>
                    <ErrorMessage component="div" name="password" />
                    </Form.Group>
                    <Button type="submit" disabled={isLoading}>Войти</Button>
                  </Form>
                  </FormikProvider>
              </div>
          </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                  
                  <a onClick={() => navigate('/signup')}>Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  </>
};

export default LoginPage;
