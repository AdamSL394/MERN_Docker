/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './dateRange.css';

export const DateRange = (props) => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();


    const settingStartDate = (e, endDate) => {
        setStartDate(e.target.value);
        const dateSelectionStartDate =e.target.value;
        props.runDateSearch(dateSelectionStartDate, endDate);
    };

    const settingEndDate = (startDate, e) => {
        setEndDate(e.target.value);
        const dateSelectionEndDate = e.target.value;
        props.runDateSearch(startDate, dateSelectionEndDate);
    };

    return (
        <span
            id='dateInput'
            style={{
                alignText: 'center',
                width: '13rem',
                height: '1.3rem',
                float  :'right',
                
            }}
        >
            <div style={{
                display: 'inline-flex',
            }}
            id='dateRange'
            >
               
                <input
                    type="date"
                    onChange={(e) => settingStartDate(e, endDate)}
                    className="date"
                ></input>
                <input
                    type="date"
                    onChange={(e) => settingEndDate(startDate, e)}
                    className="date"
                ></input>
            </div>
        </span>
    );
};


DateRange.propTypes = {
    runDateSearch: PropTypes.func,
};
