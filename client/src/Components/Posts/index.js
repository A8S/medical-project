import React from 'react';
//import Posts from './Posts';
import './style.css';

import Posts from './Posts';
import { Link, withRouter } from 'react-router-dom';
//import { Link } from 'react-router-dom'
import { signout, isAuthenticated } from '../../Api';

const isActive = (history, path) => {
	if (history.location.pathname === path) return { color: 'white', fontWeight: '600' };
};

class ViewPosts extends React.Component {
	render() {
		const { history } = this.props;
		return (
			<>
				<div className="container mb-5">
					<div>
						<h2 className="mt-5">Posts</h2>
						<p className="lead lead-post">
							{' '}
							View all type of post like share experience, asking suggestions
						</p>
						<div className="text-right">
							<p className="btn btn-outline-primary btn-sm postButton">
								<Link
									className="nav-link share-exp-btn"
									style={isActive(history, '/share_experience')}
									to="/share_experience"
								>
									<i className="fa fa-pencil-square-o mr-2" /> Share Experience
								</Link>
							</p>
						</div>
					</div>
				</div>
				<div className="container mob-table" style={{ overflow: 'scroll' }}>
					<Posts />
				</div>
			</>
		);
	}
}

export default ViewPosts;
