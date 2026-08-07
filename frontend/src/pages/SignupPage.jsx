import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/slices/authSlice';
import authApi from '../api/auth';
import { useState } from 'react';

const validationSchema = yup.object({
	username: yup
		.string()
		.min(3, 'Mínimo 3 caracteres')
		.max(20, 'Máximo 20 caracteres')
		.required('Campo obigarorio'),

	password: yup
		.string()
		.min(6, 'Mínimo 6 caracteres')
		.required('Campo obligatorio'),

	confirmPassword: yup
		.string()
		.oneOf(
			[yup.ref('password')],
			'Las contraseñas deben coincidir',
		)
		.required('Campo obligatorio'),
});

function SignupPage() {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [signupError, setSignupError] = useState(false);

	return (
		<>
			<h1>Registro</h1>

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
								Usuario
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
								Contraseña
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
								Confirmar contraseña
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
							Registrarse
						</button>
						{signupError && (
							<div style={{ color: 'red' }}>
								El usuario ya existe
							</div>
						)}
						<p>
							¿Ya tienes cuenta?{' '}
							<Link to="/login">
								Iniciar sesión
							</Link>
						</p>
					</Form>

				)}
			</Formik >
		</>
	);
}

export default SignupPage;
