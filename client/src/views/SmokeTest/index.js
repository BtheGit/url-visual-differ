import React from 'react';
import { connect } from 'react-redux';
import { executeSmoketest } from '../../store/smoketest/actions';

class SmokeTest extends React.PureComponent {
    render() {
        return(
            <div>
                <button onClick={this.props.executeSmoketest}>Start Smoketest</button>
            </div>
        )
    }
}

const MapDispatchToProps = {
    executeSmoketest
}

export default connect(null, MapDispatchToProps)(SmokeTest);