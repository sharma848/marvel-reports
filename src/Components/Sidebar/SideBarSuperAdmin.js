import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class SideBarSuperAdmin extends Component {
    render() {
        return (
            <div className="sidenav">
                <NavLink to="/dashboard/userAccess" activeClassName={"active"}>User Settings</NavLink>
                <NavLink to="/dashboard/chart">Reports</NavLink>
                <NavLink to="/dashboard/configurations">Configurations</NavLink>
            </div>
        );
    }
}