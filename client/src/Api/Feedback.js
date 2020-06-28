import { serverUrl } from '../variables';
import axios from 'axios';

// Get all
export const getFeedbacks = () => {
	return fetch(`${serverUrl}/api/feedbacks`, {
		method: 'GET',
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const createFeedback = async feedback => {
	console.log(feedback);
	return axios({
		method: 'post',
		url: `${serverUrl}/api/feedback`,
		data: feedback,
	})
		.then(function(response) {
			return response;
		})
		.catch(function(error) {
			return error;
		});
};
