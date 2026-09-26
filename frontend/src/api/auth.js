import axios from 'axios';
import routes from './routes';

const login = (credentials) => axios
    .post(routes.login(), credentials)
    .then((response) => response.data);

const signup = (userData) => axios
    .post(routes.signup(), userData)
    .then((response) => response.data);

export default {
    login,
    signup,
};
