const createSocketApi = (socket) => ({
    subscribe: (event, callback) => {
        socket.on(event, callback);
    },
    unsubscribe: (event, callback) => {
        socket.off(event, callback);
    },
});

export default createSocketApi;