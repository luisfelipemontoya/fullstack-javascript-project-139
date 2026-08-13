import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/slices/authSlice';
import authApi from '../api/auth';
import { useState } from 'react';

function SignupPage() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [signupError, setSignupError] = useState(false);
	const { t } = useTranslation();

	const validationSchema = yup.object({
		username: yup
			.string()
			.min(3, t('validation.min3'))
			.max(20, t('validation.max20'))
			.required(t('validation.required')),

		password: yup
			.string()
			.min(6, t('validation.passwordMin'))
			.required(t('validation.required')),

		confirmPassword: yup
			.string()
			.oneOf(
				[yup.ref('password')],
				t('validation.passwordMatch'),
			)
			.required(t('validation.required')),
	});

	return (
		<main className="auth-page">
			<div className="auth-container">
				<div className="auth-card">
					<h1 className="auth-title">
						{t('auth.signup')}
					</h1>

					<Formik
						initialValues={{
							username: '',
							password: '',
							confirmPassword: '',
						}}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting }) => {
							setSignupError(false);
							return authApi.signup({
								username: values.username,
								password: values.password,
							})
								.then((data) => {
									localStorage.setItem('token', data.token);

									dispatch(setToken({
										token: data.token,
										username: values.username,
									}));
									navigate('/');
								})
								.catch((error) => {
									if (error.response?.status === 409) {
										setSignupError(true);
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
										{t('auth.username')}
									</label>

									<Field
										id="username"
										name="username"
										type="text"
										className="form-control"
									/>

									<ErrorMessage
										name="username"
										component="div"
										className="validation-error"
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
									/>

									<ErrorMessage
										name="password"
										component="div"
										className="validation-error"
									/>
								</div>

								<div>
									<label htmlFor="confirmPassword">
										{t('auth.confirmPassword')}
									</label>

									<Field
										id="confirmPassword"
										name="confirmPassword"
										type="password"
										className="form-control"
									/>

									<ErrorMessage
										name="confirmPassword"
										component="div"
										className="validation-error"
									/>
								</div>

								<button
									type="submit"
									disabled={isSubmitting}
									className="auth-submit-button"
								>
									{t('auth.signup')}
								</button>
								{signupError && (
									<div className="auth-error">
										{t('auth.userExists')}
									</div>
								)}
								<p className="auth-footer">
									{t('auth.haveAccount')}{' '}
									<Link to="/login">
										{t('auth.login')}
									</Link>
								</p>
							</Form>

						)}
					</Formik>
				</div>
			</div>
		</main>
	);
}

export default SignupPage;
