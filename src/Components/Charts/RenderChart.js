import React, { Component } from 'react';
import Loader from '../Loader/Loader';
import FixVersionChart from './FIxVersionChart';
import ComponentChart from './ComponentChart';
import ReleaseBurndownChart from './ReleaseBurndownChart';
import PlanVsActualChart from './PlanVsActualChart';
import TeamVelocityChart from './TeamVelocityChart';
import EpicCompletetionChart from './EpicCompletetionChart';
import CurrentSprintReportChart from './CurrentSprintReportChart';

export default class RenderChart extends Component {

	constructor(props) {
		super(props);
		
	}

	underConstruction = () => {
		return (<div>Component Under Construction!!!</div>);
	}

	renderChart = () => {
		switch(this.props.name) {
			case 'Team Velocity Chart':
				return <TeamVelocityChart name={this.props.name} removeChart={this.props.removeChart} viewToggled={this.props.viewToggled} />;
				break;
			case 'Fix Version Chart':
				return <FixVersionChart name={this.props.name} removeChart={this.props.removeChart} viewToggled={this.props.viewToggled} />;	
				break;
			case 'Component Chart':
				return <ComponentChart name={this.props.name} removeChart={this.props.removeChart} viewToggled={this.props.viewToggled} />;
				break;
			case 'Release Burndown Chart':
				return <ReleaseBurndownChart name={this.props.name} removeChart={this.props.removeChart} viewToggled={this.props.viewToggled} />;
				break;
			case 'Plan Vs Actual Chart':
				return <PlanVsActualChart name={this.props.name} removeChart={this.props.removeChart} viewToggled={this.props.viewToggled} />;
				break;
			case 'Epic Completetion Chart':
				return <EpicCompletetionChart name={this.props.name} removeChart={this.props.removeChart} viewToggled={this.props.viewToggled} />;
				break;
			case 'Current Sprint Report':
				return <CurrentSprintReportChart name={this.props.name} removeChart={this.props.removeChart} viewToggled={this.props.viewToggled} />;
				break;
			default: 
				return this.underConstruction();
		}
	}

	render() {
		return (
			<div className={this.props.collapseView ? "chart distributed-view" : "chart"}>
				{this.renderChart()}
			</div>
		);
	}
}
