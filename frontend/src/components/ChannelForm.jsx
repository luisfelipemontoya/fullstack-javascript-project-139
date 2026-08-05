import { useFormik } from 'formik';
import * as yup from 'yup';
import chatApi from '../api/chat';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react'

const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, 'Mínimo 3 caracteres')
        .max(20, 'Máximo 20 caracteres')
        .required('Campo obligatorio')
})

function ChannelForm({ onSuccess }) {

    const token = useSelector((state) => state.auth.token);

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            chatApi.createChannel(token, values)
                .then(() => {
                    resetForm();
                    onSuccess();
                });
        },
    });

    return (

        <form onSubmit={formik.handleSubmit}>
            <input
                ref={inputRef}
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Nombre del canal"

            />
            {formik.touched.name && formik.errors.name && (
                <div>
                    {formik.errors.name}
                </div>
            )}
            <button type="submit">
                Crear
            </button>
        </form>

    );
}

export default ChannelForm;

