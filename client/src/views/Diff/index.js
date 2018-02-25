import React from 'react';
import { connect } from 'react-redux';
import DiffForm from './DiffForm';
import DiffPreview from './DiffPreview';
import { requestDiff } from '../../store/diff/actions';
import './index.css';

class Diff extends React.Component {
    render() {
        const { results, isFetching, hasError } = this.props;
        return (
            <div className="diff-container">
                <header>
                    <h1>Compare a URL Across Servers</h1>
                </header>
                <DiffForm 
                    onSubmit={this.props.requestDiff}
                />
                <DiffPreview 
                    results={results}
                    isFetching={isFetching}
                    hasError={hasError}
                />
            </div>
        )
    }
}

const MapStateToProps = store => ({
    results: store.diff.results,
    isFetching: store.diff.isFetching,
    hasError: store.diff.hasError
})

const MapDispatchToProps = {
    requestDiff
};

export default connect(MapStateToProps, MapDispatchToProps)(Diff);