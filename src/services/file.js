import axios from '@/plugins/axios.js';

function downloadFile(uri, username, token, filename) {
  return axios.get(uri, {
    params: {
        username,
        token,
    },
    responseType: 'blob',
  }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
  });
}

function getFileToken(data) {
  return axios.post('/user/token', {data});  
}

function uploadFile(uri, data) {
  return axios.post(uri, data, {
    timeout: 0,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export default {
  downloadFile,
  getFileToken,
  uploadFile,
}
