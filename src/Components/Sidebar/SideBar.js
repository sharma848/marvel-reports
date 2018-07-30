import React, { Component } from 'react';
import SideBarProjectAdmin from './SideBarProjectAdmin';
import SideBarReporter from './SideBarReporter';
import SideBarSuperAdmin from './SideBarSuperAdmin';
import SideBarView from './SideBarView';

export default class SideBar extends Component {
    render() {
        switch(this.props.role) {
            case 'super_admin': 
                return <SideBarSuperAdmin />;
            case 'project_admin': 
                return <SideBarProjectAdmin />;
            case 'reporter':
                return <SideBarReporter />;
            case 'view':
                return <SideBarView />
            default: return (<div>User role not defined</div>);
        }
    }
}