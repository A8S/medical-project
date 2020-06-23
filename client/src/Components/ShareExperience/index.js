/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prefer-destructuring */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../Api';
import { create } from '../../Api/Post';
import loader from '../../Images/loader2.gif';
import { serverUrl } from '../variables';

import { Multiselect } from 'multiselect-react-dropdown';

class NewPost extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			body: '',
			description: '',
			plainArray: ['cancer', 'corona', 'lung', 'diabetes', 'aids', 'ebola', 'stroke', 'flu'],
			selectedValues: [],
			treatmentTaken: '',
			photo: '',
			error: '',
			user: {},
			fileSize: 0,
			loading: false,
			redirectToPosts: false,
			customTag: '',
			tags: [],
		};
		this.multiselectRef = React.createRef();
	}

	componentDidMount() {
		this.postData = new FormData();
		this.setState({ user: isAuthenticated().user });
	}

	isValid = () => {
		const { title, body, fileSize } = this.state;
		if (fileSize > 100000) {
			this.setState({
				error: 'File size should be less than 100kb',
				loading: false,
			});
			return false;
		}
		if (title.length === 0 || body.length === 0) {
			this.setState({ error: 'All fields are required', loading: false });
			return false;
		}
		return true;
	};

	handleChange = name => event => {
		this.setState({ error: '' });
		const value = name === 'photo' ? event.target.files[0] : event.target.value;

		const fileSize = name === 'photo' ? event.target.files[0].size : 0;
		this.postData.set(name, value);
		console.log(this.postData);
		this.setState({ [name]: value, fileSize });
		event.preventDefault();
	};

	getSelectedValues = () => {
		this.setState({ tags: this.multiselectRef.current.getSelectedItems() });
	};

	addTag = event => {
		if (event.key === 'Enter') {
			let lowercase = this.state.customTag.toLowerCase();
			this.setState({
				selectedValues: [...this.state.selectedValues, lowercase],
			});

			this.setState({
				plainArray: [...this.state.plainArray, lowercase],
			});

			this.state.customTag = '';

			event.preventDefault();
		}
	};

	clickSubmit = event => {
		event.preventDefault();
		this.setState({ loading: true });
		console.log(this.state.tags);

		this.postData.set('tags', [...this.state.tags, ...this.state.selectedValues]);

		if (this.isValid()) {
			const userId = isAuthenticated().user._id;
			const token = isAuthenticated().token;

			create(userId, token, this.postData).then(data => {
				if (data.error) this.setState({ error: data.error });
				else {
					this.setState({
						loading: false,
						title: '',
						description: '',
						treatmentTaken: '',
						body: '',
						redirectToPosts: true,
					});
					// console.log('New Post:', data);
				}
			});
		}
	};

	newPostForm = (
		title,
		body,
		treatmentTaken,
		description,
		plainArray,
		selectedValues,
		customTag,
	) => (
		<form>
			<div className="form-group">
				<label className="text-muted">Profile Photo</label>
				<input
					onChange={this.handleChange('photo')}
					type="file"
					accept="image/*"
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Title</label>
				<input
					onChange={this.handleChange('title')}
					type="text"
					className="form-control"
					value={title}
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Summary</label>
				<input
					onChange={this.handleChange('description')}
					type="text"
					className="form-control"
					value={description}
				/>
			</div>

			<Multiselect
				options={plainArray}
				isObject={false}
				ref={this.multiselectRef}
				onSelect={this.getSelectedValues}
				showCheckbox={true}
				closeOnSelect={false}
			/>
			<div className="form-group">
				<label className="text-muted">Add Custom Tags</label>
				<input
					onChange={this.handleChange('customTag')}
					type="text"
					className="form-control"
					onKeyPress={this.addTag}
					value={customTag}
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Treatment Taken</label>
				<textarea
					onChange={this.handleChange('treatmentTaken')}
					type="text"
					className="form-control"
					value={treatmentTaken}
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Detailed Description</label>
				<textarea
					onChange={this.handleChange('body')}
					type="text"
					className="form-control"
					value={body}
				/>
			</div>

			<button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
				Create Post
			</button>
		</form>
	);

	render() {
		const {
			title,
			body,
			error,
			loading,
			redirectToPosts,
			treatmentTaken,
			description,
			plainArray,
			selectedValues,
			customTag,
		} = this.state;

		if (redirectToPosts) {
			return <Redirect to="/posts" />;
		}

		return (
			<div className="container">
				<h2 className="my-5">Create a new post</h2>
				<div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
					{error}
				</div>

				{loading ? (
					<div>
						<img src={loader} alt="Loading..." />
					</div>
				) : (
					''
				)}

				{this.newPostForm(
					title,
					body,
					treatmentTaken,
					description,
					plainArray,
					selectedValues,
					customTag,
				)}
			</div>
		);
	}
}

export default NewPost;
