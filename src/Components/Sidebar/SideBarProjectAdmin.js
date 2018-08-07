import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SideBarProjectAdmin extends Component {
    render() {
        return (
            <div class="sidenav">
                <Link to="/dashboard/configurations">Configurations</Link>
            </div>
        );
    }
}