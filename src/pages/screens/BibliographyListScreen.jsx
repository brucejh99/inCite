import React, { Component } from 'react';
import './BibliographyListScreen.css';
import { observer, inject } from 'mobx-react';
import FancyList from '../../components/FancyList';

class BibliographyListPage extends Component {
  state = {
    name: ''
  }

  onChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.setState({ [fieldName]: fieldValue });
  }

  createBibliography = (event) => {
    event.preventDefault();
    const { navigation, bibliography } = this.props.store;
    const { name } = this.state;
    bibliography.addBibliography(name, 'MLA');
    navigation.navigate('Bibliography');
  }

  selectBibliography = (name) => {
    const { bibliography, navigation } = this.props.store;
    bibliography.selectBibliography(name);
    navigation.navigate('Bibliography');
  }

  render() {
    const { bibliography } = this.props.store;
    return (
      <div>
        <FancyList
          data={bibliography.bibList}
          onClick={this.selectBibliography}
          delete={bibliography.deleteBibliography}
        />
        <form onSubmit={this.createBibliography}>
          Name: <input type="text" name="name" value={this.state.name} onChange={this.onChange}/>
          <br />
          <input type="submit" value="Create New Bibliography" />
        </form>
      </div>
    );
  }
}

export default inject('store')(observer(BibliographyListPage));