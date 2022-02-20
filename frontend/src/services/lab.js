import axios from '@/plugins/axios.js';

function getLabs() {
  return axios.get('/labs')
    .then((res) => {
      return processLabsRes(res.data.labs);
    });
}

function processLabsRes(res) {

  return res.map(lab => {
    let downloads = [];
    lab.contents.forEach(content => {
      if (content.type === 'download') {
        // eslint-disable-next-line no-unused-vars
        const { type, ...downloadObj  } = content;
        downloads.push(downloadObj);
      }
    })

    let uploads = [];
    lab.contents.forEach(content => {
      if (content.type === 'upload') {
        // eslint-disable-next-line no-unused-vars
        const { type, ...uploadObj  } = content;
        uploads.push(uploadObj);
      }
    })
    return {
      id: lab.id,
      downloads,
      uploads,
    }
  })
}

export default {
  getLabs,
}