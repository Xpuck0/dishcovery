import React from 'react';
import './Heading.css'; 
export default function Heading({ content, line}) {
    return (
        <header className="heading-with-line">
            {line && <div className="line"></div>}
            <h2>{content}</h2>
        </header>
    );
};
