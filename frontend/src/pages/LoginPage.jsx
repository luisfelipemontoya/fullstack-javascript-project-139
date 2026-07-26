import { Formik, Form, Field } from 'formik';

function LoginPage() {
    return (
        <>
            <h1>Iniciar sesión</h1>

            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                <Form>
                    <div>
                        <label htmlFor="password">Usuario</label>
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
                            Type="text"
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