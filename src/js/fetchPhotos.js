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
