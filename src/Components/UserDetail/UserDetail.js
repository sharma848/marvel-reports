import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import Select from 'react-select';
import SweetAlert from 'react-bootstrap-sweetalert';
import { withRouter } from 'react-router';

import { getUserDetails, updateUserStatus, emptyuserAccessData } from '../../Actions/index';

export class UserDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			actionStatus: null,
			roleSelected: '',
			projectSelected: [],
			alert: false
		};
	}

	onClick = (status) => {
		const params = {
			projects: this.state.projectSelected,
			email: this.props.userData.email,
			role: this.state.roleSelected
		};

		this.setState({ alert: true, status: status });

		this.props.updateUserStatus(status, params);
	};

	getAlert = (status) => (
		<SweetAlert success title="Done" onConfirm={() => this.hideAlert()}>
			Request {status}
		</SweetAlert>
	);

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onProjectChange = (e, action) => {
        switch(action.action){
            case "select-option": 
            this.setState({ projectSelected: e }, () => console.log(this.state.projectSelected));
            break;
            case "remove-value": 
            this.setState({ projectSelected: this.state.projectSelected.filter(obj => obj.name != action.removedValue.name) });
            break;
            case "clear": 
            this.setState({ projectSelected: [] });
            break;
        }
        
    };

	componentWillReceiveProps(nextProps) {
		if (nextProps.userAccessData && nextProps.userAccessData.data) {
			this.props.getUserDetails();
			this.props.emptyuserAccessData();
		}
	}

	hideAlert() {
		console.log('Hiding alert...');
		this.setState({
			alert: false
		});
	}

	getAllProjectsDropdown() {
        const options = this.props.allProjects.map(obj => {
            obj.label = obj.name;
            obj.value = obj.name;
            return obj;
        });
        return options;
    }

	render() {
        const status = this.props.userData.status;
		return (
			<React.Fragment>
				<tr>
					<td>{this.props.userData.name}</td>
					<td>{this.props.userData.email}</td>
					<td>
						<FormControl
							componentClass="select"
							placeholder="select"
							onChange={this.onChange}
							name="roleSelected"
							id="roleSelected"
						>
							<option value="">Select</option>
							<option value="view">View</option>
							<option value="manager">Manager</option>
							<option value="super_admin">Super Admin</option>
						</FormControl>
					</td>
					<td>
						<Select
                            placeholder="select"
                            isMulti
                            name="projectSelected"
                            options={this.getAllProjectsDropdown()}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={this.onProjectChange}
                        />
					</td>
					{status === 'pending' || status === 'rejected' ? (
						<td>
							<Button className="btn btn-success" onClick={() => this.onClick('approved')}>
								Approve
							</Button>
						</td>
					) :
					(
						<td>
							<Button className="btn btn-danger" onClick={() => this.onClick('declined')}>
								Revoke
							</Button>
						</td>
					) }
				</tr>
				{this.state.alert ? this.getAlert(this.state.status) : ''}
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		userAccessData: state.userAccessData
	};
}

const actions = {
	getUserDetails: getUserDetails,
	updateUserStatus: updateUserStatus,
	emptyuserAccessData: emptyuserAccessData
};

export default withRouter(connect(mapStateToProps, actions)(UserDetail));
