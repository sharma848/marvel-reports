import axios from 'axios';

export const LOGIN_USER = 'LOGIN_USER';
export const GET_DASHBOARD = 'GET_DASHBOARD';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';

export function loginUser() {
    const request = axios.get(`${ROOT_URL}/posts`);

    return {
        type: LOGIN_USER,
        payload: request
    };
}

// export function getDashboard() {
//     const url = 'http://localhost:1337/742fc666.ngrok.io/marvel/login';

//     const request = axios.post(url, {
//         "email":"jatin@gmail.com",
//         "password":"password"
//         });

//     return {
//         type: GET_DASHBOARD,
//         payload: request
//     };
// }

export function getDashboard() {
    const url = 'https://jsonplaceholder.typicode.com/todos';

    const request = axios.get(url);

    return {
        type: GET_DASHBOARD,
        payload: request
    };
}