import React, { Component } from 'react';
import { LoginData, SERVICES_CONST } from '../../Constants/appConstants';
import Services from '../../Services/Services';

export default class Login extends Component {

    static shiftFocusToUserInput() {
        const inputbox = document.getElementById('emp');
        inputbox.focus();
    }

    constructor(props) {
        super(props);
        this.state = {
            abc: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.escFunction = this.escFunction.bind(this);
    }

    componentDidMount() {
        Login.shiftFocusToUserInput();
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
        console.log("event listener removed");
    }

    escFunction(event){
        console.log(event);
        if(event.keyCode === 27) {
            this.setState({ abc: false });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }
        const responseData = Services(SERVICES_CONST.LOGIN, formData);
        console.log(responseData);
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
                {this.state.abc ? <div>hello</div> : <div>bye</div>}
            </div>
        );
    }
}