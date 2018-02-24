import React from 'react';
import { connect } from 'react-redux';
import DiffForm from './DiffForm';
import DiffDisplay from './DiffDisplay';
import { updateDiffResults } from '../../store/diff/actions';

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
            updateDiffResults(res);
        })
    }
    render() {
        return (
            <main>
                <h1>Diff Page</h1>
                <DiffForm 
                    onSubmit={this.handleSubmit}
                />
                <DiffDisplay 

                />
            </main>
        )
    }
}

const MapStateToProps = store => ({
    results: store.form.
})

export default Diff;