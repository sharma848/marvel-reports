import React, { Component } from 'react';

export default class Profile extends Component {
    render() {
        return (
            <div className={this.props.data.completed ? 'card done' : 'card pending'} key={this.props.index}>
                <span>{this.props.data.id}</span>
                <span>{this.props.data.title}</span>
            </div>
        );
    }
}