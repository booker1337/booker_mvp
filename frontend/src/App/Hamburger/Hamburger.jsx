import React from 'react';
import './Hamburger.css';

export default function Hamburger() {
    let HamburgerClasses = ['Hamburger'];

    if (props.show)  {
        Hamburger = ['Hamburger', 'open'];
    }   

    return (
        <nav className={HamburgerClasses}>
            <ul>
                <li><a href="/">Offers</a></li>
                <li><a href="/">Offers</a></li>
                <li><a href="/">Offers</a></li>
                <li><a href="/">Offers</a></li>
                <li><a href="/">Offers</a></li>
            </ul>
        </nav>
    );
}