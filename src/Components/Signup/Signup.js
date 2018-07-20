import React, { Component } from 'react';
import { SignupData } from '../../Constants/appConstants';

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }
    }

    render() {
        return (
            <div className="form-container">
                <span className="form-header">{SignupData.signupText}</span>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-control">
                        <input 
                            type="text"
                            id="empid" 
                            name="empid"
                            placeholder="Enter your Employee Id" 
                        />
                    </div>
                    <div className="form-control">
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter your name" 
                        />
                    </div>
                    <div className="form-control">
                        <input 
                            type="email"
                            ref="email" 
                            id="email" 
                            placeholder="Enter your email" 
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
                        <input 
                            type="text" 
                            ref="role" 
                            id="role" 
                            placeholder="Enter your role" 
                        />
                    </div>
                    <div className="form-control">
                        <input type="submit" value="Login" />
                    </div>
                </form>
            </div>
        );
    }
}