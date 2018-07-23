import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { LoginData } from '../../Constants/appConstants';
import { loginUser } from '../../Actions/index';
import SideBar from '../Sidebar/SideBar';
import Header from '../Header/Header';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            email: '',
            password: '',
            redirect: false
        };
    }

    componentDidMount() {
        if(sessionStorage.getItem('SessionToken') != null) {
            this.setState({ redirect: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        const data = nextProps.loginData.data;
        this.validateLogin(data);
    }

    validateLogin(data) {
        if(data.statusCode === 200) {
            sessionStorage.setItem('SessionToken', data.data.data[0].token);
            this.props.history.push('/dashboard');
        } else {
            this.setState({
                errorMessage: data.message
            });
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.loginUser(this.state);
    }

    render() {

        if(this.state.redirect) {
            return (<Redirect to={'/dashboard'} />);  
        }
        return (
            <div className="form-container">
                <span className="form-header">{LoginData.loginText}</span>
                <form onSubmit={this.handleSubmit}>
                        <input 
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            onChange={this.onChange}
                            placeholder="Enter your email Id" 
                        />
                        <input 
                            type="password"
                            className="form-control margin-top-10"
                            name="password"
                            onChange={this.onChange}
                            placeholder="Enter your password" 
                        />
                    <Button type="submit" className="btn btn-primary">Login</Button>
                </form>
                {this.state.errorMessage ? <div className="error-message">{this.state.errorMessage}</div> : ''}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loginData: state.loginData
    };
}

export default connect(mapStateToProps, { loginUser: loginUser })(Login);