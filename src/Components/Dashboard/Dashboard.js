import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { PageHeader } from 'react-bootstrap'

import { getDashboard } from '../../Actions/index';
import Header from '../Header/Header';
import SideBar from '../Sidebar/SideBar';

export class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			redirect: false
		};
	}

	componentDidMount() {
		if (sessionStorage.getItem('SessionToken') == null) {
			this.setState({ redirect: true });
		}
		this.props.getDashboard();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.dashboardData && nextProps.dashboardData.data) {
			const data = nextProps.dashboardData.data.data;
			this.setState({ data: data });
			sessionStorage.setItem('role', data.role );
		}
	}

	logout = () => {
		console.log(sessionStorage.getItem('SessionToken'));
		sessionStorage.clear();
		this.setState({ redirect: true });
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to={'/login'} />;
		}

		return (
			<div className="">
				{this.state.data ? (
					<div>
						<div>
							<Header logout={this.logout} user_data={this.state.data} />
							<SideBar role={this.state.data.role} />
						</div>
						<div className="dashboard-container">
							{this.props.children}
						</div>
					</div>
				) : (
					''
				)}
				
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		dashboardData: state.dashboardData
	};
}

const actions = {
	getDashboard: getDashboard
};

export default withRouter(connect(mapStateToProps, actions)(Dashboard));
