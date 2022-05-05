import axios from "../axios";

const endpoints = {
    getUsers: (page = 1) => axios.get('/users', {
        params: {
            count: 6,
            page: page,
        }
    }),
    getPositions: (page = 1) => axios.get('/positions'),
    registrationUser: (data, token) => axios.post('/users', data, {
        headers: {
            token
        }
    }),
    getToken: () => axios.get('/token'),
};

export default endpoints;
