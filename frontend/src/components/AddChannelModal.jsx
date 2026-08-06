import { Modal, Button } from 'react-bootstrap';
import ChannelForm from './ChannelForm'
import PropTypes from 'prop-types';

function AddChannelModal({ show, onHide }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Crear canal
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
                    Cancelar
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
