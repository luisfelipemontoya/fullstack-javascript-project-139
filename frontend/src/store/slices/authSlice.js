import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
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
