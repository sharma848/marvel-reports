import React, { Component } from 'react';
import { LoginData } from '../../Constants/appConstants';

export default class Login extends Component {

    static shiftFocusToUserInput() {
        const inputbox = document.getElementById('username');
        inputbox.focus();
    }

    constructor(props) {
        super(props);
        this.state = {
            loginDetails: {
                username: '',
                password: ''
            }
        }
    }

    componentDidMount() {
        Login.shiftFocusToUserInput();
    }

    onLogin = (e) => {
        e.preventDefault();
        console.log(this.state.loginDetails);
        this.setState({
            loginDetails: {
                username: '',
                password: ''
            }
        });
    }

    onUsernameChange = (e) => {
        this.setState({
            loginDetails: {
                username: e.target.value,
                password: this.state.loginDetails.password
            }
        });
    }

    onPasswordChange = (e) => {
        this.setState({
            loginDetails: {
                username: this.state.loginDetails.username,
                password: e.target.value
            }
        });
    }

    render() {
        return (
            <div className="Login-container">
                <span className="Login-text">{LoginData.loginText}</span>
                <form method="post">
                    <div className="form-control">
                        <input 
                            type="text"
                            name="username" 
                            id="username" 
                            placeholder="Enter your username" 
                            value={this.state.loginDetails.username}
                            onChange={(e) => this.onUsernameChange(e)} 
                        />
                    </div>
                    <div className="form-control">
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Enter your password" 
                            value={this.state.loginDetails.password}
                            onChange={(e) => this.onPasswordChange(e)} 
                        />
                    </div>
                    <div className="form-control">
                        <input type="submit" value="Login" onClick={(e) => this.onLogin(e)} />
                    </div>
                </form>
            </div>
        );
    }
}