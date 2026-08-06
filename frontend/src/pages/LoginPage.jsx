import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/auth';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/slices/authSlice';

function LoginPage() {
    const navigate = useNavigate();
    const [authError, setAuthError] = useState(false);
    const dispatch = useDispatch();

    return (
        <>
            <h1>Iniciar sesión</h1>

            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setAuthError(false);

                    authApi.login(values)
                        .then((data) => {
                            localStorage.setItem('token', data.token);

                            dispatch(setToken(data.token));

                            navigate('/');
                        })
                        .catch(() => {
                            setAuthError(true);
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                <Form>
                    <div>
                        <label htmlFor="username">Usuario</label>
                        <Field
                            id="username"
                            name="username"
                            type="text"
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <Field
                            id="password"
                            name="password"
                            type="password"
                        />
                    </div>

                    <button type="submit">
                        Entrar
                    </button>
                    {authError && (
                        <div style={{ color: 'red' }}>
                            Usuario o contraseña incorrectos
                        </div>
                    )}
                </Form>
            </Formik>
        </>

    );
}

export default LoginPage;