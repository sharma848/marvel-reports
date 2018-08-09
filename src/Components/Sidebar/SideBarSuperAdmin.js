import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SideBarSuperAdmin extends Component {
    render() {
        return (
            <div className="sidenav">
                <Link to="/dashboard/userAccess">User Settings</Link>
                <Link to="/dashboard/chart">Reports</Link>
                <Link to="/dashboard/configurations">Configurations</Link>
            </div>
        );
    }
}