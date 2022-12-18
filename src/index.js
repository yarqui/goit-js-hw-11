import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPhotos } from './fetchPhotos.js';

const refs = {
  searchForm: document.getElementById('search-form'),
  input: document.querySelector('.search-form__input'),
  submitBtn: document.querySelector('.search-form__submit-button'),
  gallery: document.querySelector('.gallery'),
};

const lightbox = new SimpleLightbox('.photo-link', {
  // captionsData: 'alt',
  captionDelay: 250,
});

refs.searchForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const inputValue = refs.input.value.trim();

  refs.input.value = inputValue;
  refs.input.blur();

  if (!inputValue) {
    return;
  }

  fetchPhotos(inputValue)
    .then(picArray => {
      refs.gallery.innerHTML = '';

      renderGalleryMarkup(picArray);
    })
    .catch(error => error.message);
}

function renderGalleryMarkup(pictures) {
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
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
  });

  lightbox.refresh();
}
