import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import { getDashboard } from '../../Actions/index';
import Header from '../Header/Header';
import SideBar from '../Sidebar/SideBar';
import Routes from '../../routes';
import UserDetail from '../UserDetail/UserDetail';

export class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			redirect: false
		};
	}

	componentWillMount() {
		this.props.getDashboard();
	}

	componentDidMount() {
		if (sessionStorage.getItem('SessionToken') == null) {
			this.setState({ redirect: true });
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.dashboardData && nextProps.dashboardData.data) {
			const data = nextProps.dashboardData.data.data;
			this.setState({ data: data });
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
						<Header logout={this.logout} user_name={this.state.data.name} />
						<SideBar role={this.state.data.role} />
					</div>
				) : (
					''
				)}
				<div className="dashboard-container">
					{this.props.children}
				</div>
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
