import React, { Component } from 'react';

export class ConfigPage extends Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.userAccessData && nextProps.userAccessData.data) {
			alert('request approved');
			this.props.getUserDetails();
		}
	}

	render() {
		return (
			<React.Fragment>
				<div className="form-container">
					<h4>Jira Credentials</h4>
					<div className="form-group">
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							placeholder="Enter your Email Id"
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							placeholder="Enter your password"
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
								/>
							</div>
							<div>
								<input
									type="text"
									className="form-control"
									id="projectKey"
									name="projectKey"
									placeholder="Enter project key"
								/>
							</div>
                            <div>
								<input
									type="text"
									className="form-control"
									id="epics"
									name="epics"
									placeholder="Enter comma separated epic Ids"
								/>
							</div>
                            <div>
								<input
									type="text"
									className="form-control"
									id="issues"
									name="issues"
									placeholder="Enter comma separated type of issues to report"
								/>
							</div>
						</div>
                        <div className="col-lg-6">
							<h4>Epic Configurations</h4>
							<div>
								<input
									type="email"
									className="form-control"
									id="hostVelocity"
									name="hostVelocity"
									placeholder="Enter host"
								/>
							</div>
							<div>
								<input
									type="text"
									className="form-control"
									id="projectKeyVelocity"
									name="projectKeyVelocity"
									placeholder="Enter project key"
								/>
							</div>
                            <div>
								<input
									type="text"
									className="form-control"
									id="boards"
									name="boards"
									placeholder="Enter comma separated board Ids"
								/>
							</div>
                            <div>
								<input
									type="text"
									className="form-control"
									id="issuesVelocity"
									name="issuesVelocity"
									placeholder="Enter comma separated type of issues to report"
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
								/>
							</div>
                            <div>
								<input
									type="text"
									className="form-control"
									id="lastUpdatedOn"
									name="lastUpdatedOn"
									placeholder="Last Updated On(IST)"
								/>
							</div>
						</div>
                        <div className="col-lg-6">
							<h4>Time Configurations</h4>
							<div>
								<input
									type="text"
									className="form-control"
									id="sec_hours"
									name="sec_hours"
									placeholder="Enter Seconds per Hour"
								/>
							</div>
                            <div>
								<input
									type="text"
									className="form-control"
									id="hour_days"
									name="hour_days"
									placeholder="Enter hours per day"
								/>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default ConfigPage;
