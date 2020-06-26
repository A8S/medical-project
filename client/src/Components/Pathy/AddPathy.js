import React from 'react';
import './style.css';

class AddPathy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			mef: '',
			description: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = event => {
		event.preventDefault();
		alert(JSON.stringify(this.state));
		console.log(JSON.stringify(this.state));
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
									name="name"
									value={this.state.name}
									onChange={this.handleChange}
								/>
							</div>
							<div className="form-group">
								<label>Most effective for</label>
								<select
									className="form-control"
									name="mef"
									value={this.state.mef}
									onChange={this.handleChange}
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
									onChange={this.handleChange}
								/>
							</div>
							<button type="Submit" className="btn btn-primary">
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
