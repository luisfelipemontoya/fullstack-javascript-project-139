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
    },
});

export const { setChannels, addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;