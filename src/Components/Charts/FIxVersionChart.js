import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import Highcharts from 'highcharts';
import Loader from '../Loader/Loader';
import { getAllFixVersions, getFixVersioChartData } from '../../Actions/index';
import FormControl from 'react-bootstrap/lib/FormControl';
import { FormGroup, Col, ControlLabel } from 'react-bootstrap';

export class FIxVersionChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: null,
			showGraph: false,
			chartName: this.props.name,
			fixVersionChartData: null,
			fixVersionData: null,
			fixVersions: ''
		};
		this.chartContainer = React.createRef();
		}

	componentDidMount() {
		this.props.getAllFixVersions();
	}

	componentWillReceiveProps(nextProps) {
		const fixversion = this.state.fixVersions;
		if (nextProps.allFIxVersionData && nextProps.allFIxVersionData.data) {
			this.setState({ fixVersionData: nextProps.allFIxVersionData.data.fixversions });
		}
		if (nextProps.fixVersionChartData && nextProps.fixVersionChartData[fixversion] && nextProps.fixVersionChartData[fixversion].data) {
			this.setState({ fixVersionChartData: nextProps.fixVersionChartData[fixversion].data.epics }, this.setChartData);
		}
	}

	setChartData() {
		var completedEpicData = [];
		var remainingEpicData = [];
		var closedEpicData = [];
		var labels = [];
		var bgColorClosed = '#994499';
		var data = this.state.fixVersionChartData ? this.state.fixVersionChartData.map((value) => {
			const completedPercentage = (value.closedSP / value.totalSP) * 100;
			const remainingPercentage = (value.remainingSP / value.totalSP) * 100;
			if(value.remainingSP == 0 && value.status === 'Accepted') {
				bgColorClosed = 'blue';
				closedEpicData.push(100);
			} else {
				closedEpicData.push(0);				
			}
			completedEpicData.push(completedPercentage);
			remainingEpicData.push(remainingPercentage);
			labels.push(value.id);

		}) : '';

		const chartData = {
			labels: labels,
			datasets: [
				{
				  label: 'Remaining %',
				  data: remainingEpicData,
				  backgroundColor: '#D6E9C6'// green
				},
				{
				  label: 'Completed %',
				  data: completedEpicData,
				  backgroundColor: '#FAEBCC'// yellow
				}
			  ]
		};
		this.setState({ chartData });
	}

	showGraph = () => {
		return (
			<div className="chart-content-container">
				{this.state.fixVersionChartData ? (
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
											autoSkip: false
										}
									}],
									yAxes: [{
										stacked: true
									}]
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

	onClick = () => {
		this.setState({ showGraph: true });
		console.log('fv:' + this.state.fixVersions + ' rec:' + this.state.numberOfRecords);
		this.props.getFixVersioChartData([this.state.fixVersions]);
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSelect = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	getFixVersionOptions = () => {
		const options = this.state.fixVersionData.map(value => {
			return (
				<option value={value}>{value}</option>
			)
		});
		return options;
	}

	showForm = () => {
		if(this.state.fixVersionData) {
			return (
				<div className="chart-content-container">
					<button type="button" className="close close-button" aria-label="Close" onClick={() => this.props.removeChart(this.props.name)}>
						<span aria-hidden="true">&times;</span>
					</button>
					<FormGroup>
						<Col componentClass={ControlLabel} sm={3}>
							Fix Versions:
						</Col>
						<Col sm={7}>
							<FormControl
								componentClass="select"
								placeholder="select"
								onChange={this.onChange}
								name="fixVersions"
								id="fixVersions"
							>
								<option value="">Select</option>
								{this.getFixVersionOptions()}
							</FormControl>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col componentClass={ControlLabel} sm={3}>
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
						<Col componentClass={ControlLabel} sm={3}>
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
		return <div>{this.state.showGraph && this.state.fixVersionData ? this.showGraph() : this.showForm()}</div>;
	}
}

function mapStateToProps(state) {
	return {
		allFIxVersionData: state.allFIxVersionData,
		fixVersionChartData: state.fixVersionChartData
	};
}

const actions = {
	getAllFixVersions: getAllFixVersions,
	getFixVersioChartData: getFixVersioChartData
};

export default connect(mapStateToProps, actions)(FIxVersionChart);
