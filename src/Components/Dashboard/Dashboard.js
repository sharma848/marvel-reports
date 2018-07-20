import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getDashboard } from '../../Actions/index';
import Profile from './Profile';

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
            const data = nextProps.dashboardData.data;
            this.setState({ data: data });
        }
    }

    getDetails() {
        const displayData = this.state.data.map((data, i) => {
            return (
                <Profile data={data} key={i} />
            );
        });
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
            <Button type="button" onClick={this.logout}>Logout</Button>
                <div className="action-panel">
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