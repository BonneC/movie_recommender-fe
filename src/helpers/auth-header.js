import store from "../store";


export function authHeader() {
    // return authorization header with jwt token
    return {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + store.state.token
    }
}
