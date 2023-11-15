const axios = require('axios')

class movieService {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://api.themoviedb.org/3/'
        })
        this.api_key = 'd7ff2504eb0b5a47fda46d49969cc42a'
    }

    getMovieById(movieId) {
        return this.axiosApp.get(`movie/${movieId}?language=es-ES&api_key=${this.api_key}`)
        // https://api.themoviedb.org/3/movie/575264?language=es-ES&api_key=d7ff2504eb0b5a47fda46d49969cc42a    
    }

    getMovieByName(movieName) {
        return this.axiosApp.get(`search/movie?api_key=${this.api_key}&query=${movieName}&language=es-ES`)
    }

    getTrendingMovie() {
        return this.axiosApp.get(`trending/movie/day?language=es-ES&api_key=${this.api_key}`)
        // https://api.themoviedb.org/3/trending/movie/day?language=en-US
    }

    getHeaderBillboard() {
        return this.axiosApp.get(`movie/now_playing?language=es-ES&api_key=${this.api_key}`)
        // https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1' \

    }

    getTrendingSeries() {
        return this.axiosApp.get(`trending/tv/day?language=es-ES&api_key=${this.api_key}`)
        // https://api.themoviedb.org/3/trending/tv/day?language=es-ES&api_key=d7ff2504eb0b5a47fda46d49969cc42a
    }

}

const moviesService = new movieService()

module.exports = moviesService