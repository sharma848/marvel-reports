import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

import { getUserDetails } from '../../Actions/index';
import UserDetail from '../UserDetail/UserDetail';
import Loader from '../Loader/Loader';

export class UserDetails extends Component {

    constructor(props) {
		super(props);
		this.state = {
			allUsers: null
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
	}

	getDetails() {
		const displayData = this.state.allUsers.map((user, index) => {
			return <UserDetail userData={user} index={index} key={index} />;
		});
		
		return (
			<Table bordered condensed hover>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Status</th>
						<th>Approve</th>
						<th>Revoke</th>
					</tr>
				</thead>
				<tbody>{displayData}</tbody>
			</Table>
		);
	}

    render() {
        return (
            <div className="action-requests">{this.state.allUsers ? this.getDetails() : <Loader />}</div>
        );
    }
}

function mapStateToProps(state) {
	return {
		usersData: state.usersData
	};
}

const actions = {
	getUserDetails: getUserDetails
};

export default connect(mapStateToProps, actions)(UserDetails);