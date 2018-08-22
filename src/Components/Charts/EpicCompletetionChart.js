import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import Loader from '../Loader/Loader';
import { getEpicSumByTeamEpic } from '../../Actions/index';
import FormControl from 'react-bootstrap/lib/FormControl';
import { FormGroup, Col, ControlLabel } from 'react-bootstrap';

export class FIxVersionChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: null,
			showGraph: false,
			chartName: this.props.name,
			EpicPercentageCompletetionData: null,
			level: ''
		};
	}

	componentWillReceiveProps(nextProps) {
        const level = this.state.level;
		if (nextProps.EpicPercentageCompletetionData[level] && nextProps.EpicPercentageCompletetionData[level].data) {
			this.setState({ EpicPercentageCompletetionData: nextProps.EpicPercentageCompletetionData[level].data.epics }, this.setChartData);
		}
	}

	setChartData() {
		var completedEpicData = [];
		var remainingEpicData = [];
		var closedEpicData = [];
		var labels = [];
		var bgColor = []; // green: #228b22 blue: #4765d5 yellow: #ffbf00
		var data = this.state.EpicPercentageCompletetionData ? this.state.EpicPercentageCompletetionData.map((value) => {
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
				  data: remainingEpicData,
				  backgroundColor: '#ffbf00'
				},
				{
				  label: 'Completed %',
				  data: completedEpicData,
				  backgroundColor: bgColor
				}
			]
		};
		this.setState({ chartData });
	}

	showGraph = () => {
		return (
			<div className="chart-content-container">
				{this.state.EpicPercentageCompletetionData ? (
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
										stacked: true,
										scaleLabel: {
											display: true,
											labelString: 'percentage'
										}
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

	onClick = () => {
		this.setState({ showGraph: true });
		console.log('level:' + this.state.level + ' rec:' + this.state.numberOfRecords);
		this.props.getEpicSumByTeamEpic({type: this.state.level});
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSelect = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	showForm = () => {
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
                            name="level"
                            id="level"
                        >
                            <option value="">Select</option>
                            <option value='Team Epic'>Team Epics</option>
                            <option value='Feature Epic'>Feature Epics</option>
                            <option value='All Epic'>All Epics</option>
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
		
	};

	render() {
		return <div>{this.state.showGraph && this.state.level ? this.showGraph() : this.showForm()}</div>;
	}
}

function mapStateToProps(state) {
	return {
		EpicPercentageCompletetionData: state.EpicPercentageCompletetionData
	};
}

const actions = {
	getEpicSumByTeamEpic: getEpicSumByTeamEpic
};

export default connect(mapStateToProps, actions)(FIxVersionChart);
