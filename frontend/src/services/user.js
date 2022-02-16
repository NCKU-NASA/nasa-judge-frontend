import axios from '@/plugins/axios.js';

const login = (username, password) => {
  return axios.post('/user/login', {
    username,
    password
  }).then((res) => {
    if (res.status === 200) {
      return true;
    }
    return false;
  }).catch((err) => {
    console.error(err);
  });
}

export default {
  login,
}