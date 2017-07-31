import axios from 'axios';

export const getTrendingWords = () => {
  axios.get('http://localhost:3001/api')
}
