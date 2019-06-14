import React from 'react';

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
        color: '#FFE455',
        fontFamily: 'Oleo Script',
        fontSize: '36px',
        margin: 0
    }
}
