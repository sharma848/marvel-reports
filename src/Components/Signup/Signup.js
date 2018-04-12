import React, { Component } from 'react';
import { SignupData } from '../../Constants/appConstants';

export default class Signup extends Component {
    render() {
        return (
            <div className="Login-container">
                <span className="Login-text">{SignupData.signupText}</span>
                <form method="post">
                    <div className="form-control">
                        <input 
                            type="text"
                            name="username" 
                            id="username" 
                            placeholder="Enter your username" 
                        />
                    </div>
                    <div className="form-control">
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Enter your password" 
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