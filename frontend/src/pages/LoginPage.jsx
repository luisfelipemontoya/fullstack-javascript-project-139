import { Button, Form as BootstrapForm } from 'react-bootstrap';
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
                                <BootstrapForm.Group controlId="username" className="mb-3">
                                    <BootstrapForm.Label>
                                        {t('auth.nickname')}
                                    </BootstrapForm.Label>
                                    <Field
                                        as={BootstrapForm.Control}
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        disabled={isSubmitting}
                                    />
                                </BootstrapForm.Group>

                                <BootstrapForm.Group controlId="password" className="mb-3">
                                    <BootstrapForm.Label>
                                        {t('auth.password')}
                                    </BootstrapForm.Label>
                                    <Field
                                        as={BootstrapForm.Control}
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        disabled={isSubmitting}
                                    />
                                </BootstrapForm.Group>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-100"
                                    disabled={isSubmitting}
                                >
                                    {t('auth.submit')}
                                </Button>
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
