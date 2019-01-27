import React, { Component } from 'react';
import './Home.css';
import Bibliography from './Bibliography';
import { getState } from '../services/Storage';

/**
 * Bibliography page to set up new bibliography. Default page if no bibliography settings exist.
 * @prop {Function} updateStyle Method to update selected style globally
 */
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.updateStyle = props.updateStyle;
    this.selectStyle = this.selectStyle.bind(this);
    this.styleButton = this.styleButton.bind(this);
    this.state = getState();
  }

  /**
   * Method to select a new style and update state globally
   * @param {String} styleName Currently selected style
   */
  selectStyle(styleName) {
    this.setState({
      style: styleName
    });
    this.updateStyle(styleName);
  }

  styleButton(styleName) {
    return (
    <button className={this.state.style === styleName ? "style-button selected" : "style-button default"} onClick={() => this.selectStyle(styleName)}>
      {styleName}
    </button>
    );
  }

  render() {
    return (
      <div>
        <div className="button-container">
            {this.styleButton("MLA")}
            {this.styleButton("APA")}
            {this.styleButton("Chicago")}
            {this.styleButton("Harvard")}
        </div>
        <Bibliography style={this.state.style} />
      </div>
    );
  }
}
