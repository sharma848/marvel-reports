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

export function getDashboard() {
    const url = 'https://jsonplaceholder.typicode.com/todos';

    const request = axios.get(url);

    return {
        type: GET_DASHBOARD,
        payload: request
    };
}