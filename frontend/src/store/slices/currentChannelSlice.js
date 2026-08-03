import { createSlice } from '@reduxjs/toolkit';

const currentChannelSlice = createSlice({
    name: 'currentChannel',
    initialState: '1',
    reducers: {
        setCurrentChannel(state, action) {
            return action.payload;
        },
    },
});

export const { setCurrentChannel } = currentChannelSlice.actions;

export default currentChannelSlice.reducer;
