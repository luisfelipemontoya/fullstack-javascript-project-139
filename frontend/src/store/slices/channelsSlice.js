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
        removeChannel(state, action) {
            return state.filter(
                (channel) => channel.id !== action.payload.id,
        );
  },
},
});

export const { setChannels, addChannel, renameChannel, removeChannel, } = channelsSlice.actions;

export default channelsSlice.reducer;
