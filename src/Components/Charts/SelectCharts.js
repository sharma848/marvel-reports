import React, { Component } from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import { Modal, Button } from 'react-bootstrap';
import BarChart from './BarChart';
import { chartTexts } from '../../Constants/appConstants';

export default class SelectCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      allProjects: ['Pearson', 'NewsCycle', 'Kohls', 'DataCard', 'ReqTest'],
      show: true
    };
  }
  
  componentDidMount() {
    
  }

  handleClose= () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  projectsChanged = (newProject) => {
    this.setState({
      projects: newProject
    });
  }

  renderProjects = () => {
      let value = this.state.projects.map(val => <div><BarChart name={val}/></div>);
      return value;
  }

  renderCheckBoxes =() => {
    const checkBoxes = this.state.allProjects.map(val => {
      return (
        <label className="container">{val}<Checkbox value={val}/><span className="checkmark" /></label>
      );
    });
    return checkBoxes;
  }
  
  render() {
    return (
      <div className="chart-container">
        <button className="btn btn-success" onClick={this.handleShow}>
          {chartTexts.btnText}
        </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <CheckboxGroup
              checkboxDepth={2} // This is needed to optimize the checkbox group
              name="projects"
              value={this.state.projects}
              onChange={this.projectsChanged}
            >
                {this.renderCheckBoxes()}        
            </CheckboxGroup>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" onClick={this.handleClose}>{chartTexts.closeText}</button>
          </Modal.Footer>
        </Modal>
        <div className="charts">
          {this.renderProjects()}
        </div>
      </div>
      
    );
  }    
};