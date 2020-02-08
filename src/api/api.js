import axios from 'axios-observable';
import Cookie from 'utils/cookie';

let devBaseURL = 'https://pallymate-api.herokuapp.com/api/';
let $axios = axios.create({
  baseURL: devBaseURL
});

// Set important Headers
$axios.defaults.headers.post['Content-Type'] = 'application/json';
console.log('Authorization => ', Cookie.getAuth());
$axios.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${Cookie.getAuth()}`;
    return config
  },
  (err) => {}
)

export default $axios;
  