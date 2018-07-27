import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                    <div className="form-group">
                        <input 
                            type="text"
                            className="form-control"
                            id="empid" 
                            name="empid"
                            placeholder="Enter your Employee Id" 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className="form-control"
                            id="email" 
                            placeholder="Enter your name" 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email"
                            className="form-control"
                            ref="email" 
                            id="email" 
                            placeholder="Enter your email" 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-control"
                            ref="password" 
                            id="password" 
                            placeholder="Enter your password" 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control"
                            ref="role" 
                            id="role" 
                            placeholder="Enter your role" 
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Signup" className="btn btn-large"/>
                    </div>
                </form>
                <span>Already registered? <Link to={'/login'}>Login</Link></span>
            </div>
        );
    }
}