import axios from '@/plugins/axios.js';

function downloadFile(uri) {
  axios.get(uri, {
    responseType: 'blob', // important
  }).then((res) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'lab_config.conf'); //or any other extension
    document.body.appendChild(link);
    link.click();
  });
}

export default {
  downloadFile,
}