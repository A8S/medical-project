import React from 'react';
import { updateDisease } from '../../Api/Disease';
import { isAuthenticated } from '../../Api';

class UpdateDisease extends React.Component {
	state = {
		title: this.props.history.location.state.title
	};

	componentDidMount() {
		// this.setState({ user: isAuthenticated().user });
		if (isAuthenticated()) {
			if (isAuthenticated().user.role === 'admin') {
				this.setState({
					admin: true
				});
			}
		}
	}

	handleTitleChange = (e) => {
		this.setState({
			title: e.currentTarget.value
		});
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		var object = {};
		data.forEach(function(value, key) {
			object[key] = value;
		});
		const res = await updateDisease(this.props.match.params.dId, object);
		console.log(res);
		if (res.status == 200) {
			this.props.history.push('/diseases');
		}
	};

	render() {
		return (
			<div className="container">
				<h2 className="my-5">Update Disease</h2>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label className="text-muted">Disease Name</label>
						<input
							type="text"
							value={this.state.title}
							onChange={this.handleTitleChange}
							className="form-control"
							name="title"
							required
						/>
					</div>
					<button className="btn btn-primary btn-raised">Update Disease</button>
				</form>
			</div>
		);
	}
}
export default UpdateDisease;