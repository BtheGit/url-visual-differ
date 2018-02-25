import React from 'react';
import { connect } from 'react-redux';
import DiffForm from './DiffForm';
import DiffPreview from './DiffPreview';
import { updateDiffResults } from '../../store/diff/actions';
import './index.css';

class Diff extends React.Component {
    handleSubmit = formData => {
        fetch('/api/diff', {
            body: JSON.stringify(formData),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            this.props.updateDiffResults(res);
        })
    }
    render() {
        const { results } = this.props;
        return (
            <div className="diff-container">
                <h1>Diff Page</h1>
                <DiffForm 
                    onSubmit={this.handleSubmit}
                />
                <DiffPreview 
                    results={results}
                />
            </div>
        )
    }
}

const MapStateToProps = store => ({
    results: store.diff.results
})

const MapDispatchToProps = {
    updateDiffResults
};

export default connect(MapStateToProps, MapDispatchToProps)(Diff);