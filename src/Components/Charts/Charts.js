import React, { Component } from 'react';
import BarChart from './BarChart';

export default class Charts extends Component {
    render() {
        return (
            <div className="charts">
                <BarChart />
                <BarChart />
                <BarChart />
            </div>
        );
    }
}