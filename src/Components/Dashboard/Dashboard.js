import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getDashboard } from '../../Actions/index';
import Profile from './Profile';

export class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
        this.getDetails = this.getDetails.bind(this);
    }

    componentWillMount() {
        this.props.getDashboard();
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
                <Profile data={data} index={i} />
            );
        });
        return displayData;
    }

    render() {
        return (
            <div className="dashboard">
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