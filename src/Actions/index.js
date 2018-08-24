import axios from 'axios';

export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const GET_DASHBOARD = 'GET_DASHBOARD';
export const GET_USER_DASHBOARD = 'GET_USER_DASHBOARD';
export const POST_USER_DASHBOARD = 'PUT_USER_DASHBOARD';
export const DELETE_USER_DASHBOARD = 'DELETE_USER_DASHBOARD';
export const USER_DATA = 'USER_DATA';
export const USER_ACCEPT = 'USER_ACCEPT';
export const USER_DECLINE = 'USER_DECLINE';
export const EMPTY_STATE_USERACCESSDATA = 'EMPTY_STATE_USERACCESSDATA';
export const GET_CONFIGURATIONS = 'GET_CONFIGURATIONS';
export const SET_CONFIGURATIONS = 'SET_CONFIGURATIONS';
export const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';
export const GET_VELOCITY_CHART_DATA = 'GET_VELOCITY_CHART_DATA';
export const GET_ALL_FIX_VERSION = 'GET_ALL_FIX_VERSION';
export const GET_ALL_COMPONENT = 'GET_ALL_COMPONENT';
export const GET_FIX_VERSION_CHART_DATA = 'GET_FIX_VERSION_CHART_DATA';
export const GET_COMPONENT_CHART_DATA = 'GET_COMPONENT_CHART_DATA';
export const GET_TEAM_VELOCITY_CHART_DATA = 'GET_TEAM_VELOCITY_CHART_DATA';
export const GET_RELEASE_BURNDOWN_CHART_DATA = 'GET_RELEASE_BURNDOWN_CHART_DATA';
export const GET_PLAN_VS_ACTUAL_CHART_DATA = 'GET_PLAN_VS_ACTUAL_CHART_DATA';
export const GENERATE_VELOCITY_DATA = 'GENERATE_VELOCITY_DATA';
export const GENERATE_EPIC_DATA = 'GENERATE_EPIC_DATA';
export const EPIC_PERCENTAGE_COMPLETETION = 'EPIC_PERCENTAGE_COMPLETETION';
export const CURRENT_SPRINT_REPORT_DATA = 'CURRENT_SPRINT_REPORT_DATA';

const ROOT_URL = `http://8c14fbc7.ngrok.io/marvel`;

const graphSettingsBaseUrl = '/api/super_admin/graph/';
const token = sessionStorage.getItem('SessionToken');


export function signupUser(data) {
	const params = { eid: data.eid, name: data.name, email: data.email, password: data.password };

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

	return axios.get(`${ROOT_URL}/api/user/detail`, { headers: { jwttoken: token } }).then(response => {
		return {
			type: GET_DASHBOARD,
			payload: response
		};
	}).catch((error) => {
		console.error(error);
	});
}

export function getUserDetails() {
	const request = axios.get(`${ROOT_URL}/users`);

	return {
		type: USER_DATA,
		payload: request
	};
}

export function updateUserStatus(status, params) {
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
	return request.then(response => {
		return {
			type: GET_FIX_VERSION_CHART_DATA,
			payload: response,
			id: params
		};
	});
}

export function getAllComponents() {
	const ProjectID = sessionStorage.getItem('PId');
	const request = axios.get(`${ROOT_URL}/api/super_admin/graph/${ProjectID}/components`, { headers: { jwttoken: token } });

	return {
		type: GET_ALL_COMPONENT,
		payload: request
	};
}

export function getComponentChartData(params) {
	const ProjectID = sessionStorage.getItem('PId');
	const request = axios.post(`${ROOT_URL}/api/super_admin/graph/${ProjectID}/components`, params, { headers: { jwttoken: token } });
	return request.then(response => {
		return {
			type: GET_COMPONENT_CHART_DATA,
			payload: response,
			id: params
		};
	});
}

