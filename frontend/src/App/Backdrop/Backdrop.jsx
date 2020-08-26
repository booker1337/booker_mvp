import React from 'react';
import './Backdrop.css';
import { propTypes } from 'react-bootstrap/esm/Image';

export default function Backdrop() {
    return (
        <div className="Backdrop" onClick={props.BackdropClickHandler} />
    );
}