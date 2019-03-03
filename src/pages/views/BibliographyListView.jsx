import React, { Component } from 'react';
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
            <div style={styles.body}>
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

const styles = {
    body: {
        width: '400px',
        background: 'linear-gradient(191.76deg, rgba(255, 168, 0, 0) 15.19%, rgba(232, 39, 186, 0.615317) 104.2%, #8F00FF 152.47%), #FFE455'
    }
}