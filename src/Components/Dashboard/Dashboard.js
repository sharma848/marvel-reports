import React, { Component } from 'react';

export default class Dashboard extends Component {
    render() {
        const name = 'Abhishek';
        return (
            <div className="dashboard">
                <div className="action-panel">
                    <div className="action-requests">
                        <div><span>Name: </span>{name}</div>
                        <div><span>Project: </span>{name}</div>
                        <button type="button" className="btn btn-success">Approve</button>
                        <button type="button" className="btn btn-danger">Decline</button>
                    </div>
                </div>
            </div>
        );
    }
}