import React, { Component } from 'react';
import { connect } from 'react-redux';
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
			showGraph: false
		};
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
            labels: labels,
            datasets: [{
                    label: "Remaining Story Points",
                    backgroundColor: 'transparent',
                    borderColor: '#d95700',
					borderDash: [5,3],
					borderWidth: 1,
                    data: burndownStoryPoint
				},
                {
                    label: "Ideal BurnDown",
                    backgroundColor: 'transparent',
					borderColor: '#434348',	
					borderWidth: 1,				
                    data: ideal_story_point_burned_data
                }
            ]
        };
		this.setState({
			chartData,
			showGraph: true
		});
	}

	showGraph = () => {
		const total_story_point = this.state.ReleaseBurndownChartData.total_story_point;
		return (
			<div className="chart-content-container">
				{this.state.ReleaseBurndownChartData ? (
					<div>
						<button type="button" className="close close-button" aria-label="Close" onClick={() => this.props.removeChart(this.props.name)}>
							<span aria-hidden="true">&times;</span>
						</button>
                        <Line
                            data={this.state.chartData}
                            options={{
								title: {
									display: true,
									text: this.props.name,
									fontSize: 25
								},
								legend: {
									display: true,
									position: 'bottom'
								},
                                scales: {
                                    yAxes: [{
										stacked: false,
										scaleLabel: {
											display: true,
											labelString: 'Remaining Story Points'
										}
                                    }]
                                }
                            }}
                            height={500}
                            width={700}
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
		ReleaseBurndownChartData: state.ReleaseBurndownChartData
	};
}

const actions = {
	getReleaseBurndownChartData: getReleaseBurndownChartData
};

export default connect(mapStateToProps, actions)(ReleaseBurndownChart);
