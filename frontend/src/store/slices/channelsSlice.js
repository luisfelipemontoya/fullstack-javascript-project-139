import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    currentChannelId: '1',
};

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setChannels(state, action) {
            state.items = action.payload;
        },

        addChannel(state, action) {
            state.items.push(action.payload);
        },

        renameChannel(state, action) {
            const channel = state.items.find(
                (item) => item.id === action.payload.id,
            );

            if (channel) {
                Object.assign(channel, action.payload);
            }
        },
        removeChannel(state, action) {
            const { id } = action.payload;

            state.items = state.items.filter(
                (channel) => channel.id !== id,
            );

            if (state.currentChannelId === id) {
                state.currentChannelId = '1';
            }
        },

        setCurrentChannel(state, action) {
            state.currentChannelId = action.payload;
        },
    },
});
export const { setChannels, addChannel, renameChannel, removeChannel, setCurrentChannel, } = channelsSlice.actions;

export default channelsSlice.reducer;
