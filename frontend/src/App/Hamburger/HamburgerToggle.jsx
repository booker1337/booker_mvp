import React from 'react';
import './HambugerToggle.css';
import { propTypes } from 'react-bootstrap/esm/Image';

export default function HamburgerToggle() {
    return (
        <button className="toggleButton" onCLick={props.click}>
            <div className="toggle-button_line" />
            <div className="toggle-button_line" />
            <div className="toggle-button_line" />
        </button>
    );
}