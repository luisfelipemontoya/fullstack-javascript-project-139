import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/auth';

function LoginPage() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Iniciar sesión</h1>

            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values)
                    authApi.login(values)
                        .then((data) => {
                            localStorage.setItem('token', data.token);
                            navigate('/');
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
                            type="text"
                        />
                    </div>

                    <button type="submit">
                        Entrar
                    </button>
                </Form>
            </Formik>
        </>

    );
}

export default LoginPage;