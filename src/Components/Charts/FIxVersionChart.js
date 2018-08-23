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
		var data = this.state.fixVersionChartData ? this.state.fixVersionChartData.map((value) => {
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
					}
				},
				color: '#ffbf00'
			}, {
				name: 'Completed %',
				data: completedEpicData,
				dataLabels: {
					enabled: true,
					rotation: -90,
					style: {
					   fontSize: '8px',
					   fontWeight: 'normal'
					}
				},
				color: '#228b22'
			},
			{
				name: 'Accepted',
				data: closedEpicData,
				dataLabels: {
					enabled: true,
					rotation: -90,					
					style: {
					   fontSize: '8px',
					   fontWeight: 'normal'
					}
				},
				color: '#4765d5'
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
				{this.state.fixVersionChartData ? (
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
						<Col componentClass={ControlLabel} sm={5}>
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
