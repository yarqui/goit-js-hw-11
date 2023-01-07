import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PixabayAPI from './fetchPhotos';

const refs = {
  searchForm: document.getElementById('search-form'),
  input: document.querySelector('.search-form__input'),
  submitBtn: document.querySelector('.search-form__submit-button'),
  gallery: document.querySelector('.gallery'),
  toTopBtn: document.querySelector('.scroll-top-button'),
};

const lightbox = new SimpleLightbox('.photo-link');
const pixabayAPI = new PixabayAPI();
let contentPagesLeft = 0;

/** Listeners*/
refs.searchForm.addEventListener('submit', submitQuery);
refs.toTopBtn.addEventListener('click', scrollToTop);

/** Functions */
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

  /**removes focus from the input field after submit */
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
  });
}

function loadMorePics() {
  pixabayAPI.incrementPageNumber();

  pixabayAPI.fetchPhotos().then(({ hits }) => {
    if (contentPagesLeft <= 0) {
      Notify.info("We're sorry, but you've reached the end of search results.");
    }

    contentPagesLeft -= 1;

    renderMarkup(hits);
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
