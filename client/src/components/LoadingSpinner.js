import React from 'react';
import './LoadingSpinner.css';

// Credit to https://codepen.io/TheDutchCoder/pen/mgswv
// Pretty apt placeholder until I do a canvas based loader (probably never if you're reading this
// in the future ;) 

const LoadingSpinner = () => (
    <div className="loading-spinner">
        <div className="loading-spinner__loader">
            <div className="loading-spinner__dot"></div>
            <div className="loading-spinner__dot"></div>
            <div className="loading-spinner__dot"></div>
        </div>
    </div>
)

export default LoadingSpinner;