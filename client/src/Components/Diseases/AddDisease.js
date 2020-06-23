import React from 'react';
import { createDisease } from '../../Api/Disease';

class AddDisease extends React.Component {
	state = {
		title: ''
	};

	handleTitleChange = (e) => {
		this.setState({
			title: e.currentTarget.value
		});
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const res = await createDisease(this.state);
		console.log(res);
		if (res.status === 200) {
			this.props.history.push('/diseases');
		}
	};

	render() {
		return (
			<div className="container">
				<h2 className="my-5">Create a new Disease</h2>
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
					<button className="btn btn-primary btn-raised">Add Disease</button>
				</form>
			</div>
		);
	}
}
export default AddDisease;