import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import UserService from "./services/UserService"
import MovieService from "./services/MovieService";

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token'),
        user : {},
        movies: []
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, token, user){
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
        },
        rec_success(state, movies){
            state.movies = movies
        }
    },
    actions: {
        login({commit}, formData){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                UserService.login(formData)
                // axios({url: 'http://localhost:8000/login', data: formData, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.access_token
                        const user = formData.username
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                        commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })

        },
        logout({commit}){
            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        recommend({commit}, formData){
            return new Promise((resolve, reject) =>{
                MovieService.getRecommendations(formData)
                    .then( resp => {
                        const movies = resp.data
                        commit('rec_success', movies)
                        resolve(resp)
                    })
                    .catch( err => {
                        reject(err)
                    })
            })
        }

    },
    getters : {
        isLoggedIn: state => !!state.token,
        // isLoggedIn: true,
        authStatus: state => state.status,
    }
})