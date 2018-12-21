import React, { Component } from 'react';
import './Home.css';
import Bibliography from './Bibliography';

/**
 * Bibliography page to set up new bibliography. Default page if no bibliography settings exist.
 * @prop {String} style Currently selected bibliography style
 * @prop {Function} updateStyle Method to update selected style globally
 */
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.selectStyle = this.selectStyle.bind(this);
    this.updateStyleGlobal = props.updateStyle;
    this.state = {
      style: props.style
    }
  }

  /**
   * Method to select a new style and update state globally
   * @param {String} styleName Currently selected style
   */
  selectStyle(styleName) {
    this.setState({
      style: styleName
    });
    this.updateStyleGlobal(styleName);
  }

  render() {
    return (
      <div>
        <h1 className="splash">inCite</h1>
        <div className="button-container">
            <StyleButton styleName="MLA" selected={this.state.style === "MLA" ? true : false} selectStyleMethod={() => this.selectStyle("MLA")}/>
            <StyleButton styleName="APA" selected={this.state.style === "APA" ? true : false} selectStyleMethod={() => this.selectStyle("APA")}/>
            <StyleButton styleName="Chicago" selected={this.state.style === "Chicago" ? true : false} selectStyleMethod={() => this.selectStyle("Chicago")}/>
            <StyleButton styleName="Harvard" selected={this.state.style === "Harvard" ? true : false} selectStyleMethod={() => this.selectStyle("Harvard")}/>
        </div>
        <Bibliography style={this.state.style} />
      </div>
    );
  }
}

/**
 * Button to select bibliography style
 * @prop {String} styleName Name of currently selected citation style
 * @prop {Function} selectStyleMethod Function to update selected style 
 */
class StyleButton extends Component {
  constructor(props) {
    super(props);
    this.styleName = props.styleName;
    this.selectStyleMethod = props.selectStyleMethod;
  }
  
  render() {
    return (
      <div>
          <button className={this.props.selected ? "selected style-button" : "default style-button"} onClick={this.selectStyleMethod}>
            {this.styleName}
          </button>
      </div>
    )
  }
}
