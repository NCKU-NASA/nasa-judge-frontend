import axios from '@/plugins/axios.js';

function checkalive(uri) {
  return axios.get(uri);
}

export default {
  checkalive,
}
