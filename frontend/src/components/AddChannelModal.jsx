import { Modal, Button } from 'react-bootstrap';
import ChannelForm from './ChannelForm'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function AddChannelModal({ show, onHide }) {
    const { t } = useTranslation();
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {t('chat.createChannel')}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <ChannelForm onSuccess={onHide} />
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onHide}
                >
                    {t('chat.cancel')}
                </Button>
            </Modal.Footer>
        </Modal >
    );
}

AddChannelModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
};

export default AddChannelModal;
