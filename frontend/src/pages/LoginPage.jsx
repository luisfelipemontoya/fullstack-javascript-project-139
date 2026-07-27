import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/auth';

function LoginPage() {
    const navigate = useNavigate();
    const [authError, setAuthError] = useState(false);

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
                            navigate('/');
                        })
                        .catch((error) => {
                            console.log(error);
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