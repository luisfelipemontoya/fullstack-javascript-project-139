import { useFormik } from 'formik';
import * as yup from 'yup';
import chatApi from '../api/chat';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';

function ChannelForm({ onSuccess }) {

    const token = useSelector((state) => state.auth.token);
    const inputRef = useRef(null);
    const { t } = useTranslation();

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const validationSchema = yup.object({
        name: yup
            .string()
            .min(3, t('validation.min3'))
            .max(20, t('validation.max20'))
            .required(t('validation.required'))
    })

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {

            const filteredName = leoProfanity.clean(values.name);

            chatApi.createChannel(token, {
                ...values,
                name: filteredName,
            })
                .then(() => {
                    resetForm();
                    onSuccess();
                    toast.success(t('notifications.channelCreated'));
                })
                .catch(() => {
                    toast.error(t('notifications.networkError'));
                });
        },
    });

    return (

        <form onSubmit={formik.handleSubmit}>

            <input
                ref={inputRef}
                id="channel-name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t('chat.channelName')}

            />

            <label
                className="visually-hidden"
                htmlFor="channel-name"
            >
                {t('chat.channelName')}
            </label>

            {formik.touched.name && formik.errors.name && (
                <div>
                    {formik.errors.name}
                </div>
            )}
            <button
                type="submit"
                disabled={formik.isSubmitting}
            >
                {t('chat.create')}
            </button>
        </form>

    );
}

ChannelForm.propTypes = {
    onSuccess: PropTypes.func.isRequired,
};

export default ChannelForm;

