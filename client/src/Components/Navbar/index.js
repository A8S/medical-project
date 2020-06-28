/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, withRouter } from 'react-router-dom'; // withRouter is higher order componenet which means it takes anaother component as argument
import logo from '../../Images/logo.svg';
import { signout, isAuthenticated } from '../../Api';

const isActive = (history, path) => {
	if (history.location.pathname === path) return { color: 'white' };
};

class NavDropdown extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isToggleOn: false,
		};
	}

	showDropdown(e) {
		e.preventDefault();
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn,
		}));
	}

	render() {
		const classDropdownMenu = `dropdown-menu${this.state.isToggleOn ? ' show' : ''}`;
		return (
			<li className="nav-item dropdown">
				<Link
					className="nav-link dropdown-toggle"
					href="/"
					id="navbarDropdown"
					role="button"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
					to={`/user/${isAuthenticated().user._id}`}
					style={{ color: '#fff' }}
					onClick={e => {
						this.showDropdown(e);
					}}
				>
					<i className="fa fa-user-circle fa-lg mx-2" />
					{`${isAuthenticated().user.name}`}
				</Link>
				<div
					className={classDropdownMenu}
					aria-labelledby="navbarDropdown"
					onMouseEnter={this.enterMenu}
					onMouseLeave={e => {
						this.showDropdown(e);
					}}
				>
					{this.props.children}
				</div>
			</li>
		);
	}
}

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.listener = null;
		this.state = {
			status: 'top',
		};
	}
	componentDidMount() {
		this.listener = document.addEventListener('scroll', e => {
			var scrolled = document.scrollingElement.scrollTop;
			if (scrolled >= 120) {
				if (this.state.status !== 'amir') {
					this.setState({ status: 'amir' });
				}
			} else {
				if (this.state.status !== 'top') {
					this.setState({ status: 'top' });
				}
			}
		});
	}

	componentDidUpdate() {
		document.removeEventListener('scroll', this.listener);
	}
	render() {
		const { history } = this.props;
		return (
			<div>
				<nav
					className="navbar fixed-top navbar-expand-lg navbar-dark "
					style={{
						backgroundColor:
							this.state.status === 'top' ? 'rgba(0,0,0,0.5)' : '#343a40',
						color: this.state.status === 'top' ? 'white' : 'blue',
						width: '100%',
					}}
				>
					<Link className="navbar-brand" to="/">
						<img src={logo} width="40" height="40" alt="logo" />
					</Link>

					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="nav navbar-nav navbar-nav mr-auto">
							<li className="nav-item">
								<Link
									className="nav-link"
									style={isActive(history, '/aboutus')}
									to="/aboutus"
								>
									About Us
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									style={isActive(history, '/diseases')}
									to="/diseases"
								>
									Diseases
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									style={isActive(history, '/pathy')}
									to="/pathy"
								>
									Pathy
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									style={isActive(history, '/posts')}
									to="/posts"
								>
									Posts
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									style={isActive(history, '/contactus')}
									to="/contactus"
								>
									Contact us
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									style={isActive(history, '/feedback')}
									to="/feedback"
								>
									Feedback
								</Link>
							</li>
						</ul>

						<ul className="nav navbar-nav navbar-right ml-md-auto ">
							{!isAuthenticated() && (
								<>
									<li className="nav-item">
										<Link
											className="nav-link"
											style={isActive(history, '/signin')}
											to="/signin"
										>
											<button
												type="button"
												className="btn btn-default float-right"
											>
												Sign In
											</button>
										</Link>
									</li>
									<li className="nav-item">
										<Link
											className="nav-link"
											style={isActive(history, '/signup')}
											to="/signup"
										>
											<button
												type="button"
												className="btn btn-primary float-right"
											>
												Sign Up
											</button>
										</Link>
									</li>
								</>
							)}
							{isAuthenticated() && isAuthenticated().user.role === 'admin' && (
								<li className="nav-item">
									<Link
										to="/admin"
										style={isActive(history, `/admin`)}
										className="nav-link"
									>
										Admin
									</Link>
								</li>
							)}

							{isAuthenticated() && ( // user authenticated show logout and username
								<>
									<NavDropdown name="Dropdown">
										<Link
											className="dropdown-item"
											to={`/user/${isAuthenticated().user._id}`}
										>
											View Profile
										</Link>
										<Link
											className="dropdown-item"
											to={`/user/${isAuthenticated().user._id}`}
										>
											Bookmarks
										</Link>
										<Link className="dropdown-item" to="/share_experience">
											Share Experience
										</Link>

										{isAuthenticated().user.role === 'admin' && (
											<Link className="dropdown-item" to="/users">
												Users
											</Link>
										)}

										<Link
											className="dropdown-item"
											to={`/myposts/${isAuthenticated().user._id}`}
										>
											My Posts
										</Link>
										<div className="dropdown-divider" />
										<Link
											className="dropdown-item"
											to={`/user/settings/${isAuthenticated().user._id}`}
										>
											Settings
										</Link>

										<a
											className="dropdown-item"
											style={
												(isActive(history, '/signup'),
												{ cursor: 'pointer' })
											}
											onClick={() => signout(() => history.push('/'))}
										>
											Logout
										</a>
										<div className="dropdown-divider" />
										<Link className="dropdown-item" to={`/faq`}>
											FAQ
										</Link>
										<Link className="dropdown-item" to={`/privacypolicy`}>
											Privacy Policy
										</Link>
										<Link className="dropdown-item" to={`/termsofuse`}>
											Terms of Use
										</Link>
									</NavDropdown>
									{/* <li className="nav-item">
										<a
											className="nav-link"
											style={
												(isActive(history, '/signup'),
												{ cursor: 'pointer' })
											}
											onClick={() => signout(() => history.push('/'))}
										>
											Logout
										</a>
									</li> */}

									{/* {JSON.stringify(props.history)}             // we need to compare the pathname */}
								</>
							)}
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

export default withRouter(Navigation);
