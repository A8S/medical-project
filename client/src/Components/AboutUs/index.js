import React from 'react';
import './style.css';
import Testimonial from '../ContactUs/Testimonial';
import Testimonialdata from '../../Data/Testimonial_data';


class AboutUs extends React.Component {
	render() {
		return (
			<div className="container">
				<h2 className="my-5 aboutTitle">About Us</h2>
				<div className="row">
					<div className="col-6">
						<div className="wrap">
							<span>
								<i className="fa fa-unlock-alt fa-5x mx-4" aria-hidden="true" />
							</span>
							<div className="text-wrap vcenter">
								<h4>Provide solutions</h4>
								<p>
									Integrate solutions from all therapies and provide an effective
									solution to the disease
								</p>
							</div>
						</div>
					</div>
					<div className="col-6">
						<div className="wrap">
							<span>
								<i className="fa fa-comments-o fa-5x mx-4" aria-hidden="true" />
							</span>
							<div className="text-wrap vcenter">
								<h4>Collection of Testimonials</h4>
								<p>
									Collect a large number of testimonials from people and search
									from different sources
								</p>
							</div>
						</div>
					</div>
					<div className="col-6">
						<div className="wrap">
							<span>
								<i className="fa fa-certificate fa-5x mx-4" aria-hidden="true" />
							</span>
							<div className="text-wrap vcenter">
								<h4>Search for good therapists</h4>
								<p>
									Let you know names of good Doctors/Hospitals/ Clinics and People
									who cure certain kind of diseases
								</p>
							</div>
						</div>
					</div>
					<div className="col-6">
						<div className="wrap">
							<span>
								<i className="fa fa-bullseye fa-5x mx-4" aria-hidden="true" />
							</span>
							<div className="text-wrap vcenter">
								<h4>
									Achieve <span>Your Targets</span>
								</h4>
								<p>
									Gives truthful result about diseases and its treatment.
									<span> Non-commercial service to humanity </span>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="testimonials text-center">
					<div className="container">
						<div className="row">
							<div className="col-md-6 col-lg-4">
								<div className="card border-light bg-light text-center">
									<i
										className="fa fa-quote-left fa-3x card-img-top rounded-circle"
										aria-hidden="true"
									/>
									<div className="card-body blockquote">
										<p className="card-text">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Integer bibendum enim eu nibh finibus
										</p>
										<footer className="blockquote-footer">
											<cite title="Source Title">Mohamed Nady</cite>
										</footer>
									</div>
								</div>
							</div>

							<div className="col-md-6 col-lg-4">
								<div className="card border-light bg-light text-center">
									<i
										className="fa fa-quote-left fa-3x card-img-top rounded-circle"
										aria-hidden="true"
									/>
									<div className="card-body blockquote">
										<p className="card-text">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Integer bibendum enim eu nibh finibus
										</p>
										<footer className="blockquote-footer">
											<cite title="Source Title">Mohamed Reda</cite>
										</footer>
									</div>
								</div>
							</div>

							<div className="col-md-6 col-lg-4">
								<div className="card border-light bg-light text-center">
									<i
										className="fa fa-quote-left fa-3x card-img-top rounded-circle"
										aria-hidden="true"
									/>
									<div className="card-body blockquote">
										<p className="card-text">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Integer bibendum enim eu nibh finibus
										</p>
										<footer className="blockquote-footer">
											<cite title="Source Title">Mohamed Atef</cite>
										</footer>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<h4 className="text-center mb-4 mt-5">What people say about our platform</h4>
					<Testimonial slides={Testimonialdata} />
				</div>

				<div className="sta row">
					<div className="col-md-3">
						<div className="card shadow p-3 mb-5 bg-white rounded">
							<div className="card-body">
								<h5 className="card-title text-center font-weight-bold">700</h5>
								<p className="card-text text-center"> Members</p>
							</div>
						</div>
					</div>
					<div className="col-md-3">
						<div className="card shadow p-3 mb-5 bg-white rounded">
							<div className="card-body">
								<h5 className="card-title text-center font-weight-bold">4020</h5>
								<p className="card-text text-center">No. of Visitors</p>
							</div>
						</div>
					</div>
					<div className="col-md-3">
						<div className="card shadow p-3 mb-5 bg-white rounded">
							<div className="card-body">
								<h5 className="card-title text-center font-weight-bold">120</h5>
								<p className="card-text text-center">No. of Disease</p>
							</div>
						</div>
					</div>
					<div className="col-md-3">
						<div className="card shadow p-3 mb-5 bg-white rounded">
							<div className="card-body">
								<h5 className="card-title text-center font-weight-bold">80+</h5>
								<p className="card-text text-center">No. of Pathy</p>
							</div>
						</div>
					</div>
					</div>
			</div>
		);
	}
}

export default AboutUs;
