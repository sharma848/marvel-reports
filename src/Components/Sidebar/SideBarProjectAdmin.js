import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class SideBarSuperAdmin extends Component {
    render() {
        return (
            <div className="sidenav">
                <NavLink to="/dashboard/chart">Reports</NavLink>
            </div>
        );
    }
}