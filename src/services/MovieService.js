import axios from 'axios'
import {authHeader} from "../helpers/auth-header";


const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: false,
    // headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + store.state.token
    // }
})

export default {
    getMovies() {
        return apiClient.get('/movies', {headers: authHeader()})
    },
    getRecommendations() {
        return apiClient.get('/movies/recommended/', {headers: authHeader()})
    },
    getMovie(id) {
        return apiClient.get('/movie/' + id, {headers: authHeader()})
    },
    postMovie(movieInfo) {
        return apiClient.post('/movies/' + movieInfo.id, {}
            , {
                params: {
                    name: movieInfo.rating
                },
                headers: authHeader()
            })
    },
    putMovie(movieInfo) {
        return apiClient.put('/movies/' + movieInfo.id, {}
            , {
                params: {
                    rating: movieInfo.rating
                },
                headers: authHeader()
            })
    },
    deleteMovie(id) {
        return apiClient.delete('/movies/' + id, {headers: authHeader()})
    }
}