import React from 'react';
import './ResultsCard.css';

const ResultsCard = ({ type, imgSrc }) => (
    <div className="results-card">
        <h3 className="results-card__title">{ type }</h3>
        <div className="results-card__img">
            <img src={imgSrc} alt={`Diff results preview ${type}`}/>
        </div>
        <div className="results-card__text">
            Metrics
        </div>
    </div>
)

export default ResultsCard;