import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProjectData } from '../../Actions/index';
import { headerConst } from '../../Constants/appConstants';

export class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allProjectData: '',
            selectedProject: ''
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