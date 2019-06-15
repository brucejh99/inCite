import React from 'react';
import { YELLOW } from '../assets/colors';

export default ({ children, style }) => (
    <h1 style={{...styles.title, ...style }}>
        {children}
    </h1>
);

const styles = {
    title: {
        height: '50px',
        width: '317px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: YELLOW,
        fontFamily: 'Oleo Script',
        fontSize: '36px',
        margin: 0
    }
}
