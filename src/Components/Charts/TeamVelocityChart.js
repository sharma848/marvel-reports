import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import Highcharts from 'highcharts';
import Loader from '../Loader/Loader';
import { getTeamVelocityChartData } from '../../Actions/index';
import FormControl from 'react-bootstrap/lib/FormControl';
import { FormGroup, Col, ControlLabel } from 'react-bootstrap';

export class TeamVelocityChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: null,
			teamVelocityChartData: null,
			fixVersionData: null
		};
	}

	componentDidMount() {
		// this.props.getTeamVelocityChartData();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.teamVelocityChartData && nextProps.teamVelocityChartData && nextProps.teamVelocityChartData.data) {
			this.setState({ teamVelocityChartData: nextProps.teamVelocityChartData.data.epics }, this.setChartData);
		}
	}

	setChartData() {
		var completedEpicData = [];
		var remainingEpicData = [];
		var closedEpicData = [];
		var labels = [];
		var bgColor = []; // green: #228b22 blue: #4765d5 yellow: #ffbf00
		var data = this.state.teamVelocityChartData ? this.state.teamVelocityChartData.map((value) => {
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
				  data: [23, 43, 45],
				  backgroundColor: 'green'
				}
			]
		};
		this.setState({ chartData });
	}

	showGraph = () => {
        const data = {
            labels: ['labels', 'new', 'two', 'three', 'four'],
			datasets: [
				{
				  label: 'Remaining %',
				  data: [23, 43, 45, 50, 60],
				  backgroundColor: '#ffbf00'
				},
				{
				  label: 'Completed %',
				  type: 'line',
				  data: [23, 43, 45, 50, 60],
				  backgroundColor: 'transparent',
				  borderColor: 'rgb(255, 99, 2)',
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
                        <Bar
							width={700}
							height={500}
							data={data}
							options={{
								title: {
									display: true,
									text: this.props.name,
									fontSize: 25
								},
								legend: {
									display: true,
									position: 'bottom'
								},
								maintainAspectRatio: false,
								responsive: true,
							}}
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
		teamVelocityChartData: state.teamVelocityChartData
	};
}

const actions = {
	getTeamVelocityChartData: getTeamVelocityChartData
};

export default connect(mapStateToProps, actions)(TeamVelocityChart);
