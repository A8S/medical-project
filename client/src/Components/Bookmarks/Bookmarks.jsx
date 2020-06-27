import React, { Component } from 'react';
import { Card, CardColumns, Container } from 'react-bootstrap';
import { read } from '../../Api/User';
import { getSubdisease } from '../../Api/Subdisease';
import { isAuthenticated, authenticate } from '../../Api';
import { Link } from 'react-router-dom';
import Image from '../../Images/imageplaceholder.png';
export default class Bookmarks extends Component {
	state = {
		Bookmarks: [],
		subdiseases: [],
	};
	componentDidMount() {
		const token = isAuthenticated().token;
		read(isAuthenticated().user._id, token).then(data => {
			if (!data) {
				this.setState({ redirectToSignin: true });
			} else {
				this.setState({ Bookmarks: data.bookmarks });
			}
			for (let i = 0; i < this.state.Bookmarks.length; i++) {
				getSubdisease(this.state.Bookmarks[i]).then(sub => {
					this.setState({
						subdiseases: [...this.state.subdiseases, sub],
					});
				});
			}
		});
	}
	setSubdiseases() {}
	render() {
		return (
			<div style={{ padding: '0 5%' }}>
				<Container fluid>
					<h1 style={{ fontSize: '85px' }}>Bookmarks</h1>
					<div class="jumbotron">
						<CardColumns>
							{this.state.subdiseases.map((post, index) => {
								return (
									<Card>
										<Card.Header>
											<h2>{post.title}</h2>
										</Card.Header>
										<Card.Body>
											<Card.Text>{post.description}</Card.Text>
										</Card.Body>
										<Card.Footer>
											<Link
												to={{
													pathname: `/subdisease/${post._id}`,
												}}
											>
												Read More
											</Link>
										</Card.Footer>
									</Card>
								);
							})}
						</CardColumns>
					</div>
				</Container>
			</div>
		);
	}
}
