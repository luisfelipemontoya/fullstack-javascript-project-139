import axios from 'axios';

const getData = (token) => axios.get('/api/v1/data', {
    headers: {
        Authorization: `Bearer ${token}`,
    },
}).then((response) => response.data);

export default { getData, };