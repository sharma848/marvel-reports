import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { getUserDetails, updateUserStatus } from '../../Actions/index';

export class UserDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            actionStatus: null
        };
    }

    onClick = (status) => {
        this.props.updateUserStatus(this.props.userData.email, status);
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.usersData && nextProps.usersData.data) {
            const data = nextProps.usersData.data.data;
            alert('request approved');
            this.props.getUserDetails();

        }
    }

    render() {
        return (
            <tr>
                <td>{this.props.SNo}</td>
                <td>{this.props.userData.name}</td>
                <td>{this.props.userData.email}</td>
                <td>{this.props.userData.status}</td>
                <td><Button className="btn btn-success" onClick={() => this.onClick('approved')}>Approve</Button></td>
                <td><Button className="btn btn-danger">Decline</Button></td>
            </tr>
        );
    }
}

function mapStateToProps(state) {
    return {
        usersData: state.usersData
    };
}

const actions = { 
    getUserDetails: getUserDetails,
    updateUserStatus: updateUserStatus
};

export default connect( mapStateToProps, actions )(UserDetail);