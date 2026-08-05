import { useEffect, useState } from 'react';
import chatApi from '../api/chat';
import socket from '../socket';

import { setChannels, addChannel } from '../store/slices/channelsSlice';
import { setMessages, addMessage } from '../store/slices/messagesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel } from '../store/slices/currentChannelSlice';
import ChannelForm from '../components/ChannelForm';
import AddChannelModal from '../components/AddChannelModal';

function ChatPage() {
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);
    const channels = useSelector((state) => state.channels);
    const messages = useSelector((state) => state.messages);
    const currentChannelId = useSelector((state) => state.currentChannel);
    const [showAddChannelModal, setShowAddChannelModal] = useState(false);

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

        socket.on('newMessage', handleNewMessage);
        socket.on('newChannel', handleNewChannel);

        return () => {
            socket.off('newMessage', handleNewMessage);
            socket.off('newChannel', handleNewChannel);
        };
    }, [dispatch]);


    const currentMessages = messages.filter(
        (message) => message.channelId === currentChannelId,
    );

    return (
        <>
            <h1>Chat</h1>

            <h2>Canales</h2>

            <button
                onClick={() => setShowAddChannelModal(true)}
            >
                Agregar canal
            </button>

            <AddChannelModal
                show={showAddChannelModal}
                onHide={() => setShowAddChannelModal(false)}
            />

            <ChannelForm />

            <ul>
                {channels.map((channel) => (
                    <li key={channel.id}
                        onClick={() => {
                            dispatch(setCurrentChannel(channel.id))
                        }}
                    >
                        {channel.name}
                    </li>
                ))}
            </ul>

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
