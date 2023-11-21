import React from 'react';
import './HeadingWithLine.css'; // Import a separate CSS file for styling

export default function HeadingWithLine({ content }) {
    return (
        <header className="heading-with-line">
            <div className="line"></div>
            <h2>{content}</h2>
        </header>
    );
};
