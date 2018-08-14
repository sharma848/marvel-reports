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
            <div className="project-add-section">{val}<Button className="add-to-dashboard-btn" onClick={() => this.props.projectsChanged(val)}>Add to Dashboard</Button></div>
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
                {this.renderCheckBoxes()}
            </div>
        );
    }
}