import axios from 'axios';

export const getTrendingWords = () => {
  return axios.get('http://localhost:3001/api')
}
