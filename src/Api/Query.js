import { serverUrl } from '../variables';
import axios from 'axios';

export const submitQuery = (data) => {
	return axios({
		method: 'post',
		url: `${serverUrl}/api/submit_query`,
		data: data
	})
		.then(function(response) {
			console.log(response);
			return response;
		})
		.catch(function(error) {
			return error;
		});
};
