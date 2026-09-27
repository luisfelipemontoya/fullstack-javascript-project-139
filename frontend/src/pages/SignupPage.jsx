import { Button, Form as BootstrapForm, Alert, Card } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/slices/authSlice';
import authApi from '../api/auth';
import { useState } from 'react';
import storage from '../api/storage';
import { toast } from 'react-toastify';

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
				<Card className="shadow-sm">
					<Card.Body className="p-4">
						<h1 className="h3 mb-4 text-center">
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
										storage.setToken(data.token);

										dispatch(setToken({
											token: data.token,
											username: values.username,
										}));
										navigate('/');
									})
									.catch((error) => {
										if (error.response?.status === 409) {
											setSignupError(true);
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
								<Form className="d-flex flex-column gap-3">
									<BootstrapForm.Group controlId="username" className="mb-3">
										<BootstrapForm.Label>
											{t('auth.username')}
										</BootstrapForm.Label>
										<Field
											as={BootstrapForm.Control}
											name="username"
											type="text"
											autoComplete="username"
											disabled={isSubmitting}
										/>

										<ErrorMessage
											name="username"
											component="div"
											className="text-danger"
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
											autoComplete="new-password"
											disabled={isSubmitting}
										/>

										<ErrorMessage
											name="password"
											component="div"
											className="text-danger"
										/>
									</BootstrapForm.Group>

									<BootstrapForm.Group controlId="confirmPassword" className="mb-3">
										<BootstrapForm.Label>
											{t('auth.confirmPassword')}
										</BootstrapForm.Label>

										<Field
											as={BootstrapForm.Control}
											name="confirmPassword"
											type="password"
											disabled={isSubmitting}
											autoComplete="new-password"
										/>

										<ErrorMessage
											name="confirmPassword"
											component="div"
											className="text-danger"
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
									{signupError && (
										<Alert variant="danger" className="mb-0">
											{t('auth.userExists')}
										</Alert>
									)}
									<p className="mb-0 text-center">
										{t('auth.haveAccount')}{' '}
										<Link to="/login">
											{t('auth.login')}
										</Link>
									</p>
								</Form>

							)}
						</Formik>
					</Card.Body>
				</Card>
			</ div>
		</main >
	);
}

export default SignupPage;
