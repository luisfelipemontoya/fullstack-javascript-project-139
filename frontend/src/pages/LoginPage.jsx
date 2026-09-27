import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import authApi from '../api/auth';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/slices/authSlice';
import storage from '../api/storage';
import { toast } from 'react-toastify';

function LoginPage() {
    const navigate = useNavigate();
    const [authError, setAuthError] = useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <main className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <h1 className="auth-title">
                        {t('auth.login')}
                    </h1>

                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setAuthError(false);

                            return authApi.login(values)
                                .then((data) => {
                                    storage.setToken(data.token);

                                    dispatch(setToken({
                                        token: data.token,
                                        username: values.username,
                                    }));

                                    navigate('/');
                                })
                                .catch((error) => {
                                    if (error.response?.status === 401) {
                                        setAuthError(true);
                                    } else {
                                        toast.error(t('notifications.networkError'));
                                    }
                                })
                                .finally(() => {
                                    setSubmitting(false);
                                });
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="auth-form">
                                <div className="form-group">
                                    <label htmlFor="username">
                                        {t('auth.nickname')}
                                    </label>
                                    <Field
                                        id="username"
                                        name="username"
                                        type="text"
                                        className="form-control"
                                        autoComplete="username"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">
                                        {t('auth.password')}
                                    </label>
                                    <Field
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        autoComplete="current-password"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="auth-submit-button"
                                    disabled={isSubmitting}
                                >
                                    {t('auth.submit')}
                                </button>
                                {authError && (
                                    <div className="auth-error">
                                        {t('auth.invalidCredentials')}
                                    </div>
                                )}

                                <p className="auth-footer">
                                    {t('auth.noAccount')}{' '}
                                    <Link to="/signup">
                                        {t('auth.signup')}
                                    </Link>
                                </p>
                            </Form>
                        )}
                    </Formik >
                </div>
            </div>
        </main>

    );
}

export default LoginPage;
