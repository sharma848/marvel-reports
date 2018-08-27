import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import Loader from '../Loader/Loader';
import { getCurrentSprintReportData, postUserDashboard } from '../../Actions/index';

export class CurrentSprintReportChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CurrentSprintReportChartData: null
        };
    }

    componentDidMount() {
        this.props.getCurrentSprintReportData();
        this.props.postUserDashboard({ graphId: this.props.name });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.CurrentSprintReportChartData && nextProps.CurrentSprintReportChartData.data) {
            this.setState({
                CurrentSprintReportChartData: nextProps.CurrentSprintReportChartData.data.data
            });
        }
    }

    renderTableHeading() {
        const tableHeading = this.state.CurrentSprintReportChartData.currentSprints.columns.map(column => {
            return <th>{column}</th>;
        });

        return tableHeading;
    }

    renderTableBody() {
        const tableBody = this.state.CurrentSprintReportChartData.currentSprints.teamSprintList.map(data => {
            const keys = Object.keys(data.statusMap);
            const statusOptions =this.state.CurrentSprintReportChartData.currentSprints.statusNames.map(status => {  
                const val = keys.indexOf(status);            
                if(val >= 0) {
                    return <td>{`${data.statusMap[`${status}`].story} (${data.statusMap[`${status}`].storyPoints})`}</td>;
                } else {
                    return <td>0</td>;
                }
            });

        return (
            <tr>
                <td>{data.teamName}</td>
                <td>{data.numberOfStoryPoints}</td>
                <td>{data.numberOfIssues}</td>
                {statusOptions}
            </tr>);
        });

        return tableBody;
    }

    renderTotal() {
        var totalStoryPoints = 0;
        var noOfStories = 0;
        var definedStories = 0;
        var inProgressStories = 0;
        var resolvedStories = 0;
        var backlogStories = 0;
        var acceptedStories = 0;
        const tableBody = this.state.CurrentSprintReportChartData.currentSprints.teamSprintList.map(data => {
            totalStoryPoints += data.numberOfStoryPoints;
            noOfStories += data.numberOfIssues;
            if (data.statusMap.Defined) {
                definedStories += data.statusMap.Defined.story;
            }
            if (data.statusMap['In Progress']) {
                inProgressStories += data.statusMap['In Progress'].story;
            }
            if (data.statusMap.Resolved) {
                resolvedStories += data.statusMap.Resolved.story;
            }
            if (data.statusMap.Backlog) {
                backlogStories += data.statusMap.Backlog.story;
            }
            if (data.statusMap.Accepted) {
                acceptedStories += data.statusMap.Accepted.story;
            }

        });
        return (<tr>
            <td><b>Total</b></td>
            <td><b>{totalStoryPoints}</b></td>
            <td><b>{noOfStories}</b></td>
            <td><b>{definedStories}</b></td>
            <td><b>{inProgressStories}</b></td>
            <td><b>{resolvedStories}</b></td>
            <td><b>{backlogStories}</b></td>
            <td><b>{acceptedStories}</b></td>
        </tr>)
    }

    render() {
        return (
            <div>
                {this.state.CurrentSprintReportChartData ? (
                    <div>
                        <button type="button" className="close close-button" aria-label="Close" onClick={() => this.props.removeChart(this.props.name)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div className="current-sprint-heading">{this.props.name}</div>
                        <Table id="current_sprint_table" responsive striped bordered condensed hover>
                            <thead>
                                <tr>
                                    {this.renderTableHeading()}
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableBody()}
                            </tbody>
                        </Table>
                    </div>) : <Loader />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        CurrentSprintReportChartData: state.CurrentSprintReportChartData
    };
}

const actions = {
    getCurrentSprintReportData: getCurrentSprintReportData,
	postUserDashboard: postUserDashboard
};

export default connect(mapStateToProps, actions)(CurrentSprintReportChart);