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
      viewerProjects: ['Release Burndown Chart', 'Team Velocity Chart', 'Plan Vs Actual Chart'],
      projectsSavedData: null,
      allProjects: ['Release Burndown Chart', 'Team Velocity Chart', 'Plan Vs Actual Chart', 'Fix Version Chart', 'Component Chart', 'Epic Completetion Chart', 'Current Sprint Report'],
      showModal: false,
      search: '',
      viewButtonText: 'Expanded View',
      collapseView: true
    };
  }

  componentWillMount() {
    if(!(this.props.dashboardData && this.props.dashboardData.userData) && sessionStorage.getItem("PId")) {
      this.props.getUserDashboard();
    }
  }

  componentWillReceiveProps(nextProps) {
		if (nextProps.dashboardData && nextProps.dashboardData.userData && this.props.dashboardData.userData !== nextProps.dashboardData.userData) {
      const projectsSavedData = nextProps.dashboardData.userData.configuration;
      this.setState({ projects: nextProps.dashboardData.userData.configuration });
		}
	}

  handleClose= () => {
    this.setState({ showModal: false });
  }

  handleShow = () => {
    this.setState({ showModal: true }, () => console.log("clicked"));
  }

  projectsChanged = (newProject, subProjectId) => {
    const projects = this.state.projects;
    projects.push({ 
      graphId: newProject,
      graphSubId: subProjectId
    });
    this.setState({ projects });
  }

  changeView = () => {
    this.setState({
      collapseView: !this.state.collapseView
    });
  }

  removeChart = (chart, chartSubId) => {
    const projects = this.state.projects;
    const updatedProjects = projects.filter(project => {
      if(project.graphSubId) {
        return chartSubId ? project.graphId != chart && project.graphSubId != chartSubId : true;  
      }
      return project.graphId != chart;
    });
    this.props.removeUserDashboard({ graphId: chart, graphSubId: chartSubId });
    this.setState({ projects: updatedProjects });    
  }

  renderProjects = () => {
      let value = this.state.projects.map((val,index) => {
        return <RenderChart name={val.graphId}
        settings={val.settings ? JSON.parse(val.settings) : null }
          removeChart={this.removeChart}
          key={index}
          collapseView={this.state.collapseView}
          viewToggled={this.state.collapseView} 
          projectsChanged={this.projectsChanged}
      /> }, this);
      return value;
  }

  renderModal = () => {
    let role = sessionStorage.getItem('role');
    
    return (
      <Modal show={this.state.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <RenderProjects
           projects = {this.state.projects}
           allProjects= {role==='view'? this.state.viewerProjects : this.state.allProjects}  
           projectsChanged={this.projectsChanged} 
          />
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
        {/* { this.state.projects.length === 0 ? this.renderModal() : ''} */}
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