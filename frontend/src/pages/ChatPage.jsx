import { useEffect } from 'react';
import chatApi from '../api/chat';

import { setChannels } from '../store/slices/channelsSlice';
import { setMessages } from '../store/slices/messagesSlice';
import { useDispatch, useSelector } from 'react-redux';

function ChatPage() {
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        chatApi.getData(token)
            .then((data) => {
                dispatch(setChannels(data.channels));
                dispatch(setMessages(data.messages));
            });
    }, [dispatch, token]);

    return <h1>Chat</h1>;
}

export default ChatPage;
