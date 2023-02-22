import axios from '@/plugins/axios.js';

function canjudge(uri) {
  try
  {
    return axios.get(uri);
  }
  catch (err) {
    return false;
  }
}

export default {
    canjudge,
}
