import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import { getVelocityChartData } from '../../Actions/index';

export class BarChart extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            chartData: null,
            showGraph: true,
            velocityData: null
        };
    }

    componentDidMount() {
        this.props.getVelocityChartData();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.velocityChartData && nextProps.velocityChartData.data) {
            this.setState({ velocityData: nextProps.velocityChartData.data.data }, this.setVelocityChartData);
        }
    }

    setVelocityChartData() {
        const data = this.state.velocityData.velocity_data[0].sprints.map(value => {
            return value.actual;
        });
        const labels = this.state.velocityData.velocity_data[0].sprints.map(value => {
            return value.name;
        });

        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Actual Points',
                    data: data,
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
        }
        this.setState({ chartData });
    }

    showGraph = () => {
        return (
            <div>
                {this.state.velocityData ? (<div><button type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
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
                /></div>) : (<Loader />)}
                
            </div>
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

function mapStateToProps(state) {
	return {
		velocityChartData: state.velocityChartData
	};
}

const actions = {
	getVelocityChartData: getVelocityChartData
};

export default connect(mapStateToProps, actions)(BarChart);
