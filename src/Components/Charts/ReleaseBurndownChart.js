import React, { Component } from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import { Line } from 'react-chartjs-2';
import Loader from '../Loader/Loader';
import { getReleaseBurndownChartData } from '../../Actions/index';

export class ReleaseBurndownChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: null,
			ReleaseBurndownChartData: null,
			fixVersionData: null,
			chartName: this.props.name,
			showGraph: false
		};
		this.chartContainer = React.createRef();
	}

	componentDidMount() {
		this.props.getReleaseBurndownChartData();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.ReleaseBurndownChartData && nextProps.ReleaseBurndownChartData && nextProps.ReleaseBurndownChartData.data) {
			this.setState({ ReleaseBurndownChartData: nextProps.ReleaseBurndownChartData.data.data }, this.setChartData);
		}
	}

	setChartData() {
		var burndownStoryPoint = [];
		var labels = [];
		var total_number_of_sprint = this.state.ReleaseBurndownChartData.number_of_sprints;
		var total_story_point = this.state.ReleaseBurndownChartData.total_story_point;
		var ideal_story_point_burned = Math.round(total_story_point - (total_story_point / total_number_of_sprint));
		var ideal_story_point_burned_data = [];
		for(let i = 0; i<total_number_of_sprint; i++) {
			if(i === 0) {
				ideal_story_point_burned_data.push(ideal_story_point_burned);
			} else {
				ideal_story_point_burned = Math.round(ideal_story_point_burned - (total_story_point / total_number_of_sprint));
				ideal_story_point_burned_data.push(ideal_story_point_burned);
			}
			labels.push(`Sprint ${i+1}`);
		}
		var data = this.state.ReleaseBurndownChartData ? this.state.ReleaseBurndownChartData.sprint_data.map((value) => {
			total_story_point -= value.actual;
			burndownStoryPoint.push(total_story_point);
		}) : '';

		const chartData = {
			chart: {
				type: 'line'
			},
			title: {
				text: this.state.chartName
			},
			xAxis: {
				categories: labels
			},
			credits: {
				enabled: false
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Story Points'
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
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					dataLabels: {
						enabled: true,
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
					}
				}
			},
			exporting: true,
			series: [{
				name: 'Remaining Story Points',
				data: burndownStoryPoint,
				dashStyle: 'dash',
				color: '#d95700'
			}, {
				name: 'Ideal BurnDown',
				data: ideal_story_point_burned_data,
				color: '#434348'
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
		const total_story_point = this.state.ReleaseBurndownChartData.total_story_point;
		const element = React.createElement('div', { ref: this.chartContainer, id: Math.random(), className: 'highchart', key: this.props.key });
		return (
			<div className="chart-content-container">
				{this.state.ReleaseBurndownChartData ? (
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
		ReleaseBurndownChartData: state.ReleaseBurndownChartData
	};
}

const actions = {
	getReleaseBurndownChartData: getReleaseBurndownChartData
};

export default connect(mapStateToProps, actions)(ReleaseBurndownChart);
