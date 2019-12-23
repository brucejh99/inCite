import React from 'react';
import { YELLOW, GREY_TRANSPARENT } from '../assets/colors';

export default ({ children, height = '150px', width = '300px' }) => (
    <div style={styles.background}>
        <div style={{...styles.modal, height, width}}>
            {children}
        </div>
    </div>
);

const styles = {
    background: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GREY_TRANSPARENT,
        zIndex: '1'
    },
    modal: {
        display: 'flex',
        backgroundColor: 'white',
        border: '1px solid ' + YELLOW,
        borderRadius: '0 10px',
        zIndex: '2'
    }
}
