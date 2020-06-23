import { serverUrl } from '../variables';
import axios from 'axios';

export const createSubdisease = async (subdisease, dId) => {
	console.log(subdisease);
	console.log(dId);
	return axios({
		method: 'post',
		url: `${serverUrl}/api/pathy/${dId}`,
		data: subdisease
	})
		.then(function(response) {
			return response;
		})
		.catch(function(error) {
			return error;
		});

};

// Read
export const getSubdisease = (sdId) => {
	return fetch(`${serverUrl}/api/pathys/${sdId}`, {
		method: 'GET'
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// Delete
export const deleteSubdisease = (sdId) => {
	return fetch(`${serverUrl}/api/pathys/delete/${sdId}`, {
		method: 'DELETE'
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

// Update
export const updateSubdisease = (sdId, subdisease) => {
	console.log(sdId);
	console.log(subdisease);
	return axios({
		method: 'put',
		url: `${serverUrl}/api/pathy/${sdId}`,
		data: subdisease
	})
		.then(function(response) {
			return response;
		})
		.catch(function(error) {
			return error;
		});
};
