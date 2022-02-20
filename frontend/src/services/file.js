import axios from '@/plugins/axios.js';

function downloadFile(uri, filename) {
  axios.get(uri, {
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

function uploadFile(uri, data) {
  return axios.post(uri, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(function () {
    console.log('Successfully upload file');
  }).catch(function () {
    console.error('Fail to upload file');
  });
}

export default {
  downloadFile,
  uploadFile,
}