
import { io } from 'socket.io-client';

const socket = io();

const subscribe = (event, callback) => {
    socket.on(event, callback);
};

const unsubscribe = (event, callback) => {
    socket.off(event, callback);
};

export default  {
    subscribe,
    unsubscribe,
};