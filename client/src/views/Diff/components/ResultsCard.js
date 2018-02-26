import React from 'react';
import { Link } from 'react-router-dom';
import './ResultsCard.css';

// NOTE: Number(x) === Number(x) is a trick to check for a valid number that is not NaN
// Annoyingly this throws an eslint warning in dev in CRA

const ResultsCard = ({ type, imgSrc }) => (
    <div className="results-card">
        <Link to={`/details/${type}`}>
            <h3 className="results-card__title">{ type }{ Number(type) === Number(type) ? 'px' : null }</h3>
        </Link>
        <div className="results-card__img">
            <img src={imgSrc} alt={`Diff results preview ${type}`}/>
        </div>
    </div>
)

export default ResultsCard;