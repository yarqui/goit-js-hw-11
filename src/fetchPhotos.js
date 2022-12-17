import axios from 'axios';

export function fetchPhotos(queue) {
  const URL = 'https://pixabay.com/api/';
  const API_KEY = '32117995-da98556d394b8c9b5a96c2a58';
  const params = {
    params: {
      key: API_KEY,
      q: queue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  };

  axios
    .get(`${URL}`, params)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
