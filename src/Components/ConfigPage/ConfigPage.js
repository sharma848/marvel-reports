import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateConfigurations } from '../../Actions/index';

export class ConfigPage extends Component {
	constructor(props) {
		super(props);
		// this.props.updateConfigurations = this.props.updateConfigurations().bind(this);

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
			email: '',
			password: '',
			sprintName: '',
			lastUpdatedOn: ''
		};
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
		console.log(this.state);
		this.props.updateConfigurations();
	};

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
							onChange={this.onChangeConfig}
						/>
						<input type="hidden" name="email" />
					</div>
					<div className="form-group">
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							placeholder="Enter your password"
							onChange={this.onChangeConfig}
						/>
						<input type="hidden" name="password" />
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
									onChange={this.onChangeConfig}
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
									onChange={this.onChangeConfig}
								/>
							</div>
						</div>
					</div>
					<button type="submit" onClick={this.onSubmit}>
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

export default connect(mapStateToProps, { updateConfigurations: updateConfigurations })(ConfigPage);
