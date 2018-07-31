import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class UserDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            actionStatus: null
        };
    }

    componentWillReceiveProps(nextProps) {
        
    }

    render() {
        return (
            <tr>
                <td>{this.props.index + 1}</td>
                <td>{this.props.userData.name}</td>
                <td>{this.props.userData.email}</td>
                <td>{this.props.userData.status}</td>
                <td><Button className="btn btn-success">Approve</Button></td>
                <td><Button className="btn btn-danger">Decline</Button></td>
            </tr>
        );
    }
}