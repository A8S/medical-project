/* eslint-disable react/sort-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { list, relatedPost } from '../../Api/Post';
// import DefaultPost from '../../Images/mountains.jpg';

import { Table, Pagination } from 'react-bootstrap';

import './style.css';

class Posts extends React.Component {
	constructor() {
		super();
		this.state = {
			posts: [],
			tags: [],
		};
	}

	loadPosts = tags => {
		relatedPost(tags).then(data => {
			console.log(tags);
			if (data.error) {
				console.log('here', data.error);
			} else {
				this.setState({ posts: data });
			}
		});
	};

	componentDidMount() {
		this.state.tags.push(this.props.tags);
		this.loadPosts(this.state.tags);
	}

	renderPosts = posts => {
		return (
			<div className="row">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Heading</th>
							<th>Date Posted</th>
							<th>Posted by</th>
							<th>Disease</th>
							<th>Likes</th>
							<th>Description</th>
							<th>Read more</th>
						</tr>
					</thead>
					<tbody>
						{posts.map((post, i) => {
							// map only works with arrays

							const posterId = post.postedBy ? `/user/${post.postedBy._id}` : '';
							const posterName = post.postedBy ? post.postedBy.name : ' Unknown';

							return (
								<tr>
									{/* <img
									src={`${process.env.REACT_APP_API_URL}/api/post/photo/${
										post._id
									}`}
									alt={post.title}
									onError={i => (i.target.src = `${DefaultPost}`)}
									className="img-thunbnail mb-3"
									style={{ height: '200px', width: '100%' }}
								/> */}
									<td className="card-title col-xs-8">{post.title}</td>
									{/* <p>
									<span className="fa fa-clock-o" /> Posted by{' '}
									<Link to={`${posterId}`}>{posterName} </Link>
									on {new Date(post.created).toDateString()}
								</p> */}
									<td className="col-xs-8">
										{new Date(post.created).toDateString()}
									</td>
									{/* <p>
									<span className="badge badge-secondary">Food</span>{' '}
									<span className="badge badge-secondary">Ipsum</span>
								</p> */}
									<td className="col-xs-8">
										<Link to={`${posterId}`}>{posterName} </Link>
									</td>
									{/* <p className="card-text">{post.body.substring(0, 100)}</p> */}
									
									<td  style={{ wordBreak: 'break-word' }}>
										{post.tags[0]}
									</td>
									{/* only some charaters are visible in the posts */}

									{/* <p className="font-italic mark">
									Posted by <Link to={`${posterId}`}>{posterName} </Link>
									on {new Date(post.created).toDateString()}
								</p> */}
									<td className="col-xs-8">{post.likes.length}</td>
									<td className="card-text" style={{ wordBreak: 'break-word' }}>
										{post.body}
									</td>

									<td>
										<Link to={`/post/${post._id}`}>Read more</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		);
	};

	render() {
		const { posts } = this.state;
		return (
			<div>
				{' '}
				{this.renderPosts(posts)}
				{/* <h2 className="mt-5 mb-5">{!posts.length ? 'Loading...' : 'Recent Posts'}</h2> */}
			</div>
		);
	}
}

export default Posts;
