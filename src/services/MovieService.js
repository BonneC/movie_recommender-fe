import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
})

export default {
    getMovies() {
        return apiClient.get('/movies')
    },
    getRecommendations() {
        return apiClient.get('/movies/recommended/')
    },
    getMovie(id) {
        return apiClient.get('/movie/' + id)
    },
    postMovie(movieInfo) {
        return apiClient.post('/movies/'+ movieInfo.id, {}
            ,{
                params: {
                    name: movieInfo.rating
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
    },
    putMovie(movieInfo) {
        return apiClient.put('/movies/' + movieInfo.id, {}
            ,{
                params: {
                    rating: movieInfo.rating
                },
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
    },
}