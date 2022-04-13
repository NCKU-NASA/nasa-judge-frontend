import axios from '@/plugins/axios.js';

function checkalive(uri) {
  try
  {
    return axios.get(uri);
  }
  catch (err) {
    return false;
  }
}

export default {
  checkalive,
}
