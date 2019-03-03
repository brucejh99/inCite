import React, { Component } from 'react';
import FancyList from '../../components/FancyList';

require('../../assets/style.css');

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
                <h1 style={styles.header}>inCite</h1>
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
        height: '550px',
        background: 'linear-gradient(191.76deg, rgba(255, 168, 0, 0) 15.19%, rgba(232, 39, 186, 0.615317) 104.2%, #8F00FF 152.47%), #FFE455',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        width: '100%',
        margin: 0,
        textAlign: 'center',
        fontFamily: 'Oleo Script',
        color: 'white',
        fontSize: '64pt'
    }
}