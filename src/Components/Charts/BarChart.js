import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class BarChart extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['Delhi', 'Mumbai', 'Banglore', 'Chennai', 'Nagpur', 'Gurgoan', 'Gurgoan', 'Gurgoan', 'Gurgoan', 'Gurgoan', 'Gurgoan', 'Gurgoan', 'Gurgoan'],
                datasets: [
                    {
                        label: 'Population',
                        data: [
                            323455,
                            455676,
                            838374,
                            595959,
                            404040,
                            474747,
                            474747,
                            474747,
                            474747,
                            474747,
                            474747,
                            474747,
                            474747,
                            474747,
                            474747,
                            474747
                        ],
                        backgroundColor: [
                            '#76A7FA',
                            'rgba(54,162, 235, 0.6)',
                            'rgba(75, 206, 86, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 164, 0.6)',
                            'rgba(255, 159, 164, 0.6)',
                            'rgba(255, 159, 164, 0.6)',
                            'rgba(255, 159, 164, 0.6)',
                            'rgba(255, 159, 164, 0.6)',
                            'rgba(255, 159, 164, 0.6)',
                            'rgba(255, 159, 164, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                        ]
                    }
                ]
            },
            showGraph: false
        };
    }

    showGraph = () => {
        return (
            <Bar
                width={400}
                height={455}
                data={this.state.chartData}
                options={{
                    title: {
                        display: true,
                        text: this.props.name,
                        fontSize: 25
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    },
                    maintainAspectRatio: false,
                    responsive: true
                }}
            />
        );
    }

    showForm = () => {
        return (
            <div>
                
            </div>
        );
    }

    render() {
        return (
            <div className="chart">
                {this.state.showGraph ? this.showGraph() : this.showForm()}
            </div>
        );
    }
}