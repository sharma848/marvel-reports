import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getConfigurations, setConfigurations, generateEpicData, generateVelocityData } from '../../Actions/index';

export class ConfigPage extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);

		this.state = {
			configId: 0,
			hostVelocity: '',
			projectKeyVelocity: '',
			boards: null,
			issuesVelocity: null,
			host: '',
			projectKey: '',
			epics: null,
			issues: null,
			jid: '',
			password: '',
			sprintName: '',
			lastUpdatedOn: '',
			sprintLookBack: null,
			totalStoryPoints: null,
			totalSprintInRelease: null,
			lastConfigurationData: null
		};
		this.dataSavingInprogress = false;
	}

	componentDidMount() {
		this.props.getConfigurations();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.configData.data && nextProps.configData.data) {
			if(nextProps.configData.data.isSuccess) {
				this.setState({
					lastConfigurationData: nextProps.configData.data.data
				});
			}
			if(nextProps.configData.key === 'Received') {
				if(this.dataSavingInprogress) {
					alert("Configuration saved successfully!!!");
					this.dataSavingInprogress = false;
				}
			}
		}
	}

	onChangeConfig = (e) => {
		if (
			e.target.name === 'epics' ||
			e.target.name === 'boards' ||
			e.target.name === 'issuesVelocity' ||
			e.target.name === 'issues'
		) {
			let configArray = e.target.value.split(',');
			this.setState({ [e.target.name]: configArray });
			return;
		}
		this.setState({ [e.target.name]: e.target.value });
	};

	onSubmit = () => {
		const props = this.props.configData && this.props.configData.data ? this.props.configData.data.data : '';
		const params = {
			configId: props.configId ? props.configId : this.state.configId,
			sprint_name: 34,
			last_updated:this.state.lastUpdatedOn,
        	velocityConfiguration: {
				velocity_configuration_id: props ? props.velocityConfiguration.velocity_configuration_id : 0,
				host: this.state.hostVelocity ? this.state.hostVelocity : props.velocityConfiguration.host,
				projectKey: this.state.projectKeyVelocity ? this.state.projectKeyVelocity : props.velocityConfiguration.projectKey,
				boards: this.state.boards ? this.state.boards : props.velocityConfiguration.boards,
				issues: this.state.issuesVelocity ? this.state.issuesVelocity : props.velocityConfiguration.issues				
			},
			epicConfiguration: {
				epics_configuration_id: props ? props.epicConfiguration.epics_configuration_id : 0,
				host: this.state.host ? this.state.host : props.epicConfiguration.host,
				projectKey: this.state.projectKey ? this.state.projectKey : props.epicConfiguration.projectKey,
				epics: this.state.epics ? this.state.epics : props.epicConfiguration.epics,
				issues: this.state.issues ? this.state.issues : props.epicConfiguration.issues

			},
			lookback_sprint_number: this.state.sprintLookBack ? this.state.sprintLookBack : props.lookback_sprint_number,
			total_story_points: this.state.totalStoryPoints ? this.state.totalStoryPoints : props.total_story_points,
			number_of_sprints: this.state.totalSprintInRelease ? this.state.totalSprintInRelease : props.number_of_sprints,
			jid: this.state.jid ? this.state.jid : props.jid,
			password: this.state.password ? this.state.password : props.password,
			secs_hour:"3600",
			hour_day:"8",
			sprint_number: '3'
		}
		this.props.setConfigurations(params);
		this.dataSavingInprogress = true;
	};

	render() {
		return (
			<div className="dashboard-container">
				<div className="form-container">
					<h4>Jira Credentials</h4>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="user_id"
							name="jid"
							placeholder="Enter your JIRA Id"
							defaultValue={this.state.lastConfigurationData ? this.state.lastConfigurationData.jid : ''}
							onChange={this.onChangeConfig}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="password"
							name="password"
							placeholder="Enter your password"
							defaultValue={this.state.lastConfigurationData ? this.state.lastConfigurationData.password : ''}
							onChange={this.onChangeConfig}
						/>
					</div>
				</div>
				<div className="form-control full-height">
					<div className="row">
						<div className="col-lg-6">
							<h4>Epic Configurations</h4>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="host"
									name="host"
									placeholder="Enter host"
									defaultValue={this.state.lastConfigurationData ? this.state.lastConfigurationData.epicConfiguration.host : ''}
									onChange={this.onChangeConfig}
								/>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="projectKey"
									name="projectKey"
									placeholder="Enter project key"
									defaultValue={this.state.lastConfigurationData ? this.state.lastConfigurationData.epicConfiguration.projectKey : ''}									
									onChange={this.onChangeConfig}
								/>
							</div>
							<div className="form-group">
								<textarea
									className="form-control"
									value={this.state.lastConfigurationData ? this.state.lastConfigurationData.epicConfiguration.epics : ''}	
									onChange={this.onChangeConfig}
									rows={3}
								>
								{this.state.lastConfigurationData ? this.state.lastConfigurationData.epicConfiguration.epics : ''}
								</textarea>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="issues"
									name="issues"
									placeholder="Enter comma separated type of issues to report"
									defaultValue={this.state.lastConfigurationData ? this.state.lastConfigurationData.epicConfiguration.issues : ''}																	
									onChange={this.onChangeConfig}
								/>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="totalStoryPoints"
									name="totalStoryPoints"
									placeholder="Enter Major Release total story points for burndown"
									defaultValue={this.state.lastConfigurationData ? this.state.lastConfigurationData.total_story_points : ''}																	
									onChange={this.onChangeConfig}
								/>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="totalSprintInRelease"
									name="totalSprintInRelease"
									placeholder="Enter total number of sprint in release"
									defaultValue={this.state.lastConfigurationData ? this.state.lastConfigurationData.number_of_sprints : ''}																	
									onChange={this.onChangeConfig}
								/>
							</div>
						</div>
						<div className="col-lg-6">
							<h4>Velocity Configurations</h4>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="hostVelocity"
									name="hostVelocity"
									placeholder="Enter host"
									defaultValue={this.state.lastConfigurationData ? this.state.lastConfigurationData.velocityConfiguration.host : ''}																										
									onChange={this.onChangeConfig}
								/>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="projectKeyVelocity"
									name="projectKeyVelocity"
									placeholder="Enter project key"
									defaultValue={this.state.lastConfigurationData ? this.state.lastConfigurationData.velocityConfiguration.projectKey : ''}																																			
									onChange={this.onChangeConfig}
								/>
							</div>
							<div className="form-group">
								<textarea
									className="form-control"
									value={this.state.lastConfigurationData ? this.state.lastConfigurationData.velocityConfiguration.boards : ''}	
									onChange={this.onChangeConfig}
									rows={3}
								>
								{this.state.lastConfigurationData ? this.state.lastConfigurationData.velocityConfiguration.boards : ''}
								</textarea>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="issuesVelocity"
									name="issuesVelocity"
									placeholder="Enter comma separated type of issues to report"
									defaultValue={this.state.lastConfigurationData ? this.state.lastConfigurationData.velocityConfiguration.issues : ''}																		
									onChange={this.onChangeConfig}
								/>
							</div>
							<div className="form-group">
								<input
									type="text"
									className="form-control"
									id="sprintLookBack"
									name="sprintLookBack"
									placeholder="Enter the number of sprint velocity to be extracted"
									defaultValue={this.state.lastConfigurationData ? this.state.lastConfigurationData.lookback_sprint_number : ''}																		
									onChange={this.onChangeConfig}
								/>
							</div>
						</div>
					</div>
					<button type="button" onClick={this.onSubmit.bind(this)} class="btn btn-primary">
						Submit
					</button>
					<button type="button" onClick={() => this.props.generateEpicData()} class="btn btn-danger left-margin-10">
						Generate Epic Data
					</button>
					<button type="button" onClick={() => this.props.generateVelocityData()} class="btn btn-danger left-margin-10">
						Generate Velocity Data
					</button>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		configData: state.configData,
		GenerateEpicData: state.GenerateEpicData,
		GenerateVelocityData: state.GenerateVelocityData
	};
}

const actions = {
	setConfigurations: setConfigurations,
	getConfigurations: getConfigurations,
	generateEpicData: generateEpicData,
	generateVelocityData: generateVelocityData
}

export default connect(mapStateToProps, actions)(ConfigPage);
