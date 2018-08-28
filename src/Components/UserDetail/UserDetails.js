import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import { getUserDetails, getAllProjectData } from '../../Actions/index';
import UserDetail from '../UserDetail/UserDetail';
import Loader from '../Loader/Loader';

export class UserDetails extends Component {

    constructor(props) {
		super(props);
		this.state = {
			allUsers: null,
			allProjectData: null
		};
		this.getDetails = this.getDetails.bind(this);
	}

	componentDidMount() {
		if (sessionStorage.getItem('SessionToken') == null) {
			this.setState({ redirect: true });
		}
		this.props.getUserDetails();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.usersData && nextProps.usersData.data) {
			const data = nextProps.usersData.data.data;
			this.setState({ allUsers: data });
		}
		if(nextProps.allProjectData && nextProps.allProjectData.data && nextProps.allProjectData.data.projects) {
			this.setState({ allProjectData: nextProps.allProjectData.data.projects });
		}
	}

	getDetails() {
		const displayData = this.state.allUsers.map((user, index) => {
			return <UserDetail userData={user} allProjects={this.state.allProjectData} index={index} key={index} />;
		});

		return (
			<Table responsive striped bordered condensed hover>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Projects</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>{displayData}</tbody>
			</Table>
		);
	}

    render() {
        return (
            <div className="action-requests dashboard-container">{this.state.allUsers && this.state.allProjectData ? this.getDetails() : <Loader />}</div>
        );
    }
}

function mapStateToProps(state) {
	return {
		usersData: state.usersData,
		allProjectData: state.allProjectData
	};
}

const actions = {
	getUserDetails: getUserDetails,
	getAllProjectData: getAllProjectData
};

export default connect(mapStateToProps, actions)(UserDetails);