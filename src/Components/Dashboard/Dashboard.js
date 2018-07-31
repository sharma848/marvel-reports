import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Table } from 'react-bootstrap';

import { getDashboard, getUserDetails, updateUserStatus } from '../../Actions/index';
import Header from '../Header/Header';
import SideBar from '../Sidebar/SideBar';
import Routes from '../../routes';
import UserDetail from '../UserDetail/UserDetail';

export class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            allUsers: null,
            redirect: false
        };
        this.getDetails = this.getDetails.bind(this);
    }

    componentWillMount() {
        this.props.getDashboard();
        this.props.getUserDetails();

    }

    componentDidMount() {
        if(sessionStorage.getItem('SessionToken') == null) {
            this.setState({ redirect: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.dashboardData && nextProps.dashboardData.data) {
            const data = nextProps.dashboardData.data.data;
            this.setState({ data: data });
        }

        if(nextProps.usersData && nextProps.usersData.data) {
            const data = nextProps.usersData.data.data;
            this.setState({ allUsers: data });
        }

    }

    getDetails() {
        let SNo = 0;        
        const displayData = this.state.allUsers.map((user, index) => {
            if(user.status === "pending") {
                SNo += 1;
                return (
                    <UserDetail userData={user} index={index} SNo={SNo} />
                );
            }
            return '';
            
        });
        return (
            <Table bordered condensed hover>
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Approve</th>
                        <th>Decline</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData}
                </tbody>
            </Table>
        );
    }
    logout = () => {
        console.log(sessionStorage.getItem('SessionToken'));
        sessionStorage.clear();
        this.setState({ redirect: true });
    }

    render() {

        if(this.state.redirect) {
            return (<Redirect to={'/login'} />);
        }

        return (
            <div className="dashboard">
                {this.state.data ? (
                <div>
                    <Header logout={this.logout} user_name={this.state.data.name} />
                    <SideBar role={this.state.data.role} />
                </div>) : ''}
                <div className="dashboard-container">
                    <div className="action-requests">
                {this.state.allUsers ? this.getDetails() : 'Loading...'}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        dashboardData: state.dashboardData,
        usersData: state.usersData
    };
}

const actions = { 
    getDashboard: getDashboard,
    getUserDetails: getUserDetails,
};

export default connect(mapStateToProps, actions )(Dashboard);