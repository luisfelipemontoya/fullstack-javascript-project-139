import axios from 'axios';

const login = (credentials) => axios
    .post('/api/v1/login', credentials)
    .then((response) => response.data);

export default {
    login,
};