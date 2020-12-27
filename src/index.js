/*
 * - Пагинация
 *   - страница и кол-во на странице
 * - Загружаем статьи при сабмите формы
 * - Загружаем статьи при нажатии на кнопку «Загрузить еще»
 * - Обновляем страницу в параметрах запроса
 * - Рисуем статьи
 * - Сброс значения при поиске по новому критерию
 *
 * https://newsapi.org/
 * 4330ebfabc654a6992c2aa792f3173a3
 * http://newsapi.org/v2/everything?q=cat&language=en&pageSize=5&page=1
 */

import css from "./css/styles.css";
import articlesTpl from './templates/articles.hbs';
import NewsApiServise from './js/news-servise.js';
import LoadMoreBtn from './js/load-more-btn.js';

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.js-articles-container'),
    // loadMore: document.querySelector('[data-action="load-more"]'),
};

const newsApiServise = new NewsApiServise;
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
// loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
//rendering ->
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
    e.preventDefault();
    
    newsApiServise.query = e.currentTarget.elements.query.value;
    if (newsApiServise.query === '') {
        return alert('Неверный запрос')
    };
    
    loadMoreBtn.show();
    newsApiServise.resetPage();
    clearArticlesContainer();
    // loadMoreBtn.disable();
    // newsApiServise.fetchArticles().then(articles => {
    //     appendArticlesMakrup(articles);
    //     loadMoreBtn.enable();
    // });
    //rendering ->
    fetchArticles();
};
// function onLoadMore() {
//     loadMoreBtn.disable();
//     newsApiServise.fetchArticles(searchQuery).then(articles => {
//         appendArticlesMakrup(articles);
//         loadMoreBtn.enable();
//     });
// };
//rendering ->
function fetchArticles() {
    loadMoreBtn.disable();
    newsApiServise.fetchArticles().then(articles => {
        appendArticlesMakrup(articles);
        loadMoreBtn.enable();
    });
};

function appendArticlesMakrup(articles) {
    refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles))
};
function clearArticlesContainer() {
    refs.articlesContainer.innerHTML = ''
};