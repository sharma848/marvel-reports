import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import Loader from '../Loader/Loader';
import { getPlanVsActualChartData, postUserDashboard } from '../../Actions/index';

export class PlanVsActualChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chartData: null,
			PlanVsActualChartData: null,
			fixVersionData: null
		};
	}

	componentDidMount() {
		this.props.getPlanVsActualChartData();
		this.props.postUserDashboard({ graphId: this.props.name });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.PlanVsActualChartData && nextProps.PlanVsActualChartData && nextProps.PlanVsActualChartData.data) {
			this.setState({ PlanVsActualChartData: nextProps.PlanVsActualChartData.data.data }, this.setChartData);
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
            labels: labels,
            datasets: [{
                    label: "Planned Story Points",
                    backgroundColor: 'transparent',
					borderColor: '#434348',
					borderWidth: 1,
                    data: commited_story_points,
                },
                {
                    label: "Actual Story Points",
                    backgroundColor: 'transparent',
					borderColor: '#228B22',
					borderWidth: 1,
                    data: actual_story_points,
                }

            ]
        };
		this.setState({ chartData });
	}

	showGraph = () => {
		return (
			<div className="chart-content-container">
				{this.state.PlanVsActualChartData ? (
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
											labelString: 'Story Points'
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
		return <div>{this.showGraph()}</div>;
	}
}

function mapStateToProps(state) {
	return {
		PlanVsActualChartData: state.PlanVsActualChartData
	};
}

const actions = {
	getPlanVsActualChartData: getPlanVsActualChartData,
	postUserDashboard: postUserDashboard
};

export default connect(mapStateToProps, actions)(PlanVsActualChart);
