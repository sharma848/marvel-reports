import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import BarChart from './BarChart';
import { chartTexts } from '../../Constants/appConstants';
import RenderCheckBoxes from './RenderCheckBoxes';
import TableFilter from './TableFilter';

export default class SelectCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      allProjects: ['Release Burndown Chart', 'Team Velocity Chart', 'Plan Vs Actual Chart', 'Fix Version Chart', 'PI Burndown Chart'],
      show: true,
      search: ''
    };
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

  renderProjects = () => {
      let value = this.state.projects.map(val => <div><BarChart name={val}/></div>);
      return value;
  }

  renderModal = () => {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <RenderCheckBoxes projects={this.state.projects} allProjects={this.state.allProjects} projectsChanged={this.projectsChanged} />
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
        <button className="btn btn-success" onClick={this.handleShow}>
          {chartTexts.btnText}
        </button>
        {this.renderModal()}
        <div className="charts">
          {this.renderProjects()}
        </div>
        <hr />
        <TableFilter />
      </div>
    );
  }    
};