import { Modal, Button } from 'react-bootstrap';

function AddChannelModal({ show, onHide }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Crear canal
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Aquí irá el formulario.
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

export default AddChannelModal;