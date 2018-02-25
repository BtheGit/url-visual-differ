import React from 'react';
import './ResultsCard.css';

const ResultsCard = ({ type, imgSrc }) => (
    <div className="results-card">
        <h3 className="results-card__title">{ type }{ typeof Number(type) === 'number' ? 'px' : null }</h3>
        <div className="results-card__img">
            <img src={imgSrc} alt={`Diff results preview ${type}`}/>
        </div>
        <div className="results-card__text">
            <h4>Results</h4>
            <p>Metric 1: Result</p>
            <p>Metric 2: Result</p>
        </div>
    </div>
)

export default ResultsCard;