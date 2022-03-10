import axios from '@/plugins/axios.js';

const login = (studentId, password) => {
  return axios.post('/user/login', {
    studentId,
    password
  }).then((res) => {
    return {
      status: res.status,
      data: res.data,
    };
  }).catch((err) => {
    return {
      status: err.response.status,
      data: err.response.data,
    };
  });
}

export default {
  login,
}