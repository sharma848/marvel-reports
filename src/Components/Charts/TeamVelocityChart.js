import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import Highcharts from 'highcharts';
import Loader from '../Loader/Loader';
import { getTeamVelocityChartData, postUserDashboard } from '../../Actions/index';
import FormControl from 'react-bootstrap/lib/FormControl';
import { FormGroup, Col, ControlLabel } from 'react-bootstrap';

export class TeamVelocityChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: null,
			teamVelocityChartData: null,
			chartName: this.props.name,
			fixVersionData: null,
			showGraph: false
		};
		this.chartContainer = React.createRef();
	}

	componentDidMount() {
		this.props.getTeamVelocityChartData();
		this.props.postUserDashboard({ graphId: this.props.name });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.teamVelocityChartData && nextProps.teamVelocityChartData && nextProps.teamVelocityChartData.data) {
			this.setState({ teamVelocityChartData: nextProps.teamVelocityChartData.data.data }, this.setChartData);
		}
		if(this.chart) {
			this.chart.reflow();
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
			chart: {
				type: 'column'
			},
			title: {
				text: this.state.chartName
			},
			xAxis: {
				categories: labels,
			},
			credits: {
				enabled: false
			},
			yAxis: {
				min: 0,
				max: 100,
				title: {
					text: 'Percentage'
				}
			},
			legend: {
				align: 'center',
				x: 0,
				verticalAlign: 'bottom',
				y: 0,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
				borderColor: '#CCC',
				borderWidth: 1,
				shadow: false
			},
			tooltip: {
				pointFormat: '<span style="color:{series.color}">{series.name}</span>: ({point.y:.0f})<br/>',
				shared: true
			},
			plotOptions: {
				line: {
					dataLabels: {
						enabled: false,
						style: {
							fontSize: '8px'
						},
						formatter: function() {
							return Highcharts.numberFormat(Math.round(this.y), 0, 0, ",");
						},
					},
					enableMouseTracking: true
				}
			},
			exporting: true,
			series: [{
				name: 'Velocity',
				data: actual_story_point,
				dataLabels: {
					enabled: true,
					rotation: -90,
					color: '#FFFFFF',
					align: 'right',
					style: {
					   fontSize: '8px',
					   fontWeight: 'normal'
					}
				},
				color: '#ffbf00'
			}, {
				name: 'Velocity Trend Line',
				type: 'line',
				dashStyle: 'dash',
				data: actual_story_point,
				color: '#228b22'
			}]
		};
		this.setState({
			chartData,
			showGraph: true
		}, this.renderHighChart);
	}

	renderHighChart =() => {
		this.chart = new Highcharts[this.props.type || "Chart"](
            this.chartContainer.current, 
            this.state.chartData
        );
	}


	showGraph = () => {
		const element = React.createElement('div', { ref: this.chartContainer, id: Math.random(), key: this.props.key });
		return (
			<div className="chart-content-container">
				{this.state.teamVelocityChartData ? (
					<div>
						<button type="button" className="close close-button" aria-label="Close" onClick={() => this.props.removeChart(this.props.name)}>
							<span aria-hidden="true">&times;</span>
						</button>
						{element}
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
	getTeamVelocityChartData: getTeamVelocityChartData,
	postUserDashboard, postUserDashboard
};

export default connect(mapStateToProps, actions)(TeamVelocityChart);
