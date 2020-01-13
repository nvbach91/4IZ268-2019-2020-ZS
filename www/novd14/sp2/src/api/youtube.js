import axios from 'axios';

const API_KEY = 'AIzaSyDkCNwhPVlOoXp2A-s72DMn3m3HO0gM-OQ';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 25,
    type: 'video',
    key: API_KEY,
  }
});
