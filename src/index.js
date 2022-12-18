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

function onSubmit(e) {
  e.preventDefault();

  let inputValue = refs.input.value.trim();

  if (!inputValue) {
    return;
  }

  fetchPhotos(inputValue)
    .then(data => {
      console.log(data);
    })
    .catch(error => error.message);
}

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.

function renderMarkup(res) {
  // if ((res.total = 0)) {
  //   Notify.warning(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   );
  // }
  // console.log(res.total);
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
