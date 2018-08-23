import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import Loader from '../Loader/Loader';
import { getAllComponents, getComponentChartData } from '../../Actions/index';
import FormControl from 'react-bootstrap/lib/FormControl';
import { FormGroup, Col, ControlLabel } from 'react-bootstrap';

export class FIxVersionChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: null,
			showGraph: false,
			chartName: '',
			componentChartData: null,
			componentData: null,
			component: ''
		};
	}

	componentDidMount() {
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
	}

	setChartData() {
		var completedEpicData = [];
		var remainingEpicData = [];
		var closedEpicData = [];
		var labels = [];
		var data = this.state.componentChartData ? this.state.componentChartData.map((value) => {
			const completedPercentage = Math.round((value.closedSP / value.totalSP) * 100);
			const remainingPercentage = Math.round((value.remainingSP / value.totalSP) * 100);
			if(value.remainingSP == 0 && value.status === 'Accepted') {
				closedEpicData.push(100);
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
					data: remainingEpicData,
					backgroundColor: '#ffbf00'
				  },
				  {
					label: 'Completed %',
					data: completedEpicData,
					backgroundColor: '#228b22'
				  },
				  {
					label: 'Accepted',
					data: closedEpicData,
					backgroundColor: '#4765d5'
				  }
			  ]
		};
		this.setState({ chartData });
	}

	showGraph = () => {
		return (
			<div className="chart-content-container">
				{this.state.componentChartData ? (
					<div>
						<button type="button" className="close close-button" aria-label="Close" onClick={() => this.props.removeChart(this.props.name)}>
							<span aria-hidden="true">&times;</span>
						</button>
						<Bar
							width={700}
							height={500}
							data={this.state.chartData}
							options={{
								title: {
									display: true,
									text: this.state.chartName || this.props.name + ' - ' + this.state.component,
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
								}
							}}
							plugins= {{
								afterDatasetsDraw: function(data) {
									// To only draw at the end of animation, check for easing === 1
									var ctx = data.ctx;
									var Chart = data.chart;
									Chart.data.datasets.forEach(function (dataset, i) {
										var meta = data.controller.getDatasetMeta(i);
										if (!meta.hidden) {
											meta.data.forEach(function(element, index) {
												// Draw the text in black, with the specified font
												ctx.fillStyle = 'rgb(0, 0, 0)';
												var fontSize = 10;
												var fontStyle = 'normal';
												var fontFamily = 'Helvetica Neue';
												// Just naively convert to string for now
												var dataString = dataset.data[index].toString();
												// Make sure alignment settings are correct
												ctx.textAlign = 'center';
												ctx.textBaseline = 'middle';
												var padding = 5;
												var position = element.tooltipPosition();
												ctx.fillText(dataString, position.x, position.y - (fontSize / 2) + (padding * 4));
											});
										}
									});
								}}
							}
						/>
					</div>
				) : (
					<Loader />
				)}
			</div>
		);
	};

	onClick = () => {
		this.setState({ showGraph: true });
		console.log('fv:' + this.state.component + ' rec:' + this.state.numberOfRecords);
		this.props.getComponentChartData([this.state.component]);
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
		if(this.state.componentData) {
			return (
				<div className="chart-content-container">
					<button type="button" className="close close-button" aria-label="Close" onClick={() => this.props.removeChart(this.props.name)}>
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
	getComponentChartData: getComponentChartData
};

export default connect(mapStateToProps, actions)(FIxVersionChart);
