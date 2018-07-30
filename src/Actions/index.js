import axios from 'axios';

export const LOGIN_USER = 'LOGIN_USER';
export const GET_DASHBOARD = 'GET_DASHBOARD';
export const USER_DETAILS = 'USER_DETAILS';

const ROOT_URL = `http://df4f01fc.ngrok.io/marvel`;

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

    const request1 = axios.get(`${ROOT_URL}/users`);

    return {
        type: GET_DASHBOARD,
        payload: request
    };
}

export function getUserDetails() {
    const request = axios.get(`${ROOT_URL}/users`);

    return {
        type: GET_DASHBOARD,
        payload: request
    };
}