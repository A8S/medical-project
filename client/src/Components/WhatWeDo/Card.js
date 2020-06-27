/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

const Card = props => {
	return (
		<div className="d-flex flex-row justify-content-center mx-auto row-sm-2 mb-2 row-4  card shadow-lg p-3 mb-4 bg-white rounded">
			<div className="w-100 divider">
				<img className=" card-img-top img-fluid  mt-2 _card" alt="card" src={props.image} />
				<h5 className="  card-title text-center font-weight-bold mt-3">{props.title}</h5>
			</div>
			<div className="mobHide">
				<h5 className=" text-center mt-3 float-right">{props.description}</h5>
			</div>
		</div>
	);
};

export default Card;
