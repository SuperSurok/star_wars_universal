import React from 'react';

import './Spinner.css';

const Spinner = () => {
    return (
        <div className="lds-css ng-scope">
            <div className="lds-bars">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Spinner;