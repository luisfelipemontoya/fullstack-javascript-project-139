import { createSlice } from '@reduxjs/toolkit';
import storage from '../../api/storage';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: storage.getToken(),
        username: null,
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload.token;
            state.username = action.payload.username;
        },
        removeToken(state) {
            state.token = null;
            state.username = null;
        },
    },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
