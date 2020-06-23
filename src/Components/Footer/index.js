import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Images/logo.svg';
import './style.css';
import { submitQuery } from '../../Api/Query';
import { isAuthenticated } from '../../Api';

class Footer extends Component {
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

	render() {
		return (
			<div>
				{
					<footer
						className="bg-dark text-white mt-4"
						style={{ position: 'relative', zIndex: '10', height: '30vh' }}
					>
						<div className="container text-center text-md-left">
							<div className="row">
								<hr className="clearfix w-100 d-md-none" />
								<div className="col-md-3">
									<ul className="list-unstyled">
										<li>
											<img
												src={logo}
												className="img-responsive img-css"
												alt="logo"
											/>
										</li>
									</ul>
									<div className="col-md-12 col-sm-12 icon">
										<ul className="social-network social-circle ">
											<li>
												<a
													href="/"
													className="icoFacebook"
													title="Facebook"
												>
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
												<a
													href="/"
													className="icoLinkedin"
													title="Linkedin"
												>
													<i className="fa fa-linkedin" />
												</a>
											</li>
										</ul>
									</div>
								</div>

								<div className="col-md-2 ">
									<h5 className="mt-3 mb-4 heading">Features</h5>
									<ul className="list-unstyled">
										<li>
											<Link className="link" to="/posts">
												Posts
											</Link>
										</li>
										<li>
											<Link className="link" to="/signin">
												Ask Suggestion
											</Link>
										</li>
										<li>
											<Link className="link" to="/signin">
												Share Experience
											</Link>
										</li>
									</ul>
								</div>

								<div className="col-md-2">
									<h5 className="mt-3 mb-4 heading">Community</h5>
									<ul className="list-unstyled">
										<li>
											<a className="link" href="#!">
												Personal
											</a>
										</li>
										<li>
											<a className="link" href="#!">
												Facebook Group
											</a>
										</li>
										<li>
											<a className="link" href="/s">
												YouTube Channel
											</a>
										</li>
									</ul>
								</div>

								<div className="col-md-2">
									<h5 className=" mt-3 mb-4 heading">Company</h5>
									<ul className="list-unstyled">
										<li>
											<Link className="link" to="/privacypolicy">
												Privacy Policy
											</Link>
										</li>
										<li>
											<Link className="link" to="/faq">
												FAQ
											</Link>
										</li>
										<li>
											<Link className="link" to="/termsofuse">
												Terms of Use
											</Link>
										</li>
										<li>
											<Link className="link" to="/contactus">
												Contact Us
											</Link>
										</li>
									</ul>
								</div>

								<div className="col-md-3">
									<h5 className=" mt-3 mb-4 heading">
										Register to our <br /> Newsletter
									</h5>
								</div>
							</div>
						</div>

						<div
							className="footer-copyright text-center py-3 heading container"
							style={{ position: 'absolute', bottom: '0', left: '15%' }}
						>
							<p>© 2018 Copyright</p>
							<p>
								{' '}
								All rights reserved! Information on the website is reported by our
								members and is not a medical advice.
							</p>
						</div>
					</footer>
				}
			</div>
		);
	}
}

export default Footer;
