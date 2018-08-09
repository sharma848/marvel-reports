import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavDropdown, MenuItem } from 'react-bootstrap';

export default class Header extends Component {
    render() {
        const logo = require('../../assets/img/logo.png');
        return (
            <div id="wrapper" className="content">
      <Navbar fluid={true}  style={ {margin: 0} }>
      <Navbar.Header>
          <Navbar.Brand>
            <span>
              <img src={logo} alt="Marvel Reports" title="Marvel Reports" />
                <a href="/dashboard" title="Marvel Reports" rel="home">Marvel Reports</a>
            </span>
          </Navbar.Brand>
          </Navbar.Header>

            <ul className="nav navbar-top-links navbar-right">
           <NavDropdown bsClass="dropdown" title={this.props.user_data.name} id = 'navDropdown4'>
                  <MenuItem eventKey="1">
                  <Link to={
                                    {
                                        pathname: "/dashboard/account",
                                        userData: this.props.user_data
                                    }
                                } className="fa fa-user fa-fw">User Profile</Link>
                  </MenuItem>
                  <MenuItem eventKey="2">
                  <Link to="/dashboard/settings" className="fa fa-gear fa-fw">Settings</Link>
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey = "4" onClick = {this.props.logout}>
                    <span> <i className = "fa fa-sign-out fa-fw" /> Logout </span>
                  </MenuItem>
            </NavDropdown>
            </ul>
    </Navbar>
        </div>
        );
    }
}