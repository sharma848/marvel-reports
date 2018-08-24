import React, { Component } from 'react';

export default class Account extends Component {

    render() {
        return (
            <div className="dashboard-container">
                {this.props.location.userData ? (<div>
                    <dl class="dl-horizontal">
                        <dt>Name:</dt>
                        <dd>{this.props.location.userData.name}</dd>
                        <dt>Email:</dt>
                        <dd>{this.props.location.userData.email}</dd>
                        <dt>Role:</dt>
                        <dd>{this.props.location.userData.role}</dd>
                    </dl>
                </div>) : <div>No data available.</div>}
            </div>
        );
    }
}