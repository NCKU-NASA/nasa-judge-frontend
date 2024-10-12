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

const forgetpasswd = (email) => {
  return axios.post('/user/passwd/forget', {
    email
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

const chpasswd = (password) => {
  return axios.post('/user/passwd/change', {
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

const checkcanchpasswd = () => {
  return axios.get('/user/passwd/check');
}

export default {
  getuser,
  login,
  signup,
  forgetpasswd,
  chpasswd,
  checkcanchpasswd,
}
