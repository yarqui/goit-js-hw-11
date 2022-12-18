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

refs.searchForm.addEventListener('submit', onSubmit);

const lightbox = new SimpleLightbox('.gallery a');

function onSubmit(e) {
  e.preventDefault();

  refs.input.blur();

  const inputValue = refs.input.value.trim();

  refs.input.value = inputValue;

  if (!inputValue) {
    return;
  }

  fetchPhotos(inputValue)
    .then(picArray => {
      refs.gallery.innerHTML = '';

      renderMarkup(picArray);
    })
    .catch(error => error.message);
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
    <a href="${largeImageURL}">
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

    console.log(markup);

    refs.gallery.insertAdjacentHTML('beforeend', markup);
    // return markup;
  });
}
// РОЗМІТКА ДЛЯ КАРТОК
//  ===================================
// <div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>;
// =================================
