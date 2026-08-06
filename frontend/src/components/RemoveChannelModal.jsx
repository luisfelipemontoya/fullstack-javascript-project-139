import { Modal, Button } from 'react-bootstrap';
import chatApi from '../api/chat';
import { useSelector } from 'react-redux';

function RemoveChannelModal({ show, onHide, channel }) {

    const token = useSelector((state) => state.auth.token);

    return (
        <Modal
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Eliminar canal
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                ¿Seguro que deseas eliminar este canal?
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onHide}
                >
                    Cancelar
                </Button>

                <Button
                    variant="danger"
                    onClick={() => {
                        chatApi.deleteChannel(token, channel.id)
                            .then(() => {
                                onHide();
                            });
                    }}
                >
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RemoveChannelModal;