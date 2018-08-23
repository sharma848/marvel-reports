import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import RenderChart from './RenderChart';
import { chartTexts } from '../../Constants/appConstants';
import RenderProjects from './RenderProjects';
import TableFilter from './TableFilter';
import expanded_image from '../../assets/img/expanded_view.png';
import collapsed_image from '../../assets/img/collapse_view.png';
import { removeUserDashboard, getUserDashboard } from '../../Actions/index';

class SelectCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectsSavedData: null,
      allProjects: ['Release Burndown Chart', 'Team Velocity Chart', 'Plan Vs Actual Chart', 'Fix Version Chart', 'Component Chart', 'Epic Completetion Chart', 'Current Sprint Report'],
      show: true,
      search: '',
      viewButtonText: 'Expanded View',
      collapseView: true
    };
  }

  componentWillMount() {
    if(!(this.props.dashboardData && this.props.dashboardData.userData)) {
      this.props.getUserDashboard();
    }
  }

  componentWillReceiveProps(nextProps) {
		if (nextProps.dashboardData && nextProps.dashboardData.userData && this.props.dashboardData.userData !== nextProps.dashboardData.userData) {
      const projectsSavedData = nextProps.dashboardData.userData.configuration;
      const projects = [];
      projectsSavedData.forEach(project => projects.push(project.graphId));
			this.setState({ projectsSavedData: nextProps.dashboardData.userData.configuration, projects });
		}
	}

  handleClose= () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  projectsChanged = (newProject) => {
    this.setState({
      projects: this.state.projects.concat(newProject)
    });
  }

  changeView = () => {
    this.setState({
      collapseView: !this.state.collapseView
    });
  }

  removeChart = (chart) => {
    const projects = this.state.projects;
    const index = projects.indexOf(chart);
    if(index > -1) {
      projects.splice(index, 1);      
      this.props.removeUserDashboard({ graphId: chart });
    }
    this.setState({ projects: projects });    
  }

  renderProjects = () => {      
      let value = this.state.projects.map((val,index) => <RenderChart name={val} removeChart={this.removeChart} key={index} collapseView={this.state.collapseView} viewToggled={this.state.collapseView} />);
      return value;
  }

  renderModal = () => {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <RenderProjects projects={this.state.projects} allProjects={this.state.allProjects} projectsChanged={this.projectsChanged} />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={this.handleClose}>{chartTexts.closeText}</button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  render() {
    return (
      <div className="chart-container">
        {this.state.collapseView ? <span className="toggle-view-image"><img src={expanded_image} alt="Expanded View" onClick={this.changeView} /></span>
        : <span className="toggle-view-image"><img src={collapsed_image} alt="Collapsed View" onClick={this.changeView} /></span>}
        <button className="btn btn-success select-charts-btn" onClick={this.handleShow}>
          {chartTexts.btnText}
        </button>
        {this.renderModal()}
        <div className={this.state.collapseView ? "charts" : ''}>
          {this.renderProjects()}
        </div>
        <hr />
        {/* <TableFilter /> */}
      </div>
    );
  }    
};

function mapStateToProps(state) {
	return {
		dashboardData: state.dashboardData
	};
}

const actions = {
  removeUserDashboard: removeUserDashboard,
  getUserDashboard: getUserDashboard
};

export default connect(mapStateToProps, actions)(SelectCharts);