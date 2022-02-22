import axios from '@/plugins/axios.js';

function getLabs() {
  return axios.get('/labs')
    .then((res) => {
      return processLabsRes(res.data.labs);
    });
}

function getMaxLabScore(labId) {
  return axios.get(`/labs/${labId}/score`)
    .then((res) => res.data.score);
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
    });

    let uploads = [];
    lab.contents.forEach(content => {
      if (content.type === 'upload') {
        // eslint-disable-next-line no-unused-vars
        const { type, ...uploadObj  } = content;
        uploads.push(uploadObj);
      }
    });
    
    let inputs = [];
    lab.contents.forEach(content => {
      if (content.type === 'input') {
        // eslint-disable-next-line no-unused-vars
        const { type, ...inputObj  } = content;
        inputs.push(inputObj);
      }
    });
    return {
      id: lab.id,
      downloads,
      uploads,
      inputs,
    }
  })
}

export default {
  getLabs,
  getMaxLabScore,
}