import { serverUrl } from '../variables';
import axios from 'axios';

// Get all
export const getDiseases = () => {
	return fetch(`${serverUrl}/api/diseases`, {
		method: 'GET'
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

export const createDisease = async (disease) => {
	return axios({
		method: 'post',
		url: `${serverUrl}/api/disease`,
		data: disease
	})
		.then(function(response) {
			return response;
		})
		.catch(function(error) {
			return error;
		});
};

// Read
export const getDisease = (dId) => {
	return fetch(`${serverUrl}/api/diseases/${dId}`, {
		method: 'GET'
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// Delete
export const deleteDisease = (dId) => {
	return fetch(`${serverUrl}/api/disease/delete/${dId}`, {
		method: 'DELETE'
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// Update
export const updateDisease = (dId, disease) => {
	console.log(dId);
	console.log(disease);
	return axios({
		method: 'put',
		url: `${serverUrl}/api/disease/${dId}`,
		data: disease
	})
		.then(function(response) {
			return response;
		})
		.catch(function(error) {
			return error;
		});
};
