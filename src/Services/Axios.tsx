import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:80/api',
    withCredentials: true,
    headers: {
        XMLHttpRequest: 'HMLHttpRequest'
    }
});