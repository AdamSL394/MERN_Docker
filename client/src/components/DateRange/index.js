/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
            style={{
                alignText: 'center',
                width: '13rem',
                height: '1.3rem',
                position: 'absolute',
                right: '12%',
                top: '15%',
            }}
        >
            <div style={{
                display: 'inline-flex',
            }}>
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
