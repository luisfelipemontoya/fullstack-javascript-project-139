import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import chatApi from '../api/chat';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel } from '../store/slices/channelsSlice';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';

function ChannelForm({ onSuccess }) {

    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
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

            return chatApi.createChannel(token, {
                ...values,
                name: filteredName,
            })
                .then((channel) => {
                    dispatch(setCurrentChannel(channel.id));

                    resetForm();
                    toast.success(t('notifications.channelCreated'));
                    onSuccess();

                })
                .catch(() => {
                    toast.error(t('notifications.networkError'));
                });
        },
    });

    return (

        <BootstrapForm onSubmit={formik.handleSubmit}>
            <BootstrapForm.Group controlId="channel-name" className="mb-3">
                <BootstrapForm.Label>
                    {t('chat.channelName')}
                </BootstrapForm.Label>

                <BootstrapForm.Control
                    ref={inputRef}
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t('chat.channelName')}
                    disabled={formik.isSubmitting}
                    isInvalid={Boolean(
                        formik.touched.name && formik.errors.name
                    )}
                />

                <BootstrapForm.Control.Feedback type="invalid">
                    {formik.errors.name}
                </BootstrapForm.Control.Feedback>
            </BootstrapForm.Group>

            <Button
                type="submit"
                variant="primary"
                disabled={formik.isSubmitting}
            >
                {t('chat.create')}
            </Button>
        </BootstrapForm>

    );
}

ChannelForm.propTypes = {
    onSuccess: PropTypes.func.isRequired,
};

export default ChannelForm;

