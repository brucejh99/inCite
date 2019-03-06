import React from 'react';

export default ({
        style,
        hoverable = false,
        onClick,
        children
    }) => (
    <button onClick={onClick} style={{...styles.button, ...style}}>
        {children}
    </button>
);

const styles = {
    button: {
        textDecoration: 'none',
        textAlign: 'center',
        borderRadius: '0px 10px',
        cursor: 'pointer'
    }
}
