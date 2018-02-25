import React from 'react';
import ResultsCard from './ResultsCard';
import base64js from 'base64-js';

const base64Pre = 'data:image/png;base64,';

const ResultsCards = ({ results }) => {
    return results.map(({result, width}, idx) => {
        const imgData = base64js.fromByteArray(result.data);
        const imgSrc = `${base64Pre}${imgData}`;
        return (
            <ResultsCard
                key={idx}
                type={width}
                imgSrc={imgSrc}
                metrics={'Placeholder for comparison metrics'}
            />
    )})
}

export default ResultsCards;