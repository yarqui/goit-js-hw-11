function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=n.parcelRequirea610;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){o[e]=n},n.parcelRequirea610=r);var i=r("eWCmQ"),a=r("fZKcF"),l=r("7tL9G");const s={searchForm:document.getElementById("search-form"),input:document.querySelector(".search-form__input"),submitBtn:document.querySelector(".search-form__submit-button"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more"),toTopBtn:document.querySelector(".scroll-top-button")},u=new(e(a))(".photo-link"),c=new(0,l.default);let d=0;function f(e){m(s.loadMoreBtn),e.map((e=>{const{webformatURL:n,largeImageURL:t,tags:o,likes:r,views:i,comments:a,downloads:l}=e,c=`<div class="photo-card">\n    <a class="photo-link" href="${t}">\n      <img src="${n}" alt="${o}" loading="lazy" width="305px" height="200px"/>\n    </a>\n    <div class="info">\n      <p class="info-item">\n        <b>Likes</b>\n        ${r}\n      </p>\n      <p class="info-item">\n        <b>Views</b>\n        ${i}\n      </p>\n      <p class="info-item">\n        <b>Comments</b>\n        ${a}\n      </p>\n      <p class="info-item">\n        <b>Downloads</b>\n        ${l}\n      </p>\n    </div>\n  </div>`;s.gallery.insertAdjacentHTML("beforeend",c),u.refresh(),h(s.loadMoreBtn)}))}function m(e){return e.classList.add("visually-hidden")}function h(e){return e.classList.remove("visually-hidden")}s.searchForm.addEventListener("submit",(function(e){e.preventDefault();let n=s.input.value.trim();if(!n||n===c.getQuery())return;s.input.value=n,s.input.blur(),c.setQuery(n),c.resetPageNumber(),c.fetchPhotos().then((({hits:e,totalHits:n})=>{var t;0!==e.length?(i.Notify.info(`Hooray! We found ${n} images.`),d=Math.ceil(n/e.length-1),t=e,s.gallery.innerHTML="",f(t),h(s.toTopBtn)):i.Notify.failure("Sorry, there are no images matching your search query. Please try again.")})).catch((e=>e.message))})),s.loadMoreBtn.addEventListener("click",(function(){c.incrementPageNumber(),c.fetchPhotos().then((({hits:e})=>{d<=0&&i.Notify.info("We're sorry, but you've reached the end of search results.",m(s.loadMoreBtn)),d-=1,f(e)}))})),s.toTopBtn.addEventListener("click",(function(){window.scrollTo({top:0,behavior:"smooth"})}));
//# sourceMappingURL=gallery_infinite-scroll.2dc7e5aa.js.map
