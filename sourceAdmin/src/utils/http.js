import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000
})

http.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

http.interceptors.response.use((response) => {

    return response;
})

export { http }