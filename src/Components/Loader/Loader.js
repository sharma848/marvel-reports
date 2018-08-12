import React, { Component } from 'react';
import loader from '../../assets/img/loader.gif';

export default class Loader extends Component {
    render() {
        return (
            <div className="loader">
                <img src={loader} />
            </div>
        );
    }
}