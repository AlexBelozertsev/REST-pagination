const API_KEY = '4330ebfabc654a6992c2aa792f3173a3';
const BASE_URL = 'https://newsapi.org/v2';
const options = {
    headers: {
        Authorization: API_KEY,
    },
};

export default class NewsApiServise {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    get query() {
        return this.searchQuery
    };
    set query(query) {
        this.searchQuery = query
    };
    incrementPage() {
        this.page += 1;
    };
    resetPage() {
        this.page = 1;
    };
    fetchArticles() {
        const URL = `${BASE_URL}/everything?q=${this.searchQuery}&language=ru&pageSize=10&page=${this.page}`;

        return fetch(URL, options)
            .then(resp => resp.json())
            .then(data => {
                this.incrementPage();
                return data.articles
            })
//or-> .then(({articles}) => return articles)
    }
}