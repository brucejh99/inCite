import React from 'react';

export default ({ children, style }) => (
    <h1 style={{...styles.title, ...style }}>
        {children}
    </h1>
);

const styles = {
    title: {
        width: '317px',
        overflow: 'hidden',
        whiteSpace: 'no-wrap',
        color: '#FFE455',
        fontFamily: 'Oleo Script',
        fontSize: '36px',
        textOverflow: 'ellipsis',
        margin: 0
    }
}
