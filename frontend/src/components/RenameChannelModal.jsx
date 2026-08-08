import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import chatApi from '../api/chat';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

function RenameChannelModal({ show, onHide, channel }) {

    const token = useSelector((state) => state.auth.token);
    const { t } = useTranslation();

    const validationSchema = yup.object({
        name: yup
            .string()
            .min(3, t('validation.min3'))
            .max(20, t('validation.max20'))
            .required(t('validation.required')),
    });

    const formik = useFormik({
        initialValues: {
            name: channel?.name ?? '',
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            return chatApi.renameChannel(token, channel.id,
                {
                    name: values.name
                },
            ).then(() => {
                onHide();
            })
                .catch(() => {
                    toast.error(t('notifications.networkError'));
                });
        },
    });


    if (!channel) {
        return null;
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {t('chat.renameChannel')}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {formik.touched.name && formik.errors.name && (
                        <div>
                            {formik.errors.name}
                        </div>
                    )}
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onHide}
                >
                    {t('chat.cancel')}
                </Button>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={formik.handleSubmit}
                    disabled={formik.isSubmitting}
                >
                    {t('chat.rename')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

RenameChannelModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    channel: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        removable: PropTypes.bool.isRequired,
    }),
};

export default RenameChannelModal;
