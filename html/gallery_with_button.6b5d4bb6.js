function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},r=t.parcelRequirea610;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},t.parcelRequirea610=r);var i=r("eWCmQ"),l=r("fZKcF"),a=r("7tL9G");const s={searchForm:document.getElementById("search-form"),input:document.querySelector(".search-form__input"),submitBtn:document.querySelector(".search-form__submit-button"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more"),toTopBtn:document.querySelector(".scroll-top-button")},c=new(e(l))(".photo-link"),u=new(0,a.default);let d=0;function f(e){h(s.loadMoreBtn),e.map((e=>{const{webformatURL:t,largeImageURL:n,tags:o,likes:r,views:i,comments:l,downloads:a}=e,u=`<div class="photo-card">\n    <a class="photo-link" href="${n}">\n      <img class="photo-img" src="${t}" alt="${o}" loading="lazy" width="305" height="200"/>\n    </a>\n    <div class="info">\n      <p class="info-item">\n        <b>Likes</b>\n        ${r}\n      </p>\n      <p class="info-item">\n        <b>Views</b>\n        ${i}\n      </p>\n      <p class="info-item">\n        <b>Comments</b>\n        ${l}\n      </p>\n      <p class="info-item">\n        <b>Downloads</b>\n        ${a}\n      </p>\n    </div>\n  </div>`;s.gallery.insertAdjacentHTML("beforeend",u),c.refresh(),m(s.loadMoreBtn)}))}function h(e){return e.classList.add("visually-hidden")}function m(e){return e.classList.remove("visually-hidden")}s.searchForm.addEventListener("submit",(function(e){e.preventDefault();let t=s.input.value.trim();if(!t||t===u.getQuery())return;s.input.value=t,s.input.blur(),u.setQuery(t),u.resetPageNumber(),u.fetchPhotos().then((({hits:e,totalHits:t})=>{var n;0!==e.length?(i.Notify.info(`Hooray! We found ${t} images.`),d=Math.ceil(t/e.length-1),n=e,s.gallery.innerHTML="",f(n),m(s.toTopBtn)):i.Notify.failure("Sorry, there are no images matching your search query. Please try again.")})).catch((e=>e.message))})),s.loadMoreBtn.addEventListener("click",(function(){u.incrementPageNumber(),u.fetchPhotos().then((({hits:e})=>{d<=0&&i.Notify.info("We're sorry, but you've reached the end of search results.",h(s.loadMoreBtn)),d-=1,f(e),function(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:2.2*e,behavior:"smooth"})}()}))})),s.toTopBtn.addEventListener("click",(function(){window.scrollTo({top:0,behavior:"smooth"})}));
//# sourceMappingURL=gallery_with_button.6b5d4bb6.js.map
