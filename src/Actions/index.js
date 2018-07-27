import axios from 'axios';

export const LOGIN_USER = 'LOGIN_USER';
export const GET_DASHBOARD = 'GET_DASHBOARD';

const ROOT_URL = `http://524959da.ngrok.io/marvel`;

export function loginUser(data) {
    const params = { email: data.email, password: data.password };

    const request = axios.post(`${ROOT_URL}/login`, params, {headers: {'content-type': 'application/json'}});

    return {
        type: LOGIN_USER,
        payload: request
    };
}

export function getDashboard() {
    const token = sessionStorage.getItem('SessionToken');

    const request = axios.get(`${ROOT_URL}/api/user/detail`, { 'headers': { jwttoken: token } });

    return {
        type: GET_DASHBOARD,
        payload: request
    };
}