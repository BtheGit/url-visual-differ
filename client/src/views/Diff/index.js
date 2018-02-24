import React from 'react';
import DiffForm from './DiffForm';
import DiffDisplay from './DiffDisplay';

class Diff extends React.Component {
    handleSubmit = formData => {
        fetch('/api', {
            body: JSON.stringify(formData),
            method: 'POST'
        })
    }
    render() {
        return (
            <main>
                <h1>Diff Page</h1>
                <DiffForm 
                    onSubmit={this.handleSubmit}
                />
                <DiffDisplay />
            </main>
        )
    }
}

export default Diff;