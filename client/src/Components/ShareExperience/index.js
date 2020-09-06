import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../Api';
import { create } from '../../Api/Post';
import loader from '../../Images/loader2.gif';
import { serverUrl } from '../variables';

import { Multiselect } from 'multiselect-react-dropdown';
// import imageToBase64 from 'image-to-base64';

class NewPost extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			body: '',
			description: '',
			plainArray: ['Acidity', 'Asthama', 'Breast Cancer', 'Diabetes','Joint Pain', 'Psoriasis'],
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
			imgPreviewUrl: '',
			imgLoading: false,
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
	};
	handlePhotoChange = name => event => {
		event.preventDefault();
		this.setState({
			imgLoading: true,
		});
		let reader = new FileReader();
		const value = event.target.files[0];
		this.postData.set('photo', value, event.target.files[0].size);

		reader.onloadend = () => {
			this.setState({
				imgPreviewUrl: reader.result,
				imgLoading: false,
			});
		};
		reader.readAsDataURL(value);
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
		// console.log(this.state.tags);

		this.postData.set('tags', this.state.tags.concat(this.state.selectedValues));

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
		error,
		loading,
		redirectToPosts,
		treatmentTaken,
		description,
		plainArray,
		selectedValues,
		customTag,
		imgPreview,
	) => (
		<form>
			<div className="form-group preview">
				{this.state.imgLoading ? (
					<div>
						<img src={loader} alt="Loading..." />
					</div>
				) : (
					imgPreview
				)}
			</div>
			<div className="form-group">
				<label className="text-muted">Profile Photo</label>
				<input
					onChange={this.handlePhotoChange('photo')}
					type="file"
					accept="image/*"
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Title of the Post</label>
				<input
					onChange={this.handleChange('title')}
					type="text"
					className="form-control"
					value={title}
					placeholder= "Give your post a title"
				/>
			</div>
			<div className="form-group">
				<label className="text-muted">Summary</label>
				<input
					onChange={this.handleChange('description')}
					type="text"
					className="form-control"
					value={description}
					placeholder= "Add a bit summary of your experience"
				/>
			</div>

			<Multiselect
				options={plainArray}
				isObject={false}
				ref={this.multiselectRef}
				onSelect={this.getSelectedValues}
				showCheckbox={true}
				closeOnSelect={false}
				placeholder= "Select disease name"
				label= "Disease Name"
			/>
			<div className="form-group">
				<label className="text-muted">Add Custom Disease Name</label>
				<input
					onChange={this.handleChange('customTag')}
					type="text"
					className="form-control"
					onKeyPress={this.addTag}
					value={customTag}
					placeholder= "Add disease name manually"
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Treatment Taken</label>
				<textarea
					onChange={this.handleChange('treatmentTaken')}
					type="text"
					className="form-control"
					value={treatmentTaken}
					placeholder= "Describe the treatment you have taken"
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Detailed Description</label>
				<textarea
					onChange={this.handleChange('body')}
					type="text"
					className="form-control"
					value={body}
					placeholder= "Add additional details of your experience"
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
		let imgPreview = null;
		if (this.state.imgPreviewUrl) {
			imgPreview = <img src={this.state.imgPreviewUrl} style={{ width: '400px' }} />;
		} else {
			imgPreview = <h3>Select an Image</h3>;
		}
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
					error,
					loading,
					redirectToPosts,
					treatmentTaken,
					description,
					plainArray,
					selectedValues,
					customTag,
					imgPreview,
				)}
			</div>
		);
	}
}

export default NewPost;
