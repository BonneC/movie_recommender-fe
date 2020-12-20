import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    login(formData) {
        return apiClient.post('/login',

                // username: formData.username,
                // password: formData.password
                formData

            , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
    },
}