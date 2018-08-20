import React, { Component } from 'react';
import Loader from '../Loader/Loader';
import FixVersionChart from './FIxVersionChart';
import ComponentChart from './ComponentChart';

export default class RenderChart extends Component {

	constructor(props) {
		super(props);
		
	}

	underConstruction = () => {
		return (<div>Component Under Construction!!!</div>);
	}

	renderChart = () => {
		switch(this.props.name) {
			case 'Release Burndown Chart':
			case 'Team Velocity Chart':
			case 'Plan Vs Actual Chart':
			case 'PI Burndown Chart':
				return this.underConstruction();
				break;
			case 'Fix Version Chart':
				return <FixVersionChart name={this.props.name} removeChart={this.props.removeChart} />		
				break;
			case 'Component Chart':
				return <ComponentChart name={this.props.name} removeChart={this.props.removeChart} />
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
