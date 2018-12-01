import axios from "axios";

var api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 100000,
    headers: {'X-Custom-Header': 'foobar'}
});

api.defaults.headers.post['Content-Type'] = 'application/raw';

export default api;