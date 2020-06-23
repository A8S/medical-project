import { serverUrl } from '../variables';
import axios from 'axios';

export const subscribe = (data) => {
	return axios({
		method: 'post',
		url: `${serverUrl}/api/subscribe`,
		data: data
	})
		.then(function(response) {
			return response;
		})
		.catch(function(error) {
			return error;
		});
};
