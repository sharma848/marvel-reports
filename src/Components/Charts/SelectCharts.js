import React, { Component } from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import { Modal, Button } from 'react-bootstrap';
import BarChart from './BarChart';

export default class SelectCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
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
  
  render() {
    return (
      <div className="chart-container">

        <button className="btn btn-success" onClick={this.handleShow}>
          Click to Select charts
        </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <CheckboxGroup
                checkboxDepth={2} // This is needed to optimize the checkbox group
                name="projects"
                value={this.state.projects}
                onChange={this.projectsChanged}>
        
                <label className="container">First<Checkbox value="first" checked="checked"/><span className="checkmark" /></label>
                <label className="container">Second<Checkbox value="second"/><span className="checkmark" /></label>
                <label className="container">Third<Checkbox value="third"/><span className="checkmark" /></label>
            </CheckboxGroup>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" onClick={this.handleClose}>Close</button>
          </Modal.Footer>
        </Modal>
        <div className="charts">
          {this.renderProjects()}
        </div>
      </div>
      
    );
  }    
};