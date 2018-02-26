import React from 'react';
import { connect } from 'react-redux';
import DiffForm from './DiffForm';
import DiffPreview from './DiffPreview';
import { requestDiff } from '../../store/diff/actions';
import './index.css';

class Diff extends React.PureComponent {
    render() {
        const { results, isFetching, hasError, errorMessage } = this.props;
        return (
            <div className="diff-container">
                <header>
                    <h1>URL Comparison Tool</h1>
                </header>
                <DiffForm 
                    onSubmit={this.props.requestDiff}
                />
                <DiffPreview 
                    results={results}
                    isFetching={isFetching}
                    hasError={hasError}
                    errorMessage={errorMessage}
                />
            </div>
        )
    }
}

const MapStateToProps = store => ({
    results: store.diff.results,
    isFetching: store.diff.isFetching,
    hasError: store.diff.hasError,
    errorMessage: store.diff.errorMessage
})

const MapDispatchToProps = {
    requestDiff
};

export default connect(MapStateToProps, MapDispatchToProps)(Diff);