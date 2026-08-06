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

const sendMessage = (token, message) => axios.post(
    '/api/v1/messages',
    message,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
).then((response) => response.data);

const createChannel = (token, channel) => axios.post(
    '/api/v1/channels',
    channel,
 {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
).then((response) => response.data);

const renameChannel = (token, id, channel) => axios.patch(
    `/api/v1/channels/${id}`,
    channel,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
).then((response) => response.data);

const deleteChannel = (token, id) => axios.delete(
    `/api/v1/channels/${id}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
).then((response) => response.data);

export default { getChannels, getMessages, sendMessage, createChannel, renameChannel, deleteChannel, };
