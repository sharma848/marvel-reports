import React, { Component } from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import { Line } from 'react-chartjs-2';
import Loader from '../Loader/Loader';
import { getPlanVsActualChartData } from '../../Actions/index';

export class PlanVsActualChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: null,
			chartName: this.props.name,
			PlanVsActualChartData: null,
			fixVersionData: null
		};
		this.chartContainer = React.createRef();
	}

	componentDidMount() {
		this.props.getPlanVsActualChartData();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.PlanVsActualChartData && nextProps.PlanVsActualChartData && nextProps.PlanVsActualChartData.data) {
			this.setState({ PlanVsActualChartData: nextProps.PlanVsActualChartData.data.data }, this.setChartData);
		}
		if(this.chart) {
			this.chart.reflow();
		}
	}

	setChartData() {
		var labels = [];
		var total_number_of_sprint = this.state.PlanVsActualChartData.number_of_sprints;
		var commited_story_points = [];
		var actual_story_points = [];

		for(let i = 0; i<total_number_of_sprint; i++) {
			labels.push(`Sprint ${i+1}`);
		}
		var data = this.state.PlanVsActualChartData ? this.state.PlanVsActualChartData.sprint_data.map((value) => {
			commited_story_points.push(value.committed);
			actual_story_points.push(value.actual);
		}) : '';

		const chartData = {
			chart: {
				type: 'line'
			},
			title: {
				text: this.state.chartName
			},
			xAxis: {
				categories: labels,
				showEmpty: false
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
				name: 'Planned Story Points',
				data: commited_story_points,
				color: '#434348'
			}, {
				name: 'Actual Story Points',
				data: actual_story_points,
				color: '#228B22'
			}]
		};
		this.setState({ chartData }, this.renderHighChart);
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
				{this.state.PlanVsActualChartData ? (
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
		return <div>{this.showGraph()}</div>;
	}
}

function mapStateToProps(state) {
	return {
		PlanVsActualChartData: state.PlanVsActualChartData
	};
}

const actions = {
	getPlanVsActualChartData: getPlanVsActualChartData
};

export default connect(mapStateToProps, actions)(PlanVsActualChart);
