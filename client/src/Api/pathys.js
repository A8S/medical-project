import { serverUrl } from '../variables';
import axios from 'axios';

export const createPathy = (title, effective, description) => {
	axios({
		method: 'post',
		url: 'https://infinite-harbor-95705.herokuapp.com/api/pathy',
		headers: {
			'Content-Type': 'application/json',
		},
		data: JSON.stringify({ title: title, effective: effective, description: description }),
	})
		.then(function(response) {
			console.log(JSON.stringify(response.data));
		})
		.catch(function(error) {
			console.log(error);
		});
};

// export const createPathy = async pathy => {
// 	// console.log(feedback);
// 	return axios({
// 		method: 'POST',
// 		url: `${serverUrl}/api/pathy/`,
// 		data: pathy,
// 	})
// 		.then(function(response) {
// 			return response;
// 		})
// 		.catch(function(error) {
// 			return error;
// 		});
// };

// Read
export const getPathy = () => {
	return fetch(`${serverUrl}/api/pathys`, {
		method: 'GET',
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

// Delete
// export const deleteSubdisease = sdId => {
// 	return fetch(`${serverUrl}/api/pathys/delete/${sdId}`, {
// 		method: 'DELETE',
// 	})
// 		.then(response => {
// 			return response.json();
// 		})
// 		.catch(err => console.log(err));
// };

// // Update
// export const updateSubdisease = (sdId, subdisease) => {
// 	console.log(sdId);
// 	console.log(subdisease);
// 	return axios({
// 		method: 'put',
// 		url: `${serverUrl}/api/pathy/${sdId}`,
// 		data: subdisease,
// 	})
// 		.then(function(response) {
// 			return response;
// 		})
// 		.catch(function(error) {
// 			return error;
// 		});
// };
