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

function getLabs() {
  return axios.get('/labs')
    .then((res) => {
      return res.data;
    });
}

export default {
  downloadFile,
  getLabs,
}