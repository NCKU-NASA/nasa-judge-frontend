import axios from '@/plugins/axios.js';
import { mdiFileDownloadOutline, mdiFileUploadOutline } from '@mdi/js';

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
      return addContentIcon(res.data.labs);
    });
}

function addContentIcon(labs) {
  labs.forEach((lab, i) => {
    labs[i].contents.forEach((content, j) => {
      if (content.type === 'download') {
        labs[i].contents[j].icon = mdiFileDownloadOutline;
      }
      else if (content.type === 'upload') {
        labs[i].contents[j].icon = mdiFileUploadOutline;
      }
    });
  });

  return labs;
}

export default {
  downloadFile,
  getLabs,
}