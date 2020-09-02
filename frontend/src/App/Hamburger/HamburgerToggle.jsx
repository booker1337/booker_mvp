import React from 'react';
import './HamburgerToggle.css';

export default function HamburgerToggle(props) {
    return (
        <button className="toggleButton" onCLick={props.click}>
            <div className="toggle-button_line" />
            <div className="toggle-button_line" />
            <div className="toggle-button_line" />
        </button>
    );
}