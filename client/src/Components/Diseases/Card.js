/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React, { useEffect, useState } from 'react';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Cancer from '../../Images/Diseases/1.png';
import { deleteDisease } from '../../Api/Disease';
import { Button } from 'react-bootstrap';
import { isAuthenticated } from '../../Api';
import { book, unbook } from '../../Api/Subdisease';
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
			this.state({ redirectToSignin: true });
			return false;
		}
		const callApi = this.state.bookmark ? unbook : book;
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
	};
	render() {
		let button;
		if (this.state.bookmark) {
			button = <h3 onClick={this.bookmarkToggle}>book</h3>;
		} else {
			button = <h3 onClick={this.bookmarkToggle}>unbook</h3>;
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
						<div>
							<img width="30px" src={Cancer} />
						</div>
					</div>

					<p className="card-text">{this.props.data.description}</p>
				</div>
				{button}

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
