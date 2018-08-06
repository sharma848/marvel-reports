import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { getUserDetails, updateUserStatus, emptyuserAccessData } from '../../Actions/index';

export class UserDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            actionStatus: null
        };
    }

    onClick = (status) => {
        this.props.updateUserStatus(this.props.userData.email, status, this.props.userData.role);
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.userAccessData && nextProps.userAccessData.data) {
            alert('Request Successful');
            this.props.getUserDetails();
            this.props.emptyuserAccessData();
        }
    }

    render() {
        return (
            <tr>
                <td>{this.props.SNo}</td>
                <td>{this.props.userData.name}</td>
                <td>{this.props.userData.email}</td>
                <td>{this.props.userData.role}</td>
                <td>{this.props.userData.status}</td>
                <td><Button className="btn btn-success" onClick={() => this.onClick('approved')}>Approve</Button></td>
                <td><Button className="btn btn-danger" onClick={() => this.onClick('declined')}>Decline</Button></td>
            </tr>
        );
    }
}

function mapStateToProps(state) {
    return {
        userAccessData: state.userAccessData
    };
}

const actions = { 
    getUserDetails: getUserDetails,
    updateUserStatus: updateUserStatus,
    emptyuserAccessData: emptyuserAccessData
};

export default withRouter(connect( mapStateToProps, actions )(UserDetail));
