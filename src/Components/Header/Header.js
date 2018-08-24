import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Image, Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllProjectData } from '../../Actions/index';
import { headerConst } from '../../Constants/appConstants';
import durgesh from '../../images/durgesh.jpg'
import neha from '../../images/neha.jpg'
import abhishek from '../../images/abhishek.jpg'
import adit from '../../images/adit.jpg'
import jatin from '../../images/jatin.jpg'
import kavya from '../../images/kavya.jpg'

export class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allProjectData: '',
            selectedProject: '',
            show: false
        };
    }

    componentDidMount() {
        this.props.getAllProjectData();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.AllProjects.data && nextProps.AllProjects.data.projects) {
            this.setState({
                allProjectData: nextProps.AllProjects.data.projects,
                selectedProject: nextProps.AllProjects.data.projects[0].name
            });
            sessionStorage.setItem('PId', nextProps.AllProjects.data.projects[0].pid);
        }
    }

    setProjectId = (id, name) =>{
        sessionStorage.setItem('PId', id);
        this.setState({
            selectedProject: name
        });
    }

    getProjectDropdown = () => {
        const data = this.state.allProjectData.map((data, key) => {
            return <a className="dropdown-item" onClick={() => this.setProjectId(data.pid, data.name)} key={key} >{data.name}</a>;
        });

        return data;
    }

    handleClick = () => {this.setState({show:true})}
    
    handleClose = () => {this.setState({show:false})}

    renderModal = () => {
        return (
            <Modal show={this.state.show} onHide={this.handleClose} bsSize="large">
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body>
                    <div className="w-100 p-3 ">
                        <Grid fluid>
                            <Row>
                                <Col xs={4} className="padding-40">
                                    <div>
                                        <a href="https://glo.globallogic.com/users/profile/d.mishra" target="_blank" className="image-section"><Image src={durgesh} circle/>Durgesh Kumar Mishra</a>
                                    </div>
                                </Col>
                                <Col xs={4}  className="padding-40">
                                    <div>
                                        <a href="https://glo.globallogic.com/users/profile/neha.sharma2" target="_blank" className="image-section"><Image src={neha} circle/>Neha Sharma</a>
                                    </div>
                                </Col>
                                <Col xs={4}  className="padding-40">
                                    <div>
                                        <a href="https://glo.globallogic.com/users/profile/adit.garg" target="_blank" className="image-section"><Image src={adit} circle/>Adit Garg</a>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}  className="padding-40">
                                    <div>
                                        <a href="https://glo.globallogic.com/users/profile/abhishek.sharma5" target="_blank" className="image-section"><Image src={abhishek} circle/>Abhishek Sharma</a>
                                    </div>
                                </Col>
                                <Col xs={4}  className="padding-40">
                                    <div>
                                        <a href="https://glo.globallogic.com/users/profile/jatin.sokhal" target="_blank" className="image-section"><Image src={jatin} circle/>Jatin Sokhal</a>
                                    </div>
                                </Col>
                                <Col xs={4}  className="padding-40">
                                    <div>
                                        <a href="https://glo.globallogic.com/users/profile/kavya.jain" target="_blank" className="image-section"><Image src={kavya} circle/>Kavya Jain</a>
                                    </div>
                                </Col>
                            </Row>    
                        </Grid>
                    </div>
              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-primary" onClick={this.handleClose}>Close</button>
              </Modal.Footer>
            </Modal>
          );
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand" href="/dashboard">{headerConst.heading}</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.props.user_data.name}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to={
                                    {
                                        pathname: "/dashboard/account",
                                        userData: this.props.user_data
                                    }
                                } className="dropdown-item">{headerConst.account}</Link>
                                <Link to="/dashboard/settings" className="dropdown-item">{headerConst.setting}</Link>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" onClick={this.props.logout}>{headerConst.logout}</a>
                            </div>
                        </li>
                    </ul>
                    {this.state.allProjectData ? <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {this.state.selectedProject}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {this.getProjectDropdown()}
                            </div>
                        </li>
                    </ul> : ''}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" id="navbarContributors" role="button" aria-haspopup="true" aria-expanded="false" onClick={this.handleClick}>
                                Contributors
                            </a>
                            {this.renderModal()}
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        AllProjects: state.allProjectData
    };
}

export default connect(mapStateToProps, { getAllProjectData: getAllProjectData })(Header);