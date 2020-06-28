import React from 'react';
import './style.css';
import { getPathy } from '../../Api/pathys';
import { isAuthenticated } from '../../Api';

class Pathy extends React.Component {
	state = {
		pathy: [],
	};

	componentDidMount() {
		getPathy().then(data => {
			if (data.error) {
				this.setState({ error: data.error });
			} else {
				this.setState({ pathy: data });
			}
		});
	}
	render() {
		return (
			<div className="container">
				<br />
				{isAuthenticated() && isAuthenticated().user.role === 'admin' && (
					<a href="/add_pathy" className="btn btn-outline-primary btn-sm">
						{' '}
						<i className="fa fa-plus" /> Add New
					</a>
				)}

				<h2 className="my-5">Pathy</h2>

				{this.state.pathy.map((data, i) => {
					return (
						<div className="card pathy-card mb-4">
							<div className="card-body">
								<div className="card-title">
									<h3 className="text-bold">{data.title}</h3>
								</div>
								<div className="row">
									<div className="col-md-3">Description</div>
									<div className="col-md-9">
										<p>{data.description}</p>
									</div>
								</div>
								<div className="row">
									<div className="col-md-3">Most effective for</div>
									<div className="col-md-9">{data.effective}</div>
								</div>
							</div>
						</div>
					);
				})}

				{/* <div className="text-wrap vcenter">
					<h3 className="text-bold">Ayurveda</h3>
					<p>
						Homeopathy or [homœopathy] is a system of alternative medicine created in
						1796 by Samuel Hahnemann, based on his doctrine of <i>like</i> cures{' '}
						<i>like</i>, a claim that a substance that causes the symptoms of a disease
						in healthy people would cure similar symptoms in sick people. Homeopathy is
						a a pseudoscience – a belief that is incorrectly presented as scientific.
						Homeopathic preparations are not effective for treating any condition;
						large-scale studies have found homeopathy to be no more effective than a
						placebo, indicating that any positive effects that follow treatment are not
						due to the treatment itself but instead to factors such as normal recovery
						from illness, or regression toward the mean.
					</p>
				</div>
				<div className="text-wrap vcenter">
					<h3 className="text-bold">Allopathy</h3>
					<p>
						Homeopathy or [homœopathy] is a system of alternative medicine created in
						1796 by Samuel Hahnemann, based on his doctrine of <i>like</i> cures{' '}
						<i>like</i>, a claim that a substance that causes the symptoms of a disease
						in healthy people would cure similar symptoms in sick people. Homeopathy is
						a a pseudoscience – a belief that is incorrectly presented as scientific.
						Homeopathic preparations are not effective for treating any condition;
						large-scale studies have found homeopathy to be no more effective than a
						placebo, indicating that any positive effects that follow treatment are not
						due to the treatment itself but instead to factors such as normal recovery
						from illness, or regression toward the mean.
					</p>
				</div> */}
			</div>
		);
	}
}

export default Pathy;
