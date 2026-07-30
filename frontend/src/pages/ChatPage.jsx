import { useEffect } from 'react';
import chatApi from '../api/chat';
import socket from '../socket';

import { setChannels } from '../store/slices/channelsSlice';
import { setMessages, addMessage } from '../store/slices/messagesSlice';
import { useDispatch, useSelector } from 'react-redux';

function ChatPage() {
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);
    const channels = useSelector((state) => state.channels);
    const messages = useSelector((state) => state.messages);

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
        socket.on('newMessage', (message) => {
            console.log('Socket recibió', message);
            dispatch(addMessage(message));
        });

        return () => {
            socket.off('newMessage');
        };
    }, [dispatch]);

    return (
        <>
            <h1>Chat</h1>

            <h2>Canales</h2>

            <ul>
                {channels.map((channel) => (
                    <li key={channel.id}>
                        {channel.name}
                    </li>
                ))}
            </ul>

            <h2>Messages</h2>

            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <strong>{message.username}:</strong> {message.body}
                    </li>
                ))}
            </ul>

            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    const body = e.target.elements.body.value;

                    chatApi.sendMessage(token, {
                        body,
                        channelId: '1',
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
