import axios from 'axios';

const getChannels = (token) => axios.get('/api/v1/channels', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
}).then((response) => response.data);

const getMessages = (token) => axios.get('/api/v1/messages', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
}).then((response) => response.data);

export default { getChannels, getMessages, };