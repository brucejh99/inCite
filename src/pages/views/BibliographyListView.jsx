import React, { Component } from 'react';
import './BibliographyListView.css';
import FancyList from '../../components/FancyList';

export default class BibliographyListView extends Component {
    render() {
        const {
            bibliography,
            selectBib,
            deleteBib,
            name,
            editName,
            submitName
        } = this.props;
        return (
            <div>
                <FancyList
                    data={bibliography}
                    onClick={selectBib}
                    delete={deleteBib}
                />
                <form onSubmit={submitName}>
                    Name: <input type="text" name="name" value={name} onChange={editName}/>
                    <br />
                    <input type="submit" value="Create New Bibliography" />
                </form>
            </div>
        )
    }
}
