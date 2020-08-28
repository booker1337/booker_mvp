import React from 'react';
import './HambugerToggle.css';

export default function HamburgerToggle() {
    return (
        <button className="toggleButton" onCLick={this.click}>
            <div className="toggle-button_line" />
            <div className="toggle-button_line" />
            <div className="toggle-button_line" />
        </button>
    );
}