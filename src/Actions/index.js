	import axios from 'axios';

export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const GET_DASHBOARD = 'GET_DASHBOARD';
export const USER_DATA = 'USER_DATA';
export const USER_ACCEPT = 'USER_ACCEPT';
export const USER_DECLINE = 'USER_DECLINE';
export const EMPTY_STATE_USERACCESSDATA = 'EMPTY_STATE_USERACCESSDATA';
export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';

const ROOT_URL = `http://1d70d34b.ngrok.io/marvel`;

export function signupUser(data) {
	const params = { eid: data.eid, name: data.name, email: data.email, password: data.password, role: data.role };

	const request = axios.post(`${ROOT_URL}/registration`, params, { headers: { 'content-type': 'application/json' } }); //axios.get('https://jsonplaceholder.typicode.com/todos')

	return {
		type: SIGNUP_USER,
		payload: request
	};
}

export function loginUser(data) {
	const params = { email: data.email, password: data.password };

	const request = axios.post(`${ROOT_URL}/login`, params, { headers: { 'content-type': 'application/json' } });

	return {
		type: LOGIN_USER,
		payload: request
	};
}

export function getDashboard() {
	const token = sessionStorage.getItem('SessionToken');

	const request = axios.get(`${ROOT_URL}/api/user/detail`, { headers: { jwttoken: token } });

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

export function updateUserStatus(email, status, role) {
	const params = {
		projects: [
			{
				name: 'newscycle',
				host: 'newscycle.com'
			}
		],
		email,
		role
	};

	const token = sessionStorage.getItem('SessionToken');

	if (status === 'approved') {
		const request = axios.post(`${ROOT_URL}/api/super_admin/requests/action/grant`, params, {
			headers: { jwttoken: token }
		});

		return {
			type: USER_ACCEPT,
			payload: request
		};
	} else if (status === 'declined') {
        const request = axios.post(`${ROOT_URL}/api/super_admin/requests/action/reject`, params, {
            headers: { jwttoken: token }
        });

        return {
            type: USER_DECLINE,
            payload: request
        };
    }
}

export function emptyuserAccessData() {
	return {
		type: EMPTY_STATE_USERACCESSDATA
	};
}

export function getAllProjectData() {
	const token = sessionStorage.getItem('SessionToken');
	const request = axios.get(`${ROOT_URL}/api/super_admin/project`, {
		headers: { jwttoken: token }
	});

	return {
		type: GET_ALL_PROJECTS,
		payload: request
	}
}