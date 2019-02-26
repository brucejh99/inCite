import React from 'react';
import './StyleButton.css';

export default (({ style, buttonStyle, updateStyle }) => (
    <button
        className={style === buttonStyle ? 'style-button selected' : 'style-button default'}
        onClick={() => updateStyle(buttonStyle)}>
        {buttonStyle}
    </button>
));
