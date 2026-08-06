import { useEffect, useState } from 'react';
import chatApi from '../api/chat';
import socket from '../socket';

import { setChannels, addChannel, renameChannel, removeChannel } from '../store/slices/channelsSlice';
import { setMessages, addMessage, removeChannelMessages } from '../store/slices/messagesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel } from '../store/slices/currentChannelSlice';
import AddChannelModal from '../components/AddChannelModal';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import RenameChannelModal from '../components/RenameChannelModal';
import RemoveChannelModal from '../components/RemoveChannelModal';

function ChatPage() {
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);
    const channels = useSelector((state) => state.channels);
    const messages = useSelector((state) => state.messages);
    const currentChannelId = useSelector((state) => state.currentChannel);
    const [showAddChannelModal, setShowAddChannelModal] = useState(false);
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [channelToRemove, setChannelToRemove] = useState(null);

    useEffect(() => {
        chatApi.getChannels(token)
            .then((channels) => {
                dispatch(setChannels(channels));
            });

        chatApi.getMessages(token)
            .then((messages) => {
                dispatch(setMessages(messages));
            });

    }, [dispatch, token]);

    useEffect(() => {
        const handleNewMessage = (message) => {
            dispatch(addMessage(message));
        };

        const handleNewChannel = (channel) => {
            dispatch(addChannel(channel));
            dispatch(setCurrentChannel(channel.id));
        };

        const handleRenameChannel = (channel) => {
            dispatch(renameChannel(channel));
        };

        const handleRemoveChannel = (channel) => {
            dispatch(removeChannel(channel));
            dispatch(removeChannelMessages(channel));

            if (channel.id === currentChannelId) {
                dispatch(setCurrentChannel('1'));
            }
        };

        socket.on('newMessage', handleNewMessage);
        socket.on('newChannel', handleNewChannel);
        socket.on('renameChannel', handleRenameChannel);
        socket.on('removeChannel', handleRemoveChannel);

        return () => {
            socket.off('newMessage', handleNewMessage);
            socket.off('newChannel', handleNewChannel);
            socket.off('renameChannel', handleRenameChannel);
            socket.off('removeChannel', handleRemoveChannel);
        };
    }, [dispatch, currentChannelId]);


    const currentMessages = messages.filter(
        (message) => message.channelId === currentChannelId,
    );

    return (
        <>
            <h1>Chat</h1>

            <h2>Canales</h2>

            <Button
                onClick={() => setShowAddChannelModal(true)}
            >
                Agregar canal
            </Button>

            <AddChannelModal
                show={showAddChannelModal}
                onHide={() => setShowAddChannelModal(false)}
            />

            <RenameChannelModal
                show={showRenameModal}
                onHide={() => setShowRenameModal(false)}
                channel={selectedChannel}
            />

            <RemoveChannelModal
                show={showRemoveModal}
                onHide={() => setShowRemoveModal(false)}
                channel={channelToRemove}
            />

            <ul>
                {channels.map((channel) => {
                    const isActive = channel.id === currentChannelId;

                    return (

                        <li key={channel.id}>
                            {channel.removable ? (
                                <Dropdown as={ButtonGroup}>
                                    <Button
                                        variant={isActive ? 'secondary' : 'light'}
                                        onClick={() => dispatch(setCurrentChannel(channel.id))}
                                    >
                                        <span className="me-1">#</span>
                                        {channel.name}
                                    </Button>

                                    <Dropdown.Toggle
                                        split
                                        variant={isActive ? 'secondary' : 'light'}
                                    >
                                        <span className="visually-hidden">
                                            Gestión de canales
                                        </span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={() => {
                                                setSelectedChannel(channel);
                                                setShowRenameModal(true)
                                            }}
                                        >
                                            Renombrar
                                        </Dropdown.Item>

                                        <Dropdown.Item
                                            onClick={() => {
                                                setChannelToRemove(channel);
                                                setShowRemoveModal(true);
                                            }}
                                        >
                                            Eliminar
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <Button
                                    variant={isActive ? 'secondary' : 'light'}
                                    onClick={() => dispatch(setCurrentChannel(channel.id))}
                                >
                                    <span className="me-1">#</span>
                                    {channel.name}
                                </Button>
                            )}
                        </li>
                    );
                })}
            </ul >

            <h2>Messages</h2>

            <ul>
                {currentMessages.map((message) => (
                    <li key={message.id}>
                        <strong>{message.username}:</strong> {message.body}
                    </li>
                ))}
            </ul>

            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    const body = e.target.elements.body.value.trim();

                    if (!body) {
                        return;
                    }

                    chatApi.sendMessage(token, {
                        body,
                        channelId: currentChannelId,
                    }).then(() => {
                        e.target.reset();
                    });
                }}
            >
                <input
                    type="text"
                    name="body"
                    placeholder="Escribe un mensaje..."
                />

                <button type="submit">
                    Enviar
                </button>
            </form>
        </>
    );
}

export default ChatPage;
