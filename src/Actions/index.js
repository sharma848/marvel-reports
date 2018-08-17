import axios from 'axios';

export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const GET_DASHBOARD = 'GET_DASHBOARD';
export const USER_DATA = 'USER_DATA';
export const USER_ACCEPT = 'USER_ACCEPT';
export const USER_DECLINE = 'USER_DECLINE';
export const EMPTY_STATE_USERACCESSDATA = 'EMPTY_STATE_USERACCESSDATA';
export const GET_CONFIGURATIONS = 'GET_CONFIGURATIONS';
export const SET_CONFIGURATIONS = 'SET_CONFIGURATIONS';
export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';
export const GET_VELOCITY_CHART_DATA = 'GET_VELOCITY_CHART_DATA';
export const GET_ALL_FIX_VERSION = 'GET_ALL_FIX_VERSION';
export const GET_FIX_VERSION_CHART_DATA = 'GET_FIX_VERSION_CHART_DATA';

const ROOT_URL = `http://6973ac66.ngrok.io/marvel`;

const token = sessionStorage.getItem('SessionToken');


export function signupUser(data) {
	const params = { eid: data.eid, name: data.name, email: data.email, password: data.password, role: data.role };

	const request = axios.post(`${ROOT_URL}/registration`, params, { headers: { 'content-type': 'application/json' } });

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

export function setConfigurations(params) {
	const PId = sessionStorage.getItem('PId');
	const request = axios.post(`${ROOT_URL}/api/super_admin/configuration/${PId}`, params, { headers: { jwttoken: token } });

	return {
		type: SET_CONFIGURATIONS,
		payload: request
	};
}

export function getConfigurations() {
	const PId = sessionStorage.getItem('PId');
	const request = axios.get(`${ROOT_URL}/api/super_admin/configuration/${PId}`, { headers: { jwttoken: token } });

	return {
		type: GET_CONFIGURATIONS,
		payload: request
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

export function getVelocityChartData() {
	const ProjectID = sessionStorage.getItem('PId');
	const request = axios.get(`${ROOT_URL}/api/super_admin/reports/${ProjectID}/velocity`, { headers: { jwttoken: token } });

	return {
		type: GET_VELOCITY_CHART_DATA,
		payload: request
	};
}

export function getAllFixVersions() {
	const ProjectID = sessionStorage.getItem('PId');
	const request = axios.get(`${ROOT_URL}/api/super_admin/graph/${ProjectID}/fixversions`, { headers: { jwttoken: token } });

	return {
		type: GET_ALL_FIX_VERSION,
		payload: request
	};
}

export function getFixVersioChartData(params) {
	const ProjectID = sessionStorage.getItem('PId');
	const request = axios.post(`${ROOT_URL}/api/super_admin/graph/${ProjectID}/fixversions`, params, { headers: { jwttoken: token } });

	return {
		type: GET_FIX_VERSION_CHART_DATA,
		payload: request
	};
}