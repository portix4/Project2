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

    getTrendingMovies() {
        return this.axiosApp.get(`trending/movie/day?language=es-ES&api_key=${this.api_key}`)
        // https://api.themoviedb.org/3/trending/movie/day?language=en-US
    }

    getHeaderBillboard() {
        return this.axiosApp.get(`movie/now_playing?language=es-ES&api_key=${this.api_key}`)
        // https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1' \

    }

    getTopRatedMovies() {
        return this.axiosApp.get(`/movie/top_rated?language=es-ES&api_key=${this.api_key}`)
        // https://api.themoviedb.org/3/movie/top_rated?language=es-ES&page=1        
    }

    getUpcomingMedia() {
        return this.axiosApp.get(`movie/upcoming?language=es-ES&page=1&region=ES&api_key=${this.api_key}`)
        // https://api.themoviedb.org/3/movie/upcoming?language=es-ES&page=1&region=ES   \ 
    }

}

const moviesService = new movieService()

module.exports = moviesService