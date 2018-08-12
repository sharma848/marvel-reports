import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getConfigurations, setConfigurations } from '../../Actions/index';

export class ConfigPage extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);

		this.state = {
			configId: 0,
			hostVelocity: '',
			projectKeyVelocity: '',
			boards: [],
			issuesVelocity: [],
			host: '',
			projectKey: '',
			epics: [],
			issues: [],
			jid: '',
			password: '',
			sprintName: '',
			lastUpdatedOn: '',
			lastConfigurationData: null
		};
	}

	componentDidMount() {
		this.props.getConfigurations();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.configData.data && nextProps.configData.data) {
			if(nextProps.configData.data.isSuccess) {
				this.setState({
					lastConfigurationData: nextProps.configData.data.data
				})
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
		const params = {
			configId: this.state.configId,
			sprint_name: 34,
			last_updated:this.state.lastUpdatedOn,
        	velocityConfiguration: {
				velocity_configuration_id: 0,
				host: this.state.hostVelocity,
				projectKey: this.state.projectKeyVelocity,
				boards: this.state.boards,
				issues: this.state.issuesVelocity
			},
			epicConfiguration: {
				epics_configuration_id: 0,
				host: this.state.host,
				projectKey:this.state.projectKey,
				epics: this.state.epics,
				issues: this.state.issues
			},
			jid: this.state.jid,
			password: this.state.password,
			secs_hour:"3600",
			hour_day:"8"
		}
		this.props.setConfigurations(params);
	};

	render() {
		return (
			<div>
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
							<div>
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
							<div>
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
							<div>
								<input
									type="text"
									className="form-control"
									id="epics"
									name="epics"
									placeholder="Enter comma separated epic Ids"
									defaultValue={this.state.lastConfigurationData ? this.state.lastConfigurationData.epicConfiguration.epics : ''}																	
									onChange={this.onChangeConfig}
								/>
							</div>
							<div>
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
						</div>
						<div className="col-lg-6">
							<h4>Velocity Configurations</h4>
							<div>
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
							<div>
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
							<div>
								<input
									type="text"
									className="form-control"
									id="boards"
									name="boards"
									placeholder="Enter comma separated board Ids"
									defaultValue={this.state.lastConfigurationData ? this.state.lastConfigurationData.velocityConfiguration.boards : ''}									
									onChange={this.onChangeConfig}
								/>
							</div>
							<div>
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
						</div>
					</div>
					<button type="button" onClick={this.onSubmit.bind(this)} class="btn btn-primary">
						Submit
					</button>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		configData: state.configData
	};
}

const actions = {
	setConfigurations: setConfigurations,
	getConfigurations: getConfigurations
}

export default connect(mapStateToProps, actions)(ConfigPage);
