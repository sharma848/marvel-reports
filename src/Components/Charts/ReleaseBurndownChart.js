import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import Highcharts from 'highcharts';
import Loader from '../Loader/Loader';
import { getReleaseBurndownChartData } from '../../Actions/index';
import FormControl from 'react-bootstrap/lib/FormControl';
import { FormGroup, Col, ControlLabel } from 'react-bootstrap';

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
		// this.props.getReleaseBurndownChartData();
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
			labels: labels,
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
		return (
			<div className="chart-content-container">
				{true ? (
					<div>
						<button type="button" className="close close-button" aria-label="Close" onClick={() => this.props.removeChart(this.props.name)}>
							<span aria-hidden="true">&times;</span>
						</button>
						<Line
							width={700}
							height={500}
							data={this.state.chartData}
							options={{
								animation: {
									onComplete: function (data) {
									  var chartInstance = data.chart;
									  var Chart = data.chart;;
									  var ctx = chartInstance.ctx;
									  ctx.textAlign = "center";
									  ctx.font = '12px "Helvetica Neue", Helvetica, Arial, sans-serif';
									  ctx.fillStyle = '#fff';
									  var height = chartInstance.controller.boxes[0].bottom;
									  this.data.datasets.forEach(function (dataset, i) {
										var meta = chartInstance.controller.getDatasetMeta(i);
										meta.data.forEach(function (bar, index) {
											ctx.fillText(dataset.data[index], bar._model.x, height - ((height - bar._model.y) / 2));
										});
									  });
									}
								},
								title: {
									display: true,
									text: this.state.chartName,
									fontSize: 25
								},
								legend: {
									display: true,
									position: 'bottom'
								},
								maintainAspectRatio: false,
								responsive: true,
								scales: {
									xAxes: [{
										stacked: true,
										ticks: {
											autoSkip: false,
											userCallback: function(value, index, values) {
												return value.split(" ")[0];
											}
										}
									}],
									yAxes: [{
										stacked: true
									}]
								},
								tooltips: {
									callbacks: {
										title: function(tooltipItem, data) {
											var label = data.labels[tooltipItem[0].index];
											return label;
										}
									}
								}
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
		ReleaseBurndownChartData: state.ReleaseBurndownChartData
	};
}

const actions = {
	getReleaseBurndownChartData: getReleaseBurndownChartData
};

export default connect(mapStateToProps, actions)(ReleaseBurndownChart);
