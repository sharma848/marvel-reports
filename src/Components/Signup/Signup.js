import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { SignupData } from '../../Constants/appConstants';
import { signupUser } from '../../Actions/index';

const ROOT_URL = `http://524959da.ngrok.io/marvel`;

export class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eid: '',
			name: '',
			email: '',
			password: '',
			role: '',
			errormsg: '',
			redirect: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.signupUser(this.state);
	};

	componentWillReceiveProps(nextProps) {
		const data = nextProps.signupData.data;
		console.log(data);
		if (nextProps.signupData && nextProps.signupData.data) {
			this.redirect(nextProps.signupData.data);
		}
	}

	redirect(data) {
		if (data.statusCode === 200) {
			this.setState({ redirect: true });
		} else if (data.statusCode != 200) {
			this.setState({ errorMessage: data.message });
		}
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={'/login'} />;
		}

		return (
			<div className="form-container">
				<span className="form-header">{SignupData.signupText}</span>
				<form onSubmit={this.handleSubmit}>
					<div className="form-control">
						<input
							type="text"
							id="eid"
							name="eid"
							placeholder="Enter your Employee Id"
							onChange={this.onChange}
						/>
					</div>
					<div className="form-control">
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Enter your name"
							onChange={this.onChange}
						/>
					</div>
					<div className="form-control">
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Enter your email"
							onChange={this.onChange}
						/>
					</div>
					<div className="form-control">
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Enter your password"
							onChange={this.onChange}
						/>
					</div>
					<div className="form-control">
						<input
							type="text"
							name="role"
							id="role"
							placeholder="Enter your role"
							onChange={this.onChange}
						/>
					</div>
					<div className="form-control">
						<input type="submit" value="Login" />
					</div>
				</form>
				{this.state.errorMessage ? <div>{this.state.errorMessage}</div> : ''}
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		signupData: state.signupData
	};
}

export default connect(mapStateToProps, { signupUser: signupUser })(Signup);
