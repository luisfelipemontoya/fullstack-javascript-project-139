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
		<>
			<h1>{t('auth.signup')}</h1>

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
							dispatch(setToken(data.token));
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
					<Form>
						<div>
							<label htmlFor="username">
								{t('auth.username')}
							</label>

							<Field
								id="username"
								name="username"
								type="text"
							/>

							<ErrorMessage
								name="username"
								component="div"
							/>
						</div>

						<div>
							<label htmlFor="password">
								{t('auth.password')}
							</label>

							<Field
								id="password"
								name="password"
								type="password"
							/>

							<ErrorMessage
								name="password"
								component="div"
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
							/>

							<ErrorMessage
								name="confirmPassword"
								component="div"
							/>
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
						>
							{t('auth.register')}
						</button>
						{signupError && (
							<div style={{ color: 'red' }}>
								{t('auth.userExists')}
							</div>
						)}
						<p>
							{t('auth.haveAccount')}{' '}
							<Link to="/login">
								{t('auth.login')}
							</Link>
						</p>
					</Form>

				)}
			</Formik >
		</>
	);
}

export default SignupPage;
