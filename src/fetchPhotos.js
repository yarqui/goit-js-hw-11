import axios from 'axios';
import { Notify } from 'notiflix';

let currentPage = 1;
let currentQuery = '';

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
      page: currentPage,
    },
  };

  if (currentQuery !== query) {
    currentPage = 1;
  } else {
    currentPage += 1;
  }
  const res = await axios.get(`${URL}`, queryParams);

  if (!res.data.total) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  // if (currentPage >= 2) {
  //   currentPage += 1;
  // } else {
  //   currentPage = 1;
  // }

  currentQuery = query;

  return res.data.hits;
}
