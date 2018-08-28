import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import Select from 'react-select';
import { getAllComponents, getModuleSubModuleChartData, postUserDashboard } from '../../Actions/index';
import FormControl from 'react-bootstrap/lib/FormControl';
import { FormGroup, Col, ControlLabel, Table } from 'react-bootstrap';

export class moduleSubModuleChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showGraph: false,
			chartName: (props.settings && props.settings.chartName) || this.props.name,
			moduleSubModuleData: null,
			componentData: null,
			componentsSelected:  props.settings && JSON.parse(props.settings.componentsSelected)
		};
	}

	componentDidMount() {
		if (this.state.componentsSelected && !this.state.moduleSubModuleData) {
			this.setState({ showGraph: true });
		}
		this.props.getAllComponents();
	}

	componentWillReceiveProps(nextProps) {
		const component = this.state.componentsSelected ? this.state.componentsSelected[0].value : '';
		if (nextProps.allComponentData && nextProps.allComponentData.data) {
			this.setState({ componentData: nextProps.allComponentData.data.components });
		}
		if (nextProps.moduleSubModuleData && nextProps.moduleSubModuleData[component] && nextProps.moduleSubModuleData[component].data) {
			this.setState({ moduleSubModuleData: nextProps.moduleSubModuleData[component].data.epics });
		}
	}



	showGraph = () => {
		if (this.state.componentsSelected && !this.state.moduleSubModuleData) {
			const params = this.state.componentsSelected.map(data => data.value);
			this.props.getModuleSubModuleChartData(params);
		}
		return (
			<div className="chart-content-container">
				{this.state.moduleSubModuleData ? (
					<div>
						<button type="button" className="close close-button" aria-label="Close" onClick={() => this.props.removeChart(this.props.name, this.state.component)}>
							<span aria-hidden="true">&times;</span>
						</button>
						<Table id="module_sub_module_table" responsive striped bordered condensed hover>
                            <thead>
								<tr>
									<td><b>ID</b></td>
									<td><b>Name</b></td>
									<td><b>Type</b></td>
									<td><b>Remaining Story Point</b></td>
									<td><b>Total Story Point</b></td>
									<td><b>Status</b></td>
								</tr>
                            </thead>
                            <tbody>
                                {this.renderTableBody()}
                            </tbody>
                        </Table>
					</div>
				) : (
						<Loader />
					)}
			</div>
		);
	};

	renderTableBody() {
        const tableBody = this.state.moduleSubModuleData.map(data => {
        	return (
				<tr>
					<td>{data.id}</td>
					<td>{data.name}</td>
					<td>{data.type}</td>
					<td>{data.remainingSP}</td>
					<td>{data.totalSP}</td>
					<td>{data.status}</td>
				</tr>
			);
        });

        return tableBody;
    }

	onClick = () => {
		this.setState({ showGraph: true });
		const settings = JSON.stringify({
			componentsSelected: JSON.stringify(this.state.componentsSelected),
			numberOfRecords: this.state.numberOfRecords,
			chartName: this.state.chartName
		});
		this.props.postUserDashboard({
			graphId: this.props.name,
			graphSubId: JSON.stringify(this.state.componentsSelected),
			settings
		});
		this.props.projectsChanged(this.props.name,  JSON.stringify(this.state.componentsSelected), settings);
		this.props.removeChart(this.props.name);
	};

	onChange = (e) => {
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

	getAllComponentsDropdown() {
        const options = this.state.componentData.map(obj => {
			var obj2 = {};
            obj2.label = obj;
            obj2.value = obj;
            return obj2;
        });
        return options;
	}
	
	onProjectChange = (e, action) => {
        switch(action.action){
            case "select-option": 
            this.setState({ componentsSelected: e }, () => console.log(this.state.componentsSelected));
            break;
            case "remove-value": 
            this.setState({ componentsSelected: this.state.componentsSelected.filter(obj => obj.name != action.removedValue.name) });
            break;
            case "clear": 
            this.setState({ componentsSelected: [] });
            break;
        }
        
    };

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
							<Select
								placeholder="select"
								isMulti
								name="projectSelected"
								options={this.getAllComponentsDropdown()}
								className="basic-multi-select"
								classNamePrefix="select"
								onChange={this.onProjectChange}
							/>
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
					{/* <FormGroup>
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
					</FormGroup> */}
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
		moduleSubModuleData: state.moduleSubModuleData
	};
}

const actions = {
	getAllComponents: getAllComponents,
	getModuleSubModuleChartData: getModuleSubModuleChartData,
	postUserDashboard: postUserDashboard
};

export default connect(mapStateToProps, actions)(moduleSubModuleChart);
