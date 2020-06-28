import React from 'react';
import './style.css';
import Posts from '../Posts/RelatedPosts';
import { getSubdisease, deleteSubdisease } from '../../Api/Subdisease';
import { clientUrl } from '../../variables';
import { isAuthenticated } from '../../Api';

import { Accordion, Card, Button, Tabs, Tab, Container, Table } from 'react-bootstrap';

class SubdiseaseDetail extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	componentDidMount() {
		if (!this.state.data) {
			console.log(this.props.match.params);
			getSubdisease(this.props.match.params.sdid).then(data => {
				this.setState({
					data: data,
				});
			});
		} else {
			this.setState({ data: this.props.location.state.data });
			console.log(this.props.location.state.data);
		}
	}

	onUpdateSubdisease = () => {
		this.props.history.push(`/update_subdisease/${this.state.data._id}`, this.state.data);
	};

	onDeleteSubdisease = () => {
		deleteSubdisease(this.state.data._id).then(data => {
			console.log(data);
			if (data.status === 200) {
				window.open(`${clientUrl}/diseases`);
			}
		});
	};

	render() {
		console.log(this.state);
		if (!this.state.data) {
			return <div>Loading...</div>;
		}
		return (
			<Container>
				<blockquote class="blockquote text-center">
					<p className="mb-0" style={{ fontSize: '70px' }}>
						Disease Details
					</p>
				</blockquote>

				<div className="jumbotron">
					<Container>
						<div className="display-4">{this.state.data.title}</div>
						<div className="row">
							<div className="col-md-2">
								<h5>Description </h5>
							</div>
							<div className="col-md-10">
								<p>{this.state.data.description}</p>
							</div>
						</div>
						<div className="row">
							<div className="col-md-2">
								<h5>Best Therapy</h5>
							</div>
							<div className="col-md-10">
								<p>{this.state.data.bestTherapy}</p>
							</div>
						</div>
					</Container>

					<Container fluid className="my-10">
						<Tabs defaultActiveKey="Pathy" id="diseases">
							<Tab eventKey="Pathy" title="Pathy">
								<Accordion defaultActiveKey="0">
									<Card>
										<Accordion.Toggle
											as={Button}
											variant="link"
											eventKey="0"
											style={{
												color: 'gray',
												fontWeight: '400',
												fontSize: '20px',
											}}
										>
											<Card.Header>Allopathy</Card.Header>
										</Accordion.Toggle>

										<Accordion.Collapse eventKey="0">
											<Card.Body>
												<span>
													<div className="row">
														<div className="col-md-12">
															<h6 className="font-weight-bold">
																Efficiency{' '}
															</h6>
														</div>
														<div className="col-md-12">
															<p>
																{
																	this.state.data.allopathy
																		.efficiency
																}
															</p>
														</div>
													</div>
													<div className="row">
														<div className="col-md-12">
															<h6 className="font-weight-bold">
																Advantages
															</h6>
														</div>
														<div className="col-md-12">
															<p>
																{
																	this.state.data.allopathy
																		.advantages
																}
															</p>
														</div>
													</div>
													<div className="row">
														<div className="col-md-12">
															<h6 className="font-weight-bold">
																Disadvantages
															</h6>
														</div>
														<div className="col-md-12">
															<p>
																{
																	this.state.data.allopathy
																		.disadvantages
																}
															</p>
														</div>
													</div>
													<div className="row">
														<div className="col-md-12">
															<h6 className="font-weight-bold">
																Summary
															</h6>
														</div>
														<div className="col-md-12">
															<p>
																{this.state.data.allopathy.summary}
															</p>
														</div>
													</div>

													<div className="row">
														<div className="col-md-12">
															<h6 className="font-weight-bold">
																Good doctors,Clinics,Hospitals
															</h6>
														</div>
														<div className="col-md-12">
															<p>
																{
																	this.state.data.allopathy
																		.suggestions
																}
															</p>
														</div>
													</div>
												</span>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
									<Card>
										<Accordion.Toggle
											as={Button}
											variant="link"
											eventKey="1"
											style={{
												color: 'gray',
												fontWeight: '400',
												fontSize: '20px',
											}}
										>
											<Card.Header>Homeopathy</Card.Header>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="1">
											<Card.Body>
												<span>
													<div className="row">
														<div className="col-md-12">
															<h6 className="font-weight-bold">
																Efficiency
															</h6>
														</div>
														<div className="col-md-12">
															<p>
																{
																	this.state.data.homeopathy
																		.efficiency
																}
															</p>
														</div>
													</div>
													<div className="row">
														<div className="col-md-12">
															<h6 className="font-weight-bold">
																Advantages
															</h6>
														</div>
														<div className="col-md-12">
															<p>
																{
																	this.state.data.homeopathy
																		.advantages
																}
															</p>
														</div>
													</div>
													<div className="row">
														<div className="col-md-12">
															<h6 className="font-weight-bold">
																Disadvantages
															</h6>
														</div>
														<div className="col-md-12">
															<p>
																{
																	this.state.data.homeopathy
																		.disadvantages
																}
															</p>
														</div>
													</div>
													<div className="row">
														<div className="col-md-12">
															<h6 className="font-weight-bold">
																Summary
															</h6>
														</div>
														<div className="col-md-12">
															<p>{this.state.data.summary}</p>
														</div>
													</div>

													<div className="row">
														<div className="col-md-12">
															<h6 className="font-weight-bold">
																Good doctors,Clinics,Hospitals
															</h6>
														</div>
														<div className="col-md-12">
															<p>
																{
																	this.state.data.homeopathy
																		.suggestions
																}
															</p>
														</div>
													</div>
												</span>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
									<Card>
										<Accordion.Toggle
											as={Button}
											variant="link"
											eventKey="2"
											style={{
												color: 'gray',
												fontWeight: '400',
												fontSize: '20px',
											}}
										>
											<Card.Header>Ayurveda</Card.Header>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey="2">
											<Card.Body>
												<span>
													<div className="row">
														<div className="col-md-12">
															<h6 className="font-weight-bold">
																Efficiency{' '}
															</h6>
														</div>
														<div className="col-md-12">
															<p>
																{
																	this.state.data.ayurveda
																		.efficiency
																}
															</p>
														</div>
													</div>
													<div className="row">
														<div className="col-md-12">
															<h6 className="font-weight-bold">
																Advantages
															</h6>
														</div>
														<div className="col-md-12">
															<p>
																{
																	this.state.data.ayurveda
																		.advantages
																}
															</p>
														</div>
													</div>
													<div className="row">
														<div className="col-md-12">
															<h6 className="font-weight-bold">
																Disadvantages
															</h6>
														</div>
														<div className="col-md-12">
															<p>
																{
																	this.state.data.ayurveda
																		.disadvantages
																}
															</p>
														</div>
													</div>
													<div className="row">
														<div className="col-md-12">
															<h6 className="font-weight-bold">
																Summary
															</h6>
														</div>
														<div className="col-md-12">
															<p>
																{this.state.data.ayurveda.summary}
															</p>
														</div>
													</div>

													<div className="row">
														<div className="col-md-12">
															<h6 className="font-weight-bold">
																Good doctors,Clinics,Hospitals
															</h6>
														</div>
														<div className="col-md-12">
															<p>
																{
																	this.state.data.ayurveda
																		.suggestions
																}
															</p>
														</div>
													</div>
												</span>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
								</Accordion>
							</Tab>
							<Tab eventKey="Posts" title="Posts">
								<Posts tags={this.state.data.title} />
							</Tab>
							<Tab eventKey="Symptoms" title="Symptoms">
								<Table striped bordered hover>
									<thead>
										<tr>
											<th>URL</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Summary</td>
										</tr>
									</tbody>
								</Table>
							</Tab>
							{/* <Tab eventKey="Symptoms" title="Symptoms">
							<Pathy id={id} />
						</Tab>
						<Tab eventKey="our-recommendations" title="Our Recommendations">
							<Pathy id={id} />
						</Tab> */}
							<Tab eventKey="References" title="References">
								<Table striped bordered hover>
									<thead>
										<tr>
											<th>URL</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											{this.state.data.references.map(reference => {
												return (
													<td>
														<a target="_blank" href={reference.url}>
															{reference.url}
														</a>
													</td>
												);
											})}
										</tr>
									</tbody>
								</Table>
							</Tab>
							<Tab eventKey="Books" title="Books">
								<Table striped bordered hover>
									<thead>
										<tr>
											<th>URL</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											{this.state.data.books.map(book => {
												return (
													<td>
														<span>{book.name}</span>
													</td>
												);
											})}
										</tr>
									</tbody>
								</Table>
							</Tab>
							<Tab eventKey="Links" title="Links">
								<Table striped bordered hover>
									<thead>
										<tr>
											<th>URL</th>

											<th>Summary</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											{this.state.data.books.map(book => {
												return (
													<td>
														<span>{book.name}</span>
													</td>
												);
											})}

											{/* <td>
												{this.state.data.books.map(book => {
													return <span>{book.name}</span>;
												})}
											</td> */}
										</tr>
									</tbody>
								</Table>
							</Tab>

							{/* <Tab eventKey="Blogs" title="Blogs">
							<Pathy id={id} />
						</Tab>
						<Tab eventKey="Faq" title="Faq">
							<Pathy id={id} />
						</Tab> */}
						</Tabs>
					</Container>
				</div>

				{isAuthenticated().user.role === 'admin' ? (
					<div
						style={{ textAlign: 'center', paddingBottom: '20px' }}
						className="btn-group"
					>
						<span
							className="btn btn-info btn-sm"
							onClick={() => this.onUpdateSubdisease()}
						>
							Update
						</span>
						<span
							className="btn btn-danger btn-sm"
							onClick={() => this.onDeleteSubdisease()}
						>
							Delete
						</span>
					</div>
				) : null}
			</Container>
			// <div>hgj</div>
		);
	}
}
export default SubdiseaseDetail;
