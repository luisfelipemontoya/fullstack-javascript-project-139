import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

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
				onSubmit={() => { }}
			>
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

					<button type="submit">
						Registrarse
					</button>
				</Form>
			</Formik>
		</>
	);
}

export default SignupPage;
