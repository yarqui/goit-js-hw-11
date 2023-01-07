const pageSize = 12;
const refs = {
  articles: document.getElementById('articles'),
  scrollUpBtn: document.getElementById('scrollUp'),
};

let currentPage = 1;
let isEverythingLoaded = false;
let totalPages = 100 / pageSize;

const fetchNews = async () => {
  const urlAPI = `http://localhost:3000/articles?_page=${currentPage}&_limit=${pageSize}`;

  // const response = await fetch(urlAPI);
  // return await response.json()

  const { data } = await axios.get(urlAPI);
  return data;
};

const createArticlesElements = articles => {
  return articles
    .map(({ title, description, url, urlToImage }) => {
      return `<article class="news">
    <h2>${title}</h2>
    <div>${description}</div>
    <img src="${urlToImage}" alt="${title}" loading="lazy">
    <a href="${url}" class="news-link" target="_blank">more</a>
  </article>`;
    })
    .join('');
};

/** Listeners */
window.addEventListener('load', async e => {
  const articles = await fetchNews();
  const elements = createArticlesElements(articles);

  refs.articles.innerHTML = '';
  refs.articles.insertAdjacentHTML('beforeend', elements);
});

const throttled = _.throttle(async () => {
  if (isEverythingLoaded) return;

  const body = document.body,
    html = document.documentElement;
  const totalHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  const pixelsToBottom = totalHeight - window.innerHeight - window.scrollY;

  if (pixelsToBottom < 450) {
    currentPage += 1;
    isEverythingLoaded = currentPage >= totalPages;

    const articles = await fetchNews();
    const elements = createArticlesElements(articles);

    refs.articles.insertAdjacentHTML('beforeend', elements);
  }
}, 500);

window.addEventListener('scroll', throttled);
