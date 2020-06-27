/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React, { useEffect, useState } from 'react';
import React, { Component } from 'react';

import { Link, Redirect } from 'react-router-dom';
import Cancer from '../../Images/Diseases/1.png';
import { deleteDisease } from '../../Api/Disease';
import { Button } from 'react-bootstrap';
import { isAuthenticated } from '../../Api';
import { book, unbook, bookmark, unbookmark } from '../../Api/Subdisease';
import { getSubdisease } from '../../Api/Subdisease';
import SubdiseaseDetail from './SubdiseaseDetail';

export default class Card extends Component {
	constructor() {
		super();
		this.state = {
			bookmark: false,
			redirectToSignin: false,
		};
	}
	componentDidMount = () => {
		const bookmark = this.props.data.bookmark;

		this.setState({
			bookmark: this.checkBookmark(bookmark),
		});
	};

	checkBookmark = bookmark => {
		console.log('dsjhbfjdhbgdbg', bookmark);
		const userId = isAuthenticated() && isAuthenticated().user._id;
		const match = bookmark.indexOf(userId) !== -1;
		return match;
	};
	bookmarkToggle = () => {
		if (!isAuthenticated()) {
			this.setState({ redirectToSignin: true });
			return false;
		}
		const callApi = this.state.bookmark ? unbook : book;
		const callBookmarkApi = this.state.bookmark ? unbookmark : bookmark;
		const userId = isAuthenticated().user._id;
		const postId = this.props.data._id;
		console.log('postId', postId);
		console.log(this.props.data._id);
		callApi(userId, postId).then(data => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				this.setState({
					bookmark: !this.state.book,
				});
			}
		});
		callBookmarkApi(userId, postId).then(data => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				this.setState({
					bookmark: !this.state.book,
				});
			}
		});
	};
	render() {
		const { redirectToSignin } = this.state;
		if (redirectToSignin) {
			return <Redirect to="/signin" />;
		}
		let button;
		if (this.state.bookmark) {
			button = (
				<div onClick={this.bookmarkToggle}>
					<i
						class="fa fa-bookmark"
						aria-hidden="true"
						style={{
							fontSize: '30px',
							color: '#444a60',
						}}
					/>
				</div>
			);
		} else {
			button = (
				<div onClick={this.bookmarkToggle}>
					<i
						class="fa fa-bookmark-o"
						aria-hidden="true"
						style={{
							fontSize: '30px',
							color: '#646a80',
						}}
					/>
				</div>
			);
		}
		return (
			<div className="card card-disease makeitflex m-0 mr-0">
				<div
					className="card-body"
					style={{
						overflowWrap: 'break-word',
					}}
				>
					<div className="img-container">
						<h5>
							<h3>{this.props.data.title}</h3>
						</h5>
						<div>{button}</div>
					</div>

					<p className="card-text" title={this.props.data.description}>{this.props.data.description}</p>
				</div>

				<Link
					className="readMoreButton"
					to={{
						pathname: `/subdisease/${this.props.data._id}`,
					}}
				>
					Read More
				</Link>
			</div>
		);
	}
}
