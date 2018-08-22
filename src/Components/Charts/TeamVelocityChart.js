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
			fixVersionData: null,
			showGraph: false
		};
	}

	componentDidMount() {
		this.props.getTeamVelocityChartData();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.teamVelocityChartData && nextProps.teamVelocityChartData && nextProps.teamVelocityChartData.data) {
			this.setState({ teamVelocityChartData: nextProps.teamVelocityChartData.data.data }, this.setChartData);
		}
	}

	setChartData() {
		var actual_story_point = [];
		var labels = [];
		var data = this.state.teamVelocityChartData ? this.state.teamVelocityChartData.sprint_data.map((value) => {
			actual_story_point.push(value.actual);
			labels.push(value.sprint_name);
		}) : '';

		const chartData = {
			labels: labels,
			datasets: [
				{
				  label: 'Velocity',
				  data: actual_story_point,
				  backgroundColor: '#ffbf00'
				},
				{
				  label: 'Velocity Trend Line',
				  type: 'line',
				  data: actual_story_point,
				  borderWidth: 1,
				  borderDash: [5,3],
				  backgroundColor: 'transparent',
				  borderColor: 'rgb(255, 99, 2)',
				}
			]
		};
		this.setState({
			chartData,
			showGraph: true
		});
	}

	showGraph = () => {
		return (
			<div className="chart-content-container">
				{this.state.teamVelocityChartData ? (
					<div>
						<button type="button" className="close close-button" aria-label="Close" onClick={() => this.props.removeChart(this.props.name)}>
							<span aria-hidden="true">&times;</span>
						</button>
                        <Bar
							width={700}
							height={500}
							data={this.state.chartData}
							options={{
								animation: {
									onProgress: function (data) {
									  var chartInstance = data.chart;
									  var Chart = data.chart;;
									  var ctx = chartInstance.ctx;
									  ctx.textAlign = "center";
									  ctx.font = '12px "Helvetica Neue", Helvetica, Arial, sans-serif';
									  ctx.fillStyle = '#000';
									  var height = chartInstance.controller.boxes[0].bottom;
									  this.data.datasets.forEach(function (dataset, i) {
										var meta = chartInstance.controller.getDatasetMeta(i);
										meta.data.forEach(function (bar, index) {
											ctx.fillText(dataset.data[index], bar._model.x, height - ((height - bar._model.y) / 1.2));
										});
									  });
									}
								},
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
		return <div>{this.state.showGraph ? this.showGraph() : <Loader />}</div>;
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
