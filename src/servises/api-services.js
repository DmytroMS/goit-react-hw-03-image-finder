import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '23079700-bbc75e3a6b7c3c448487aea29';

export function getPictures(query, page) {
    return axios.get(`?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${API_KEY}`).then(res => res.data.hits);
}



// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '23079700-bbc75e3a6b7c3c448487aea29';
// const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`

// return fetch(`${URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
// .then(r => r.json())
// .then(data => {
// this.page += 1;
// console.log('after search', this);
// return data.hits
// })

//     } 