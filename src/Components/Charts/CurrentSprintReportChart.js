import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import Loader from '../Loader/Loader';
import { getCurrentSprintReportData } from '../../Actions/index';

export class CurrentSprintReportChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CurrentSprintReportChartData: null
        };
    }

    componentDidMount() {
        this.props.getCurrentSprintReportData();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.CurrentSprintReportChartData && nextProps.CurrentSprintReportChartData.data) {
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
            return (<tr>
                <td>{data.teamName}</td>
                <td>{data.numberOfStoryPoints}</td>
                <td>{data.numberOfIssues}</td>
                <td>{data.statusMap.Defined ? `${data.statusMap.Defined.story} (${data.statusMap.Defined.storyPoints})` : 0}</td>
                <td>{data.statusMap['In Progress'] ? `${data.statusMap['In Progress'].story} (${data.statusMap['In Progress'].storyPoints})` : 0}</td>
                <td>{data.statusMap.Resolved ? `${data.statusMap.Resolved.story} (${data.statusMap.Resolved.storyPoints})` : 0}</td>
                <td>{data.statusMap.Backlog ? `${data.statusMap.Backlog.story} (${data.statusMap.Backlog.storyPoints})` : 0}</td>
                <td>{data.statusMap.Accepted ? `${data.statusMap.Accepted.story} (${data.statusMap.Accepted.storyPoints})` : 0}</td>
            </tr>)
        });

        return tableBody;
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
                    </div>) : <Loader /> }
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
    getCurrentSprintReportData: getCurrentSprintReportData
};

export default connect(mapStateToProps, actions)(CurrentSprintReportChart);