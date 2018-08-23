import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getCurrentSprintReportData } from '../../Actions/index';

export class CurrentSprintReportChart extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                CurrentSprintReportChart Component
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        CurrentSprintReportChart: state.CurrentSprintReportChart
    };
}

const actions = {
    getCurrentSprintReportData: getCurrentSprintReportData
};

export default connect(mapStateToProps, actions)(CurrentSprintReportChart);