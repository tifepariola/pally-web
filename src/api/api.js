import axios from 'axios';

//let  auth = localStorage.getItem('auth') || '';
//console.log('auth',auth);
let devBaseURL = 'https://pallymate-api.herokuapp.com/api/';
export default axios.create({
    baseURL: devBaseURL,
  });

  