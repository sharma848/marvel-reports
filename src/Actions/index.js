import axios from 'axios';

export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const GET_DASHBOARD = 'GET_DASHBOARD';
export const USER_DATA = 'USER_DATA';

const ROOT_URL = `http://42312efe.ngrok.io/marvel`;

export function signupUser(data) {
    const params = { eid: data.eid, name: data.name, email: data.email, password: data.password,  role: data.role};
    
    const request = axios.post(`${ROOT_URL}/registration`, params, {headers: {'content-type': 'application/json'}});  //axios.get('https://jsonplaceholder.typicode.com/todos')

    return {
        type: SIGNUP_USER,
        payload: request
    };
}

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
        type: USER_DATA,
        payload: request
    };
}