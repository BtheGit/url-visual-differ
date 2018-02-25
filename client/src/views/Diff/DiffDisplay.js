import React from 'react';
import ResultsCard from './components/ResultsCard';
import base64js from 'base64-js';

const base64Pre = 'data:image/png;base64,';

const DiffDisplay = ({ results }) => (
    <div>
        <h2>Diff Display - PLACEHOLDER</h2>
        {
            results && results.map(({result, width}, idx) => {
                const imgData = base64js.fromByteArray(result.data);
                const imgSrc = `${base64Pre}${imgData}`;
                console.log(imgSrc)
                return (
                <ResultsCard
                    key={idx}
                    type={width}
                    imgSrc={imgSrc}
                    metrics={'Placeholder for comparison metrics'}
                />
            )})
        }
    </div>
)

export default DiffDisplay;