import axios from '@/plugins/axios.js';

function getLabs() {
  return axios.get('/labs')
    .then((res) => {
      return processLabsRes(res.data.labs);
    });
}

function getLabScoreData(labId) {
  return axios.get(`/score/${labId}`)
    .then((res) => res.data);
}

function getLabChart(labId) {
  return axios.get(`/labs/${labId}/chart`)
    .then((res) => res.data);
}

function processLabsRes(res) {

  return res.map(lab => {
    let downloads = [];
    let uploads = [];
    let inputs = [];
    lab.contents.forEach(content => {
      const { type, ...Obj  } = content;
      if(Obj.alias === undefined) Obj.alias = Obj.name;
      if (content.type === 'download') {
        // eslint-disable-next-line no-unused-vars
        downloads.push(Obj);
      }
      if (content.type === 'upload') {
        // eslint-disable-next-line no-unused-vars
        uploads.push(Obj);
      }
      if (content.type === 'input') {
        // eslint-disable-next-line no-unused-vars
        inputs.push(Obj);
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
  getLabScoreData,
  getLabChart,
}
