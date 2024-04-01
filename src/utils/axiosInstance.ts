import axios from 'axios';
const baseURL = import.meta.env.VITE_AXIOS_BASE_URL??'http://localhost:3000/api/v1/'

const api =  axios.create({
    baseURL: baseURL,
});

export default api;