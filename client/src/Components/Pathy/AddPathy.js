import React from 'react';
import './style.css';
import { createPathy } from '../../Api/pathys';

class AddPathy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			effective: '',
			description: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = name => event => {
		this.setState({
			[name.trim()]: event.target.value,
		});
	};

	handleSubmit = async event => {
		const { title, description, effective } = this.state;
		var object = {
			title,
			description,
			effective,
		};

		const res = await createPathy(object);
		console.log('ddnjsanjsnfjnfjansdsan');
		event.preventDefault();
		createPathy(this.state.title, this.state.description, this.state.effective);
	};

	render() {
		return (
			<div className="container">
				<br />
				<a href="/pathy" className="mb-3">
					<i className="fa fa-arrow-left" /> Back
				</a>
				<br /> <br />
				<div className="card">
					<div className="card-body">
						<div className="card-title">Add New Pathy</div>
						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<label>Name of Pathy</label>
								<input
									type="text"
									className="form-control"
									name="title"
									value={this.state.title}
									onChange={this.handleChange('title')}
								/>
							</div>
							<div className="form-group">
								<label>Most effective for</label>
								<select
									className="form-control"
									name="effective"
									value={this.state.effective}
									onChange={this.handleChange('effective')}
								>
									<option>Select Disease</option>
									<option>Cancer</option>
									<option>Arthritis</option>
									<option>ENT</option>
									<option>Asthma</option>
								</select>
							</div>
							<div className="form-group">
								<label>Description</label>
								<textarea
									style={{ height: '100px' }}
									className="form-control"
									name="description"
									value={this.state.description}
									onChange={this.handleChange('description')}
								/>
							</div>
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default AddPathy;
