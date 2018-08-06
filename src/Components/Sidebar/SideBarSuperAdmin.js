import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SideBarSuperAdmin extends Component {
    render() {
        return (
            <div className="sidenav">
                <Link to="/dashboard/userAccess">Access Requests</Link>
                <Link to="/dashboard/chart">Bar chart</Link>
            </div>
        );
    }
}