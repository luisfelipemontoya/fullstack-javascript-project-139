import axios from 'axios';
import routes from './routes';

const getChannels = (token) => axios.get(routes.channels(), {
    headers: {
        Authorization: `Bearer ${token}`,
    },
}).then((response) => response.data);

const getMessages = (token) => axios.get(routes.messages(), {
    headers: {
        Authorization: `Bearer ${token}`,
    },
}).then((response) => response.data);

const sendMessage = (token, message) => axios.post(
    routes.messages(),
    message,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
).then((response) => response.data);

const createChannel = (token, channel) => axios.post(
    routes.channels(),
    channel,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
).then((response) => response.data);

const renameChannel = (token, id, channel) => axios.patch(
    routes.channel(id),
    channel,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
).then((response) => response.data);

const deleteChannel = (token, id) => axios.delete(
    routes.channel(id),
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
).then((response) => response.data);

export default { getChannels, getMessages, sendMessage, createChannel, renameChannel, deleteChannel, };
