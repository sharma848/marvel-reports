import React, { Component } from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import { Modal, Button, FormControl } from 'react-bootstrap';

export default class RenderCheckBoxes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    renderCheckBoxes =() => {
        let fillteredProjects = this.props.allProjects.filter((project) => {
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
            <div>
                <div className="form-group">
                    <FormControl
                    type="text"
                    placeholder="Search For Projects"
                    name="search"
                    value={this.state.search}
                    onChange={this.updateSearch}
                    autoFocus
                    />
                </div>
                <CheckboxGroup
                    checkboxDepth={2}
                    name="projects"
                    value={this.props.projects}
                    onChange={this.props.projectsChanged}
                >
                    {this.renderCheckBoxes()}
                </CheckboxGroup>
            </div>
        );
    }
}