import React, { Component } from 'react';

export class ConfigPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			configData: {
				configId: '',
				velocityConfiguration: {
					hostVelocity: '',
					projectKeyVelocity: '',
					boards: [],
					issuesVelocityes: []
				},
				epicConfiguration: {
					host: '',
					projectKey: '',
					epics: [],
					issues: []
				},
				jiraCredentials: {
					email: '',
					password: ''
				},
				sprintConfiguration: {
					sprintName: '',
					lastUpdatedOn: ''
				}
			}
		};
	}

	onChangeVelocity = (e) => {
		this.setState({ configData: {
            velocityConfiguration: {
                [e.target.name]: e.target.value 
            }
        }
        });
	};

	onChangeEpic = (e) => {
		this.setState({ configData: {
            epicConfiguration: {
                [e.target.name]: e.target.value 
            }
        }
        });
	};

	onChangeJira = (e) => {
		this.setState({ configData: {
            jiraCredentials: {
                [e.target.name]: e.target.value 
            }
        }
        });
	};

	onChangeSprint = (e) => {
		this.setState({ configData: {
            sprintConfiguration: {
                [e.target.name]: e.target.value 
            }
        }
        });
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.userAccessData && nextProps.userAccessData.data) {
			alert('request approved');
			this.props.getUserDetails();
		}
	}

	render() {
		return (
			<div>
				<div className="form-container">
					<h4>Jira Credentials</h4>
					<div className="form-group">
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							placeholder="Enter your Email Id"
							onChange={this.onChangeJira}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							placeholder="Enter your password"
							onChange={this.onChangeJira}
						/>
					</div>
				</div>
				<div className="form-control">
					<div className="row">
						<div className="col-lg-6">
							<h4>Epic Configurations</h4>
							<div>
								<input
									type="email"
									className="form-control"
									id="host"
									name="host"
									placeholder="Enter host"
									onChange={this.onChangeEpic}
								/>
							</div>
							<div>
								<input
									type="text"
									className="form-control"
									id="projectKey"
									name="projectKey"
									placeholder="Enter project key"
									onChange={this.onChangeEpic}
								/>
							</div>
							<div>
								<input
									type="text"
									className="form-control"
									id="epics"
									name="epics"
									placeholder="Enter comma separated epic Ids"
									onChange={this.onChangeEpic}
								/>
							</div>
							<div>
								<input
									type="text"
									className="form-control"
									id="issues"
									name="issues"
									placeholder="Enter comma separated type of issues to report"
									onChange={this.onChangeEpic}
								/>
							</div>
						</div>
						<div className="col-lg-6">
							<h4>Velocity Configurations</h4>
							<div>
								<input
									type="email"
									className="form-control"
									id="hostVelocity"
									name="hostVelocity"
									placeholder="Enter host"
									onChange={this.onChangeVelocity}
								/>
							</div>
							<div>
								<input
									type="text"
									className="form-control"
									id="projectKeyVelocity"
									name="projectKeyVelocity"
									placeholder="Enter project key"
									onChange={this.onChangeVelocity}
								/>
							</div>
							<div>
								<input
									type="text"
									className="form-control"
									id="boards"
									name="boards"
									placeholder="Enter comma separated board Ids"
									onChange={this.onChangeVelocity}
								/>
							</div>
							<div>
								<input
									type="text"
									className="form-control"
									id="issuesVelocity"
									name="issuesVelocity"
									placeholder="Enter comma separated type of issues to report"
									onChange={this.onChangeVelocity}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="form-control">
					<div className="row">
						<div className="col-lg-6">
							<h4>Sprint Configurations</h4>
							<div>
								<input
									type="text"
									className="form-control"
									id="sprintName"
									name="sprintName"
									placeholder="Enter current sprint name"
									onChange={this.onChangeSprint}
								/>
							</div>
							<div>
								<input
									type="text"
									className="form-control"
									id="lastUpdatedOn"
									name="lastUpdatedOn"
									placeholder="Last Updated On(IST)"
									onChange={this.onChangeSprint}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ConfigPage;
