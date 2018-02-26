import React from 'react';
import './ResultsCard.css';

// NOTE: Number(x) === Number(x) is a trick to check for a valid number that is not NaN
// Annoyingly this throws an eslint warning in dev in CRA

const ResultsCard = ({ type, imgSrc }) => (
    <div className="results-card">
        <h3 className="results-card__title">{ type }{ Number(type) === Number(type) ? 'px' : null }</h3>
        <div className="results-card__img">
            <img src={imgSrc} alt={`Diff results preview ${type}`}/>
        </div>
    </div>
)

export default ResultsCard;