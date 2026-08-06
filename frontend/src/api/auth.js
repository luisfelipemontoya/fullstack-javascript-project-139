import axios from 'axios';

const login = (credentials) => axios
    .post('/api/v1/login', credentials)
    .then((response) => response.data);

const signup = (userData) => axios
	.post('/api/v1/signup', userData)
    .then((response) => response.data);

export default {
    login,
    signup,
};
