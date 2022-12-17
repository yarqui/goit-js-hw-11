import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPhotos } from './fetchPhotos.js';

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

const refs = {
  searchForm: document.getElementById('search-form'),
  input: document.querySelector('.search-form__input'),
  submitBtn: document.querySelector('.search-form__submit-button'),
  gallery: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  fetchPhotos(refs.input.value);
});

refs.input.addEventListener('input', onInput);

function onInput(e) {
  let inputValue = e.target.value.trim();

  if (inputValue === '') {
    return;
  }

  //   console.log(inputValue);
  //     .then(renderCountryMarkup)
  //     .catch(() => Notify.failure('Oops, there is no country with that name'));
}
