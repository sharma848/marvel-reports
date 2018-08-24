import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SignupData } from '../../Constants/appConstants';
import { signupUser } from '../../Actions/index';


export class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			eid: '',
			name: '',
			email: '',
			password: '',
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
		} else if (data.statusCode !== 200) {
			this.setState({ errorMessage: data.data.message });
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
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="eid"
							name="eid"
							placeholder="Enter your Employee Id"
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="name"
							className="form-control"
							id="name"
							name="name"
							placeholder="Enter your name"
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="email"
							className="form-control"
							name="email"
							id="email"
							placeholder="Enter your email"
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							className="form-control"
							name="password"
							id="password"
							placeholder="Enter your password"
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<input type="submit" value="Signup" className="btn btn-large" />
					</div>
				</form>
				<span>
					Already registered? <Link to={'/login'}>Login</Link>
				</span>
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