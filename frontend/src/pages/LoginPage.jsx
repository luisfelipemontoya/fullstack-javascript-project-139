import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import authApi from '../api/auth';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/slices/authSlice';

function LoginPage() {
    const navigate = useNavigate();
    const [authError, setAuthError] = useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <>
            <h1>{t('auth.login')}</h1>

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

                            dispatch(setToken({
                                token: data.token,
                                username: values.username,
                            }));

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
                        <label htmlFor="username">{t('auth.nickname')}</label>
                        <Field
                            id="username"
                            name="username"
                            type="text"
                        />
                    </div>

                    <div>
                        <label htmlFor="password">{t('auth.password')}</label>
                        <Field
                            id="password"
                            name="password"
                            type="password"
                        />
                    </div>

                    <button type="submit">
                        {t('auth.login')}
                    </button>
                    {authError && (
                        <div style={{ color: 'red' }}>
                            {t('auth.invalidCredentials')}
                        </div>
                    )}

                    <p>
                        {t('auth.noAccount')}{' '}
                        <Link to="/signup">
                            {t('auth.signup')}
                        </Link>
                    </p>
                </Form>
            </Formik >
        </>

    );
}

export default LoginPage;
