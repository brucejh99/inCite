import React from 'react';
import './CitationListItem.css';
import deleteIcon from '../assets/delete-icon.svg';

export default ({ citationObject, deleteCitation, editCitation }) => (
    <div className='container'>
        <div
            dangerouslySetInnerHTML={{ __html: citationObject.citation }}
            onClick={editCitation}
            className='citation' />
        <img
            src={deleteIcon}
            alt='Delete'
            onClick={deleteCitation}
            className='icon' />
    </div>
);
