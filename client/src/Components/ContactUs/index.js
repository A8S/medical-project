import React, { Component } from 'react';
import { submitQuery } from '../../Api/Query';
import './style.css';

class ContactUs extends Component {
	state = {
		name: '',
		email: '',
		query: '',
	};

	onFormSubmit = event => {
		event.preventDefault();
		submitQuery(this.state).then(data => {
			if (data.status === 200) {
				this.setState({
					name: '',
					email: '',
					query: '',
				});
			}
		});
	};

	onChange = event => {
		const key = event.target.name;
		const value = event.target.value;

		this.setState({
			[key]: value,
		});
	};

	queryForm = () => (
		<form onSubmit={this.onFormSubmit}>
			<div className="form-group">
				<label className="font-weight-bold">Name</label>
				<input
					onChange={this.onChange}
					name="name"
					value={this.state.name}
					placeholder="Name"
					className="form-control"
				/>
			</div>

			<div className="form-group">
				<label className="font-weight-bold">Email</label>
				<input
					onChange={this.onChange}
					type="email"
					className="form-control"
					name="email"
					value={this.state.email}
					placeholder="Email"
				/>
			</div>

			<div className="form-group">
				<label className="font-weight-bold">Query</label>
				<textarea
					onChange={this.onChange}
					className="form-control"
					name="query"
					value={this.state.query}
					placeholder="Write Your Query"
				/>
			</div>

			<button type="submit" className="btn btn-danger mb-3 float-right">
				Submit
			</button>
		</form>
	);

	render() {
		return (
			<div className="container">
				<h2 className="my-5 contactus-heading">Contact Us</h2>
				<p className="lead lead-contactus">
					Tell us about your company, your data, and your analytic goals. We can help you
					use your data to make better decisions. And if you don't currently have the data
					you need, we can help design data-capture and data-management strategies today
					that will power your analytics tomorrow.
				</p>
				<h4 className="contactLine">Fill the Form to Contact us:</h4>
				<div className="card query bg-light">{this.queryForm()}</div>
				<div className="reach">
					<h6 className="lead mobHide">Follow us on:</h6>

					<div className="contactDesc">
						<div className="col-md-12 col-sm-12">
							<ul className="social-network social-circle">
								<li>
									<a href="/" className="icoRss" title="Rss">
										<i className="fa fa-rss" />
									</a>
								</li>
								<li>
									<a href="/" className="icoFacebook" title="Facebook">
										<i className="fa fa-facebook" />
									</a>
								</li>
								<li>
									<a href="/" className="icoTwitter" title="Twitter">
										<i className="fa fa-twitter" />
									</a>
								</li>
								<li>
									<a href="/" className="icoGoogle" title="Google +">
										<i className="fa fa-google-plus" />
									</a>
								</li>
								<li>
									<a href="/" className="icoLinkedin" title="Linkedin">
										<i className="fa fa-linkedin" />
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ContactUs;