export function getReleaseBurndownChartData() {
	const ProjectID = sessionStorage.getItem('PId');
	const request = axios.get(`${ROOT_URL}/api/super_admin/graph/${ProjectID}/sprint_report`, { headers: { jwttoken: token } });
	return request.then(response => {
		return {
			type: GET_RELEASE_BURNDOWN_CHART_DATA,
			payload: response
		};
	});
}

export function getTeamVelocityChartData() {
	const ProjectID = sessionStorage.getItem('PId');
	const request = axios.get(`${ROOT_URL}/api/super_admin/graph/${ProjectID}/sprint_report`, { headers: { jwttoken: token } });
	return request.then(response => {
		return {
			type: GET_TEAM_VELOCITY_CHART_DATA,
			payload: response
		};
	});
}

export function getPlanVsActualChartData() {
	const ProjectID = sessionStorage.getItem('PId');
	const request = axios.get(`${ROOT_URL}/api/super_admin/graph/${ProjectID}/sprint_report`, { headers: { jwttoken: token } });
	return request.then(response => {
		return {
			type: GET_PLAN_VS_ACTUAL_CHART_DATA,
			payload: response
		};
	});
}

export function generateEpicData() {
	const ProjectID = sessionStorage.getItem('PId');
	const request = axios.get(`${ROOT_URL}/api/super_admin/reports/${ProjectID}/epic/generate`, { headers: { jwttoken: token } });
	return request.then(response => {
		return {
			type: GENERATE_EPIC_DATA,
			payload: response
		};
	});
}

export function generateVelocityData() {
	const ProjectID = sessionStorage.getItem('PId');
	const request = axios.get(`${ROOT_URL}/api/super_admin/reports/${ProjectID}/velocity/generate`, { headers: { jwttoken: token } });
	return request.then(response => {
		return {
			type: GENERATE_VELOCITY_DATA,
			payload: response
		};
	});
}

export function getEpicSumByTeamEpic(params) {
	const ProjectID = sessionStorage.getItem('PId');
	const request = axios.post(`${ROOT_URL}/api/super_admin/graph/${ProjectID}/level`, params, { headers: { jwttoken: token } });
	return request.then(response => {
		return {
			type: EPIC_PERCENTAGE_COMPLETETION,
			payload: response,
			id: params
		};
	});
}

export function getCurrentSprintReportData() {
	const ProjectID = sessionStorage.getItem('PId');
	const request = axios.get(`${ROOT_URL}/api/super_admin/graph/${ProjectID}/sprint-status`, { headers: { jwttoken: token } });
	return request.then(response => {
		return {
			type: CURRENT_SPRINT_REPORT_DATA,
			payload: response
		};
	});
}

export function postUserDashboard(data) {
	const projectID = sessionStorage.getItem('PId');
	const params = { graphId: data.graphId, graphSubId: data.graphSubId, settings: data.settings };
	const request = axios.post(
		`${ROOT_URL}${graphSettingsBaseUrl}${projectID}/configuration/update`,
		params,
		{ 
			headers: { 
				jwttoken: token,
				'content-type': 'application/json'
			}
		}
	);

	return {
		type: POST_USER_DASHBOARD,
		payload: request
	};
}

export function getUserDashboard() {
	const projectID = sessionStorage.getItem('PId');
	const request = axios.get(
		`${ROOT_URL}${graphSettingsBaseUrl}${projectID}/configuration`,
		{ 
			headers: { 
				jwttoken: token,
				'content-type': 'application/json'
			}
		}
	);

	return request.then(response => {
		return {
			type: GET_USER_DASHBOARD,
			payload: response
		};
	});
}

export function removeUserDashboard(data) {
	const projectID = sessionStorage.getItem('PId');
	const params = { graphId: data.graphId, graphSubId: data.graphSubId };
	const request = axios.delete(
		`${ROOT_URL}${graphSettingsBaseUrl}${projectID}/configuration/delete`,
		{ 
			data: params,
			headers: { 
				jwttoken: token,
				'content-type': 'application/json'
			}
		}
	);

	return request.then(response => {
		return {
			type: DELETE_USER_DASHBOARD,
			payload: response
		};
	});
}