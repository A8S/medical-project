import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import CardLayout from '../WhatWeDo';
import logo from '../../Images/logo.svg';
import Testimonial from '../ContactUs/Testimonial';
import Testimonialdata from '../../Data/Testimonial_data';
import { subscribe } from '../../Api/Subscribe';
import { isAuthenticated } from '../../Api/';
import home from '../../Images/Home3.jpg';

class Home extends Component {
	state = {
		email: '',
	};
	onSubscribe = e => {
		e.preventDefault();
		subscribe(this.state).then(res => {
			if (res.status === 200) {
				this.setState({
					email: '',
				});
			}
		});
	};

	onChange = e => {
		this.setState({
			email: e.target.value,
		});
	};
	render() {
		return (
			<div style={isAuthenticated() ? { minHeight: '110vh' } : { minHeight: '380vh' }}>
				<div
					style={{
						backgroundImage: `url(${home})`,

						// flex: '1',
						// alignSelf: 'stretch',
						position: 'absolute',
						backgroundSize: 'cover',
						width: '100%',
						height: '100vh',
						top: '0',
					}}
				>
					<div className="container-fluid" style={{ minHeight: '100vh' }}>
						<div className="text-white text-center jbtron">
							<h2 className="main-title">Medical Counselling</h2>
							<p className="lead">Experiance of common man help each other</p>
							<img src={logo} className="img-responsive centre-logo" alt="logo" />
							<div className="row">
								<div className="col-md-6 ">
									<Link to="/Signup">
										<button
											type="button"
											className="btn btn-default buttonJoin float-right"
										>
											Share Experience
										</button>
									</Link>
								</div>
								<div className="col-md-6">
									<Link to="/Signup">
										<button
											type="button"
											className="btn  buttonJoin float-left"
											style={{
												backgroundColor: '#343a40',
												color: 'rgb(150,150,150)',
												fontWeight: '800',
											}}
										>
											Ask Suggestion
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>

					{isAuthenticated() ? null : (
						<div>
							<CardLayout />
							<div>
								<h4 className="text-center mb-4 mt-5">
									What people say about our platform
								</h4>
								<Testimonial slides={Testimonialdata} />
							</div>
							<div className="sta row">
								<div className="col-md-3">
									<div className="card shadow p-3 mb-5 bg-white rounded">
										<div className="card-body">
											<h5 className="card-title text-center font-weight-bold">
												700
											</h5>
											<p className="card-text text-center">No. of Members</p>
										</div>
									</div>
								</div>
								<div className="col-md-3">
									<div className="card shadow p-3 mb-5 bg-white rounded">
										<div className="card-body">
											<h5 className="card-title text-center font-weight-bold">
												4020
											</h5>
											<p className="card-text text-center">No. of Visitors</p>
										</div>
									</div>
								</div>
								<div className="col-md-3">
									<div className="card shadow p-3 mb-5 bg-white rounded">
										<div className="card-body">
											<h5 className="card-title text-center font-weight-bold">
												120
											</h5>
											<p className="card-text text-center">No. of Disease</p>
										</div>
									</div>
								</div>
								<div className="col-md-3">
									<div className="card shadow p-3 mb-5 bg-white rounded">
										<div className="card-body">
											<h5 className="card-title text-center font-weight-bold">
												80+
											</h5>
											<p className="card-text text-center">No. of Pathy</p>
										</div>
									</div>
								</div>
							</div>
							<div className="container">
								<Link to="/Signup">
									<button type="button" className="btn btn-primary buttonJoin">
										Become a Member
									</button>
								</Link>
							</div>

							<form
								className="container form-inline news-letter d-flex flex-column"
								onSubmit={this.onSubscribe}
							>
								<div>
									<h2>Subscribe to our Newsletter for latest posts</h2>
									<h4 className="news-letter-subheading">
										You will recieve email notifications for all our new posts.
									</h4>
								</div>
								<div className="subscribe-div">
									<label class="sr-only" for="inlineFormInputName2">
										Name
									</label>
									<input
										type="email"
										required-pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
										value={this.state.email}
										onChange={this.onChange}
										class="form-control"
										id="inlineFormInputName2"
										placeholder="Email"
										style={{
											width: '25vw',
											border: '3px solid rgba(0,0,0,0.25)',
											fontSize: '20px',
										}}
									/>
									{/* <p></p> */}
									<button
										type="submit"
										class="btn btn-outline-primary"
										style={{
											marginLeft: '20px',
											border: '3px solid #007bff',
											width: '10vw',
											fontSize: '20px',
										}}
									>
										Subscribe
									</button>
								</div>
							</form>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Home;
