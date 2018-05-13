import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LoginData } from '../../Constants/appConstants';
import { loginUser } from '../../Actions/index';

export class Login extends Component {

    static shiftFocusToUserInput() {
        const inputbox = document.getElementById('emp');
        inputbox.focus();
    }

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        Login.shiftFocusToUserInput();
    }
    componentWillReceiveProps(nextProps) {
        const data = nextProps.loginData.data;
        this.validateLogin(data);
    }

    validateLogin(data) {
        if(data.statusCode === 200) {
            this.props.history.push('/dashboard', data);
        } else {
            this.setState({
                errorMessage: data.message
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }
        this.props.loginUser();
    }

    render() {
        return (
            <div className="form-container">
                <span className="form-header">{LoginData.loginText}</span>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-control">
                        <input 
                            type="text"
                            ref="emp" 
                            id="emp" 
                            placeholder="Enter your Employee Id" 
                        />
                    </div>
                    <div className="form-control">
                        <input 
                            type="password" 
                            ref="password" 
                            id="password" 
                            placeholder="Enter your password" 
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
        loginData: state.loginData
    };
}

export default connect(mapStateToProps, { loginUser: loginUser })(Login);