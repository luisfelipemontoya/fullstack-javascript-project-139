import { useEffect } from 'react';
import chatApi from '../api/chat';

import { setChannels } from '../store/slices/channelsSlice';
import { setMessages } from '../store/slices/messagesSlice';
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
                console.log(messages);
                dispatch(setMessages(messages));
            });

    }, [dispatch, token]);

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
        </>
    );
}

export default ChatPage;
