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
  toTopBtn: document.querySelector('.to-top-button'),
};

const lightbox = new SimpleLightbox('.photo-link');
const pixabayAPI = new PixabayAPI();
let contentPagesLeft = 0;

refs.searchForm.addEventListener('submit', submitQuery);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.toTopBtn.addEventListener('click', scrollToTop);

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
    .then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      Notify.info(`Hooray! We found ${totalHits} images.`);

      contentPagesLeft = Math.ceil(totalHits / hits.length - 1);
      console.log('contentPagesLeft:', contentPagesLeft);

      renderFirstGallery(hits);
    })
    .catch(error => error.message);
}

function renderFirstGallery(pictures) {
  refs.gallery.innerHTML = '';

  renderMarkup(pictures);
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

    lightbox.refresh();

    showLoadMoreBtn();
  });
}

function onLoadMore() {
  pixabayAPI.incrementPageNumber();

  pixabayAPI.fetchPhotos().then(({ hits }) => {
    if (contentPagesLeft <= 0) {
      Notify.info(
        "We're sorry, but you've reached the end of search results.",
        hideLoadMoreBtn
      );
      // return;
    }

    contentPagesLeft -= 1;
    console.log('contentPagesLeft:', contentPagesLeft);

    renderMarkup(hits);
  });
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('visually-hidden');
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('visually-hidden');
}

function scrollToTop() {}
