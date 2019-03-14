import React from 'react';

export default ({ children }) => (
    <h1 style={styles.title}>
        {children}
    </h1>
);

const styles = {
    title: {
        color: '#FFE455',
        fontFamily: 'Oleo Script',
        fontSize: '36px',
        margin: 0
    }
}