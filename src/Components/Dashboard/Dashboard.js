import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { getDashboard } from '../../Actions/index';
import Header from '../Header/Header';
import SideBar from '../Sidebar/SideBar';

export class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            redirect: false
        };
        this.getDetails = this.getDetails.bind(this);
    }

    componentWillMount() {
        this.props.getDashboard();
    }

    componentDidMount() {
        if(sessionStorage.getItem('SessionToken') == null) {
            this.setState({ redirect: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.dashboardData && nextProps.dashboardData.data) {
            const data = nextProps.dashboardData.data.data[0];
            this.setState({ data: data });
        }
    }

    getDetails() {
        const displayData = (<div>
            {this.state.data.name}<br />
            {this.state.data.email}<br />
            {this.state.data.role}
        </div>);
        return displayData;
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
                <Header logout={this.logout} />
                <SideBar />
                <div className="dashboard-container">
                    <div className="action-requests">
                        {this.state.data ? this.getDetails() : 'Loading...'}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        dashboardData: state.dashboardData
    };
}

export default connect(mapStateToProps, { getDashboard: getDashboard })(Dashboard);