import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Marvel Reports</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.props.user_data.name}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to={
                                    {
                                        pathname: "/dashboard/account",
                                        userData: this.props.user_data
                                    }
                                } className="dropdown-item">Account</Link>
                                <Link to="/dashboard/settings" className="dropdown-item">Setting</Link>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" onClick={this.props.logout}>Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}