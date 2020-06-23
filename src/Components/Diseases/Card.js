/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cancer from '../../Images/Diseases/1.png';
import { deleteDisease } from '../../Api/Disease';
import { Button } from 'react-bootstrap';

const Card = ({ data, history }) => {
	useEffect(() => {
		console.log('here');
	}, []);

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
						<h3>{data.title}</h3>
					</h5>
					<div>
						<img width="30px" src={Cancer} />
					</div>
				</div>

				<p className="card-text">{data.description}</p>
			</div>
			<Link
				className="readMoreButton"
				to={{ pathname: `/subdisease/${data._id}`, state: { data } }}
			>
				Read More
			</Link>
		</div>
	);
};

export default Card;
