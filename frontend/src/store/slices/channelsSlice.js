import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
    name: 'channels',
    initialState: [],
    reducers: {
        setChannels(state, action) {
            return action.payload;
        },

        addChannel(state, action) {
            state.push(action.payload);
        },

       renameChannel(state, action) {
        const index = state.findIndex(
            (channel) => channel.id === action.payload.id,
        );

        if (index !== -1) {
            state[index] = action.payload;
        }
    },
  },
});

export const { setChannels, addChannel, renameChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
