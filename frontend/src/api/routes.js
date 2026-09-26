const apiPath = '/api/v1';

const routes = {
    login: () => `${apiPath}/login`,
    signup: () => `${apiPath}/signup`,
    channels: () => `${apiPath}/channels`,
    channel: (id) => `${apiPath}/channels/${id}`,
    messages: () => `${apiPath}/messages`,
};

export default routes;