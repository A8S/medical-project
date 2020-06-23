import React from 'react';
import { createSubdisease } from '../../Api/Subdisease';

class AddSubdisease extends React.Component {
	state = {
		title: '',
		description: '',
		tags: '',
		bestTherapy: '',
		allopathy: {
			efficiency: '',
			advantages: '',
			disadvantages: '',
			summary: '',
			suggestions: '',
		},

		homeopathy: {
			efficiency: '',
			advantages: '',
			disadvantages: '',
			summary: '',
			suggestions: '',
		},
		ayurveda: {
			efficiency: '',
			advantages: '',
			disadvantages: '',
			summary: '',
			suggestions: '',
		},
		books: [],
		references: [],
	};

	handleOnChange = event => {
		// const data = new FormData(event.currentTarget);
		// console.log(data);
		const key = event.target.name;
		const value = event.target.value;

		this.setState({
			[key]: value,
		});
	};

	handleAllopathyChange = event => {
		const key = event.target.name;
		const value = event.target.value;

		this.setState(prevState => ({
			allopathy: {
				...prevState.allopathy,
				[key]: value,
			},
		}));
	};

	handleHomeopathyChange = event => {
		const key = event.target.name;
		const value = event.target.value;

		this.setState(prevState => ({
			homeopathy: {
				...prevState.homeopathy,
				[key]: value,
			},
		}));
	};

	handleAyurvedaChange = event => {
		const key = event.target.name;
		const value = event.target.value;

		this.setState(prevState => ({
			ayurveda: {
				...prevState.ayurveda,
				[key]: value,
			},
		}));
	};

	handleBooksChange = (i, event) => {
		const value = event.target.value;
		let books = [...this.state.books];
		books[i].name = value;
		this.setState({ books });
	};

	handleRefsChange = (i, event) => {
		const value = event.target.value;
		let references = [...this.state.references];
		references[i].url = value;
		this.setState({ references });
	};

	onAddBook = e => {
		e.preventDefault();
		this.setState(prevState => ({
			books: [...prevState.books, { name: '' }],
		}));
	};

	onAddReference = e => {
		e.preventDefault();
		this.setState(prevState => ({
			references: [...prevState.references, { url: '' }],
		}));
	};

	handleSubmit = async e => {
		e.preventDefault();
		const res = await createSubdisease(this.state, this.props.match.params.dId);
		console.log(res);
		if (res.status === 200) {
			this.props.history.push('/diseases');
		}
	};

	render() {
		return (
			<div className="container">
				<h2 className="my-5">Create a new Subdisease</h2>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label className="text-muted">Subdisease Name</label>
						<input
							type="text"
							value={this.state.title}
							onChange={this.handleOnChange}
							className="form-control"
							name="title"
							required
						/>
						<label className="text-muted">Description</label>
						<input
							type="text"
							value={this.state.description}
							onChange={this.handleOnChange}
							className="form-control"
							name="description"
							required
						/>
						<label className="text-muted">Tags</label>
						<input
							type="text"
							value={this.state.Tags}
							onChange={this.handleOnChange}
							className="form-control"
							name="tags"
							required
						/>
						<label className="text-muted">Best Therapy</label>
						<input
							type="text"
							value={this.state.bestTherapy}
							onChange={this.handleOnChange}
							className="form-control"
							name="bestTherapy"
							required
						/>
						<h3>Allopathy</h3>
						<div className="form-group">
							{Object.keys(this.state.allopathy).map((el, i) => {
								return (
									<div key={i}>
										<label className="text-muted">{el}</label>
										<input
											type="text"
											value={this.state.allopathy[el]}
											onChange={this.handleAllopathyChange}
											className="form-control"
											name={el}
											required
										/>
									</div>
								);
							})}
						</div>
						<h3>Homeopathy</h3>
						<div className="form-group">
							{Object.keys(this.state.homeopathy).map((el, i) => {
								return (
									<div key={i}>
										<label className="text-muted">{el}</label>
										<input
											type="text"
											value={this.state.homeopathy[el]}
											onChange={this.handleHomeopathyChange}
											className="form-control"
											name={el}
											required
										/>
									</div>
								);
							})}
						</div>
						<h3>Ayurveda</h3>
						<div className="form-group">
							{Object.keys(this.state.ayurveda).map((el, i) => {
								return (
									<div key={i}>
										<label className="text-muted">{el}</label>
										<input
											type="text"
											value={this.state.ayurveda[el]}
											onChange={this.handleAyurvedaChange}
											className="form-control"
											name={el}
											required
										/>
									</div>
								);
							})}
						</div>
						<div>
							<label className="text-muted">Books</label>
							<button className="btn btn-primary btn-sm" onClick={this.onAddBook}>
								Add Book
							</button>
							{this.state.books.map((book, i) => {
								return (
									<input
										key={i}
										type="text"
										value={book.name}
										onChange={e => this.handleBooksChange(i, e)}
										className="form-control"
										name={`books[${i}]`}
									/>
								);
							})}
						</div>
						<div>
							<label className="text-muted">Refere</label>
							<button
								className="btn btn-primary btn-sm"
								onClick={this.onAddReference}
							>
								Add Reference
							</button>
							{this.state.references.map((ref, i) => {
								return (
									<input
										key={i}
										type="text"
										value={ref.url}
										onChange={e => this.handleRefsChange(i, e)}
										className="form-control"
										name={`references[${i}]`}
									/>
								);
							})}
						</div>
					</div>
					<button className="btn btn-primary btn-raised" onClick={this.handleSubmit}>
						Add Subdisease
					</button>
				</form>
			</div>
		);
	}
}
export default AddSubdisease;
