import React from 'react';
import ResultsCards from './components/ResultsCards';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorPage from '../../components/ErrorPage';
import './DiffPreview.css';

// Change this to conditionally render four different screens (loading, error, cards, initialstate)
const DiffPreview = ({ results, isFetching, hasError }) => {
    const stateClass = isFetching ? 'loading' : hasError ? 'error' : results ? 'results' : 'initial';
    return (
        <div className={`diff-preview ${stateClass}`}>
            { 
                isFetching 
                    ? <LoadingSpinner />
                    : hasError
                        ? <ErrorPage />
                        : results
                            ? <ResultsCards results={results} />
                            : <div>Enter details to run diffing program</div>
                    
            }
        </div>
    )
}


export default DiffPreview;