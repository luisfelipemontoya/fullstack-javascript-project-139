import { Modal, Button } from 'react-bootstrap';
import chatApi from '../api/chat';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

function RemoveChannelModal({ show, onHide, channel }) {

    const token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

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
                    {t('chat.removeChannel')}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {t('chat.confirmRemove')}
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onHide}
                >
                    {t('chat.cancel')}
                </Button>

                <Button
                    variant="danger"
                    disabled={loading}
                    onClick={() => {
                        setLoading(true);

                        chatApi.deleteChannel(token, channel.id)
                            .then(() => {
                                onHide();
                                toast.success(t('notifications.channelRemoved'));
                            })
                            .catch(() => {
                                toast.error(t('notifications.networkError'));
                            })
                            .finally(() => {
                                setLoading(false);
                            });
                    }}
                >
                    {t('chat.confirm')}
                </Button>
            </Modal.Footer>
        </Modal >
    );
}

RemoveChannelModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    channel: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
};

export default RemoveChannelModal;
