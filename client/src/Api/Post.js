import { serverUrl } from '../variables';
import axios from 'axios';

export const create = async (userId, token, post) => {
	try {
		const response = await fetch(`${serverUrl}/api/post/new/${userId}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: post,
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};

// export const list = async () => {
// 	try {
// 		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`, {
// 			method: 'GET',
// 		});
// 		return response.json();
// 	} catch (err) {
// 		return console.log(err);
// 	}
// };

// with pagination
export const list = page => {
	return fetch(`${serverUrl}/api/posts/?page=${page}`, {
		method: 'GET',
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

var raw = JSON.stringify({ tags: ['cancer'] });
export const relatedPost = tags => {
	return fetch(`${serverUrl}/api/post/tags`, {
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify({ tags: tags }),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const singlePost = postId => {
	return fetch(`${serverUrl}/api/post/${postId}`, {
		method: 'GET',
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const listByUser = async (userId, token) => {
	try {
		const response = await fetch(`${serverUrl}/api/posts/by/${userId}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return response.json();
	} catch (err) {
		return console.log(err);
	}
};

export const remove = (postId, token) => {
	return fetch(`${serverUrl}/api/post/${postId}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const update = (postId, token, post) => {
	console.log(postId, token, post);
	return fetch(`${serverUrl}/api/post/${postId}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: post,
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const like = (userId, postId) => {
	return fetch(`${serverUrl}/api/post/like`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userId, postId }),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};

export const unlike = (userId, postId) => {
	return fetch(`${serverUrl}/api/post/unlike`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userId, postId }),
	})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log(err));
};
export const countpost = async () => {
	const counting = await axios.get(`${serverUrl}/api/post/count`);
	console.log(counting);
	return counting.data;
};
