import axios from '@/plugins/axios.js';

const getuser = () => {
  return axios.get('/user');
}


const login = (username, password) => {
  return axios.post('/user/login', {
    username,
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

const signup = (username, password, email, studentId) => {
  return axios.post('/user/add', {
    username,
    password,
    email,
    studentId
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
  getuser,
  login,
  signup,
}
