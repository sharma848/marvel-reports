import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import Loader from '../Loader/Loader';
import { getReleaseBurndownChartData } from '../../Actions/index';

export class ReleaseBurndownChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: null,
			ReleaseBurndownChartData: null,
			fixVersionData: null
		};
	}

	componentDidMount() {
		this.props.getReleaseBurndownChartData();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.ReleaseBurndownChartData && nextProps.ReleaseBurndownChartData && nextProps.ReleaseBurndownChartData.data) {
			this.setState({ ReleaseBurndownChartData: nextProps.ReleaseBurndownChartData.data.epics }, this.setChartData);
		}
	}

	setChartData() {
		var completedEpicData = [];
		var remainingEpicData = [];
		var closedEpicData = [];
		var labels = [];
		var bgColor = []; // green: #228b22 blue: #4765d5 yellow: #ffbf00
		var data = this.state.ReleaseBurndownChartData ? this.state.ReleaseBurndownChartData.map((value) => {
			const completedPercentage = Math.round((value.closedSP / value.totalSP) * 100);
			const remainingPercentage = Math.round((value.remainingSP / value.totalSP) * 100);
			if(value.remainingSP == 0 && value.status === 'Accepted') {
				bgColor.push('#228b22');
				closedEpicData.push(100);
			} else if(value.remainingSP == 0 && value.status === 'Closed'){
				bgColor.push('#4765d5');
				closedEpicData.push(100);				
			} else if(value.status === 'In Progress'){
				bgColor.push('#228b22');
			} else {
				closedEpicData.push(0);
			}
			completedEpicData.push(completedPercentage);
			remainingEpicData.push(remainingPercentage);
			labels.push(value.id + ' ' + value.name);

		}) : '';

		const chartData = {
			labels: ['labels', 'new'],
			datasets: [
				{
				  label: 'Remaining %',
				  data: [23, 43, 45],
				  backgroundColor: '#ffbf00'
				},
				{
				  label: 'Completed %',
				  data: [34, 45, 45],
				  backgroundColor: 'green'
				}
			]
		};
		this.setState({ chartData });
	}

	showGraph = () => {
        const data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                    label: "My First dataset",
                    backgroundColor: 'transparent',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45],
                },
                {
                    label: "My First dataset",
                    backgroundColor: 'transparent',
                    borderColor: 'rgb(255, 99, 2)',
                    data: [3, 40, 55, 92, 40, 70, 5],
                }

            ]
        };
		return (
			<div className="chart-content-container">
				{true ? (
					<div>
						<button type="button" className="close close-button" aria-label="Close" onClick={() => this.props.removeChart(this.props.name)}>
							<span aria-hidden="true">&times;</span>
						</button>
                        <Line
                            data={data}
                            options={{
                                scales: {
                                    yAxes: [{
                                        stacked: true
                                    }]
                                }
                            }}
                            height={500}
                            width={700}
                        />
					</div>
				) : (
					<Loader />
				)}
			</div>
		);
	};

	render() {
		return <div>{this.showGraph()}</div>;
	}
}

function mapStateToProps(state) {
	return {
		ReleaseBurndownChartData: state.ReleaseBurndownChartData
	};
}

const actions = {
	getReleaseBurndownChartData: getReleaseBurndownChartData
};

export default connect(mapStateToProps, actions)(ReleaseBurndownChart);
