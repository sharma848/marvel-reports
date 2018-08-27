import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Panel, FormControl, Checkbox } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { LoginData } from '../../Constants/appConstants';
import { loginUser } from '../../Actions/index';

export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMessage: '',
			email: '',
			password: '',
			redirect: false,
			alert: false
		};
	}

	componentDidMount() {
		if (sessionStorage.getItem('SessionToken') != null) {
			this.setState({ redirect: true });
		}
		document.body.className = 'login-page-rendered';
	}

	componentWillReceiveProps(nextProps) {
		const data = nextProps.loginData.data;
		this.validateLogin(data);
	}

	componentWillUnmount() {
		document.body.className = '';
	}

	validateLogin(data) {
		if (data.statusCode === 200) {
			sessionStorage.setItem('SessionToken', data.data.data.token);
			this.props.history.push('/dashboard');
		} else {
			this.setState({
				errorMessage: data.message,
				alert: true
			});
		}
	}

	getAlert = () => <SweetAlert warning title={this.state.errorMessage} onConfirm={() => this.hideAlert()} />;

	hideAlert() {
		console.log('Hiding alert...');
		this.setState({
			alert: false
		});
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.loginUser(this.state);
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to={'/dashboard'} />;
		}
		return (
			<div className="login-container">
				<div className="text-center">
					<h1 className="login-brand-text">{LoginData.loginText}</h1>
				</div>
				<Panel header={LoginData.loginText} className="login-panel">
					<form role="form" onSubmit={this.handleSubmit}>
						<fieldset>
							<div className="form-group">
								<FormControl
									type="text"
									placeholder="Enter your email Id"
									name="email"
									onChange={this.onChange}
								/>
							</div>
							<div className="form-group">
								<FormControl
									placeholder="Enter your password"
									type="password"
									name="password"
									onChange={this.onChange}
								/>
							</div>
							<button type="submit" className="btn btn-success login-button">
								Login
							</button>
						</fieldset>
					</form>
				</Panel>
				{this.state.errorMessage && this.state.alert ? this.getAlert() : ''}
				<span>
					Not registered <Link to={'/signup'}>SignUp</Link>
				</span>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		loginData: state.loginData
	};
}

export default withRouter(connect(mapStateToProps, { loginUser: loginUser })(Login));
