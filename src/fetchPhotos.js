import axios from 'axios';
import { Notify } from 'notiflix';

export async function fetchPhotos(query) {
  const URL = 'https://pixabay.com/api/';
  const API_KEY = '32117995-da98556d394b8c9b5a96c2a58';
  const queryParams = {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: 1,
    },
  };

  await axios.get(`${URL}`, queryParams).then(res => {
    if (!res.data.total) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    return res.data;
  });
}
