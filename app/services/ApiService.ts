import axios from 'axios';

const ApiService = axios.create({
	baseURL: process.env.BACKEND_PORT || 'http://192.168.0.104:3000',
	withCredentials: true,
});

export default ApiService;
