import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import BibliographyListView from '../views/BibliographyListView';

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
      <BibliographyListView
        bibliography={bibliography.bibList}
        selectBib={this.selectBibliography}
        deleteBib={bibliography.deleteBibliography}
        name={this.state.name}
        editName={this.onChange}
        submitName={this.createBibliography}
      />
    );
  }
}

export default inject('store')(observer(BibliographyListPage));