import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import FormControl from 'react-bootstrap/lib/FormControl';
import { FormGroup, Col, ControlLabel } from 'react-bootstrap';

export default class BarChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: {
				labels: [
					'Delhi',
					'Mumbai',
					'Banglore',
					'Chennai',
					'Nagpur',
					'Gurgoan',
					'Gurgoan',
					'Gurgoan',
					'Gurgoan',
					'Gurgoan',
					'Gurgoan',
					'Gurgoan',
					'Gurgoan'
				],
				datasets: [
					{
						label: 'Population',
						data: [
							323455,
							455676,
							838374,
							595959,
							404040,
							474747,
							474747,
							474747,
							474747,
							474747,
							474747,
							474747,
							474747,
							474747,
							474747,
							474747
						],
						backgroundColor: [
							'#76A7FA',
							'rgba(54,162, 235, 0.6)',
							'rgba(75, 206, 86, 0.6)',
							'rgba(153, 102, 255, 0.6)',
							'rgba(255, 159, 164, 0.6)',
							'rgba(255, 159, 164, 0.6)',
							'rgba(255, 159, 164, 0.6)',
							'rgba(255, 159, 164, 0.6)',
							'rgba(255, 159, 164, 0.6)',
							'rgba(255, 159, 164, 0.6)',
							'rgba(255, 159, 164, 0.6)',
							'rgba(255, 99, 132, 0.6)'
						]
					}
				]
			},
			showGraph: false,
			fixVersions: '',
			numberOfRecords: 0
		};
	}

	onClick = () => {
		this.setState({ showGraph: true });
		console.log('fv:' + this.state.fixVersions + ' rec:' + this.state.numberOfRecords);
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSelect = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	showGraph = () => {
		return (
			<Bar
				width={400}
				height={455}
				data={this.state.chartData}
				options={{
					title: {
						display: true,
						text: this.props.name,
						fontSize: 25
					},
					legend: {
						display: true,
						position: 'right'
					},
					maintainAspectRatio: false,
					responsive: true
				}}
			/>
		);
	};

	showForm = () => {
		return (
			<div>
				<FormGroup>
					<Col componentClass={ControlLabel} sm={3}>
						Fix Versions:
					</Col>
					<Col sm={7}>
						<FormControl componentClass="select" placeholder="select" onChange={this.onChange} name="fixVersions" id="fixVersions">
							<option value="">Select</option>
							<option value="Fix Version 1">Fix Version 1</option>
							<option value="Fix Version 2">Fix Version 2</option>
							<option value="Fix Version 3">Fix Version 3</option>
						</FormControl>
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
	};

	render() {
		return <div className="chart">{this.state.showGraph ? this.showGraph() : this.showForm()}</div>;
	}
}
