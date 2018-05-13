import React, { Component } from 'react';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const name = this.props.location.state.data[0].title;
        return (
            <div className="dashboard">
                <div className="action-panel">
                    <div className="action-requests">
                        <div><span>Name: </span>{name ? name : 'invalid user'}</div>
                        <div><span>Project: </span>{name}</div>
                        <button type="button" className="btn btn-success">Approve</button>
                        <button type="button" className="btn btn-danger">Decline</button>
                    </div>
                </div>
            </div>
        );
    }
}