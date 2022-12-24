import axios from 'axios';

export default class PixabayAPI {
  constructor() {
    this.baseURL =
      'https://pixabay.com/api/?image_type=photo&orientation=horizontal&safesearch=true/';
    this.API_KEY = '32117995-da98556d394b8c9b5a96c2a58';
    this.query = '';
    this.pageNumber = 1;
    this.perPage = 40;
  }

  async fetchPhotos() {
    const url = `${this.baseURL}&key=${this.API_KEY}&q=${this.query}&per_page=${this.perPage}&page=${this.pageNumber}`;
    const res = await axios.get(url);

    return res.data;
  }

  setQuery(searchQuery) {
    this.query = searchQuery;
  }

  getQuery() {
    return this.query;
  }

  resetPageNumber() {
    this.pageNumber = 1;
  }

  incrementPageNumber() {
    this.pageNumber += 1;
  }
}

//
// //
//
//
// let currentPage = 1;
// let currentQuery = '';

// export async function fetchPhotos(query) {
//   const URL = 'https://pixabay.com/api/';
//   const API_KEY = '32117995-da98556d394b8c9b5a96c2a58';
//   const queryParams = {
//     params: {
//       key: API_KEY,
//       q: query,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: 'true',
//       per_page: 40,
//       page: currentPage,
//     },
//   };

//   if (currentQuery !== query) {
//     currentPage = 1;
//   } else {
//     currentPage += 1;
//   }
//   const res = await axios.get(`${URL}`, queryParams);

//   if (!res.data.total) {
//     Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   }

//   currentQuery = query;

//   return res.data.hits;
// }
