import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

export default class BarCharts extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['Delhi', 'Mumbai', 'Banglore', 'Chennai', 'Nagpur', 'Gurgoan'],
                datasets: [
                    {
                        label: 'Population',
                        data: [
                            323455,
                            455676,
                            838374,
                            595959,
                            404040,
                            474747
                        ],
                        backgroundColor: [
                            '#76A7FA',
                            'rgba(54,162, 235, 0.6)',
                            'rgba(75, 206, 86, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 164, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                        ]
                    }
                ]
            }
        };
    }
    render() {
        return (
            <div>
                <Bar
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: true,
                            text: 'Largest Cities in India',
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />

<Line
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: true,
                            text: 'Largest Cities in India',
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />

<Pie
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: true,
                            text: 'Largest Cities in India',
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
        );
    }
}