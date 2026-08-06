import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        setMessages(state, action) {
            return action.payload;
        },

        addMessage(state, action) {
            state.push(action.payload);
        },

        removeChannelMessages(state, action) {
            return state.filter(
                (message) => message.channelId !== action.payload.id,
            );
        },
    },
});

export const { setMessages, addMessage, removeChannelMessages, } = messagesSlice.actions;

export default messagesSlice.reducer;
