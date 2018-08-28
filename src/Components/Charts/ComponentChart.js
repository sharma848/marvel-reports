import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import Highcharts from 'highcharts';
import Loader from '../Loader/Loader';
import { getAllComponents, getComponentChartData, postUserDashboard } from '../../Actions/index';
import FormControl from 'react-bootstrap/lib/FormControl';
import { FormGroup, Col, ControlLabel } from 'react-bootstrap';

export class ComponentChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: null,
			showGraph: false,
			chartName: (props.settings && props.settings.chartName) || this.props.name,
			componentChartData: null,
			componentData: null,
			component: props.settings && props.settings.component
		};
		this.chartContainer = React.createRef();
		this.chart = '';
	}

	componentDidMount() {
		if (this.state.component && !this.state.componentChartData) {
			this.setState({ showGraph: true });
		}
		this.props.getAllComponents();
	}

	componentWillReceiveProps(nextProps) {
		const component = this.state.component;
		if (nextProps.allComponentData && nextProps.allComponentData.data) {
			this.setState({ componentData: nextProps.allComponentData.data.components });
		}
		if (nextProps.componentChartData && nextProps.componentChartData[component] && nextProps.componentChartData[component].data) {
			this.setState({ componentChartData: nextProps.componentChartData[component].data.epics }, this.setChartData);
		}
		if (this.chart) {
			this.chart.reflow();
		}
	}

	setChartData() {
		var completedEpicData = [];
		var remainingEpicData = [];
		var closedEpicData = [];
		var labels = [];
		var data = this.state.componentChartData ? this.state.componentChartData.map((value) => {
			const completedPercentage = Math.round((value.closedSP / value.totalSP) * 100);
			const remainingPercentage = Math.round((value.remainingSP / value.totalSP) * 100);
			if (value.remainingSP == 0 && value.status === 'Accepted') {
				closedEpicData.push(100);
			} else {
				closedEpicData.push(0);
			}
			completedEpicData.push(completedPercentage);
			remainingEpicData.push(remainingPercentage);
			labels.push(value.id + ' ' + value.name);

		}) : '';
		const chartData = {
			chart: {
				type: 'column'
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
				pointFormat: '<span style="color:{series.color}">{series.name}</span>: ({point.percentage:.0f}%)<br/>',
				shared: true
			},
			plotOptions: {
				column: {
					stacking: 'percent'
				}
			},
			exporting: true,
			series: [{
				name: 'Remaining %',
				data: remainingEpicData,
				dataLabels: {
					enabled: true,
					rotation: -90,
					color: '#FFFFFF',
					align: 'right',
					style: {
						fontSize: '8px',
						fontWeight: 'normal'
					},
					format: '{point.percentage:.0f}%'
				},
				color: '#ffbf00'
			}, {
				name: 'Completed %',
				data: completedEpicData,
				dataLabels: {
					enabled: true,
					rotation: -90,
					color: '#FFFFFF',
					align: 'right',
					style: {
						fontSize: '8px',
						fontWeight: 'normal'
					},
					format: '{point.percentage:.0f}%'
				},
				color: '#228b22'
			},
			{
				name: 'Accepted %',
				data: closedEpicData,
				dataLabels: {
					enabled: true,
					rotation: -90,
					color: '#FFFFFF',
					align: 'right',
					style: {
						fontSize: '8px',
						fontWeight: 'normal'
					},
					format: '{point.percentage:.0f}%'
				},
				color: '#4765d5'
			}]
		};
		this.setState({ chartData }, this.renderHighChart);
	}

	reSizeChart = () => {
		this.props.reSizeChart
	}

	renderHighChart = () => {
		this.chart = new Highcharts[this.props.type || "Chart"](
			this.chartContainer.current,
			this.state.chartData
		);
		// this.chart.reflow();
	}

	showGraph = () => {
		if (this.state.component && !this.state.componentChartData) {
			this.props.getComponentChartData([this.state.component]);
		}
		const element = React.createElement('div', { ref: this.chartContainer, id: Math.random(), key: this.props.key });
		return (
			<div className="chart-content-container">
				{this.state.componentChartData ? (
					<div>
						<button type="button" className="close close-button" aria-label="Close" onClick={() => this.props.removeChart(this.props.name, this.state.component)}>
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

	onClick = () => {
		this.setState({ showGraph: true });
		const settings = JSON.stringify({
			component: this.state.component,
			numberOfRecords: this.state.numberOfRecords,
			chartName: this.state.chartName
		});
		this.props.postUserDashboard({
			graphId: this.props.name,
			graphSubId: this.state.component,
			settings
		});
		this.props.projectsChanged(this.props.name, this.state.component, settings);
		this.props.removeChart(this.props.name);
		console.log('fv:' + this.state.component + ' rec:' + this.state.numberOfRecords);
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSelect = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	getComponentOptions = () => {
		const options = this.state.componentData.map(value => {
			return (
				<option value={value}>{value}</option>
			)
		});
		return options;
	}

	showForm = () => {
		if (this.state.componentData) {
			return (
				<div className="chart-content-container">
					<button type="button" className="close close-button" aria-label="Close" onClick={() => this.props.removeChart(this.props.name, this.state.component)}>
						<span aria-hidden="true">&times;</span>
					</button>
					<FormGroup>
						<Col componentClass={ControlLabel} sm={5}>
							Components:
						</Col>
						<Col sm={7}>
							<FormControl
								componentClass="select"
								placeholder="select"
								onChange={this.onChange}
								name="component"
								id="component"
							>
								<option value="">Select</option>
								{this.getComponentOptions()}
							</FormControl>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col componentClass={ControlLabel} sm={5}>
							Enter Chart Name:
						</Col>
						<Col sm={7}>
							<FormControl
								type="text"
								name="chartName"
								id="chartName"
								placeholder="Enter the Chart Name"
								onChange={this.onChange}
							/>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col componentClass={ControlLabel} sm={5}>
							Number of Records:
						</Col>
						<Col sm={7}>
							<FormControl
								type="text"
								name="numberOfRecords"
								id="numberOfRecords"
								placeholder="Enter the number of rows"
								onChange={this.onChange}
							/>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col smOffset={3} sm={5}>
							<button className="btn btn-primary" type="button" onClick={this.onClick}>
								Submit
							</button>
						</Col>
					</FormGroup>
				</div>
			);
		} else {
			return <Loader />
		}

	};

	render() {
		return <div>{this.state.showGraph ? this.showGraph() : this.showForm()}</div>;
	}
}

function mapStateToProps(state) {
	return {
		allComponentData: state.allComponentData,
		componentChartData: state.componentChartData
	};
}

const actions = {
	getAllComponents: getAllComponents,
	getComponentChartData: getComponentChartData,
	postUserDashboard: postUserDashboard
};

export default connect(mapStateToProps, actions)(ComponentChart);
