import React, { Component } from 'react';
import integrate from '../../Images/integrate.svg';
import testimonial from '../../Images/testimonials.svg';
import doctor from '../../Images/doctors.svg';
import Card from './Card';
import './Card.css';

class CardLayout extends Component {
	render() {
		const data = [
			{
				image: integrate,
				title: 'Integrate Solutions',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla mauris elementum, aliquet velit nec, placerat tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec nibh dui, ultricies vel posuere quis, maximus quis odio.',
			},
			{
				image: testimonial,
				title: 'Collect Testimonials',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla mauris elementum, aliquet velit nec, placerat tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec nibh dui, ultricies vel posuere quis, maximus quis odio.',
			},
			{
				image: doctor,
				title: 'Good Doctors/Clinics',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla mauris elementum, aliquet velit nec, placerat tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec nibh dui, ultricies vel posuere quis, maximus quis odio.',
			},
		];

		const _html = [...data].map((x, key) => {
			return <Card key={key} image={x.image} title={x.title} description={x.description} />;
		});

		return (
			<div>
				<div className="bg-white mt-5 container">
					<div className="row">
						<div className="col-xs-12 col-md-12 col-sm-12 col-xs-12 mt-5">{_html}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CardLayout;
