import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PixabayAPI from './fetchPhotos';

const refs = {
  searchForm: document.getElementById('search-form'),
  input: document.querySelector('.search-form__input'),
  submitBtn: document.querySelector('.search-form__submit-button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  toTopBtn: document.querySelector('.scroll-top-button'),
};

const lightbox = new SimpleLightbox('.photo-link');
const pixabayAPI = new PixabayAPI();
let contentPagesLeft = 0;

refs.searchForm.addEventListener('submit', submitQuery);
refs.loadMoreBtn.addEventListener('click', loadMorePics);
refs.toTopBtn.addEventListener('click', scrollToTop);

function submitQuery(e) {
  e.preventDefault();

  /**sanitizes query */
  let inputValue = refs.input.value.trim();

  /**checking if current query is the same as the previous one, to reduce the load on server  */
  if (!inputValue || inputValue === pixabayAPI.getQuery()) {
    return;
  }

  /**just for a cleaner look of input field after sanitizing */
  refs.input.value = inputValue;

  /**removes focus of the input field after submit */
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

      loadFirstPics(hits);

      showBtn(refs.toTopBtn);
    })
    .catch(error => error.message);
}

function loadFirstPics(pictures) {
  refs.gallery.innerHTML = '';

  renderMarkup(pictures);
}

function renderMarkup(pictures) {
  hideBtn(refs.loadMoreBtn);

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
      <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" width="305" height="200"/>
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

    showBtn(refs.loadMoreBtn);
  });
}

function loadMorePics() {
  pixabayAPI.incrementPageNumber();

  pixabayAPI.fetchPhotos().then(({ hits }) => {
    if (contentPagesLeft <= 0) {
      Notify.info(
        "We're sorry, but you've reached the end of search results.",
        hideBtn(refs.loadMoreBtn)
      );
    }

    contentPagesLeft -= 1;

    renderMarkup(hits);

    scrollToNextResult();
  });
}

function hideBtn(el) {
  return el.classList.add('visually-hidden');
}

function showBtn(el) {
  return el.classList.remove('visually-hidden');
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function scrollToNextResult() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2.2,
    behavior: 'smooth',
  });
}
