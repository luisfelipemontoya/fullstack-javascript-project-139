import { Modal, Button } from 'react-bootstrap';
import chatApi from '../api/chat';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import PropTypes from 'prop-types';

function RemoveChannelModal({ show, onHide, channel }) {

    if (!channel) {
        return null;
    }

    const token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false);

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
                    disabled={loading}
                    onClick={() => {
                        setLoading(true);

                        chatApi.deleteChannel(token, channel.id)
                            .then(() => {
                                onHide();
                            })
                            .finally(() => {
                                setLoading(false);
                            });
                    }}
                >
                    Eliminar
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
