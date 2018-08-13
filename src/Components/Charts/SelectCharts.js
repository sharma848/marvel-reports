import React, { Component } from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import { Modal, Button, FormControl } from 'react-bootstrap';
import BarChart from './BarChart';
import { chartTexts } from '../../Constants/appConstants';

export default class SelectCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      allProjects: ['Pearson', 'NewsCycle', 'Kohls', 'DataCard', 'ReqTest'],
      show: true,
      search: ''
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
    let fillteredProjects = this.state.allProjects.filter((project) => {
      return project.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    });
    const checkBoxes = fillteredProjects.map(val => {
      return (
        <label className="container">{val}<Checkbox value={val}/><span className="checkmark" /></label>
      );
    });
    return checkBoxes;
  }

  updateSearch = (e) => {
    this.setState({
      search: e.target.value
    });
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
            <div className="form-group">
              <FormControl
                type="text"
                placeholder="Search For Projects"
                name="search"
                value={this.state.search}
                onChange={this.updateSearch}
              />
            </div>
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