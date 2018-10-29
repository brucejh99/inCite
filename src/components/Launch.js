import React, { Component } from 'react';
import './Launch.css';

export default class Launch extends Component {
  constructor(props) {
    super(props);
    this.value = props.value;
    this.updateName = props.updateName;
    this.MLA = false;
    this.APA = false;
    this.Chicago = false;
    this.Harvard = false;
  }

  render() {
    return (
      <div>
        <h1>inCite</h1>
        <div className="input-box">
            <input className="input-field" value={this.value} onKeyPress={this.updateName} type="text" placeholder="Bibliography Name" />
        </div>
        <div className="button-container space-between">
            <StyleButton styleName="MLA" selected={this.MLA}/>
            <StyleButton styleName="APA" selected={this.APA}/>
            <StyleButton styleName="Chicago" selected={this.Chicago}/>
            <StyleButton styleName="Harvard" selected={this.Harvard}/>
        </div>
      </div>
    );
  }
}

class StyleButton extends Component {
  constructor(props) {
    super(props);
    this.selected = props.selected;
    this.styleName = props.styleName;
  }
  
  render() {
    return (
      <div>
          <button className={this.selected ? "style-button-selected" : "style-button-default"}>
            {this.styleName}
          </button>
      </div>
    )
  }
}
