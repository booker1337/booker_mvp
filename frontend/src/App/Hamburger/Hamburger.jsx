import React from 'react';
import './Hamburger.css';

const Hamburger = ({ show }) => (
    <nav className={`Hamburger${show && ' open'}`}>
        <ul>
            <li><a href="/">Offers</a></li>
            <li><a href="/">Offers</a></li>
            <li><a href="/">Offers</a></li>
            <li><a href="/">Offers</a></li>
            <li><a href="/">Offers</a></li>
        </ul>
    </nav>
);

export default Hamburger;