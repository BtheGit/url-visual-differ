import React from 'react';
import './ErrorPage.css';

const ErrorPage = ({errorMessage}) => (
    <div>
        {errorMessage}
    </div>
)

export default ErrorPage;