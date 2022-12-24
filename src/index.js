import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PixabayAPI from './js/fetchPhotos';

const refs = {
  searchForm: document.getElementById('search-form'),
  input: document.querySelector('.search-form__input'),
  submitBtn: document.querySelector('.search-form__submit-button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const lightbox = new SimpleLightbox('.photo-link');
const pixabayAPI = new PixabayAPI();

refs.searchForm.addEventListener('submit', submitQuery);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function submitQuery(e) {
  e.preventDefault();

  let inputValue = refs.input.value.trim();

  if (!inputValue || inputValue === pixabayAPI.getQuery()) {
    return;
  }

  refs.input.value = inputValue;
  refs.input.blur();

  pixabayAPI.setQuery(inputValue);
  pixabayAPI.resetPageNumber();

  pixabayAPI
    .fetchPhotos()
    .then(picArray => {
      if (picArray.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      renderFirstGallery(picArray);
    })
    .catch(error => error.message);
}

function renderFirstGallery(pictures) {
  refs.gallery.innerHTML = '';

  renderMarkup(pictures);

  lightbox.refresh();
}

function renderMarkup(pictures) {
  hideLoadMoreBtn();

  pictures.map(picture => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = picture;

    const markup = `<div class="photo-card">
    <a class="photo-link" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width="305px" height="200px"/>
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
  </div>`;

    refs.gallery.insertAdjacentHTML('beforeend', markup);

    showLoadMoreBtn();
  });
}

function onLoadMore() {
  pixabayAPI.incrementPageNumber();

  pixabayAPI.fetchPhotos().then(picArray => {
    renderMarkup(picArray);

    lightbox.refresh();
  });
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('visually-hidden');
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('visually-hidden');
}
