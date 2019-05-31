import React from 'react';
import './ErrorIndicator.css'

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <h3 className="boom">Boom! </h3>
            <span>
                {`Something has gone terribly wrong `}
            </span>
            <span>
                {`(but we alerady sent droind to fix it)`}
            </span>
        </div>
    );
};

export default ErrorIndicator;
