import React, { Component } from 'react';
import './Launch.css';

export default class Launch extends Component {
  constructor(props) {
    super(props);
    this.bibName = props.bibName;
    this.updateName = props.updateName;
    this.selectStyle = this.selectStyle.bind(this);
    this.updateStyleGlobal = props.updateStyle;
    this.state = {
      style: props.style
    }
  }

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
        <div className="button-container space-between">
            <StyleButton styleName="MLA" selected={this.state.style === "MLA" ? true : false} selectStyleMethod={() => this.selectStyle("MLA")}/>
            <StyleButton styleName="APA" selected={this.state.style === "APA" ? true : false} selectStyleMethod={() => this.selectStyle("APA")}/>
            <StyleButton styleName="Chicago" selected={this.state.style === "Chicago" ? true : false} selectStyleMethod={() => this.selectStyle("Chicago")}/>
            <StyleButton styleName="Harvard" selected={this.state.style === "Harvard" ? true : false} selectStyleMethod={() => this.selectStyle("Harvard")}/>
        </div>
        <div className="input-box">
            <input className="input-field" type="text" value={this.value} onKeyPress={this.updateName} placeholder="Bibliography Name" />
        </div>
      </div>
    );
  }
}

class StyleButton extends Component {
  constructor(props) {
    super(props);
    this.styleName = props.styleName;
    this.selectStyleMethod = props.selectStyleMethod;
  }
  
  render() {
    return (
      <div>
          <button className={this.props.selected ? "style-button-selected" : "style-button-default"} onClick={this.selectStyleMethod}>
            {this.styleName}
          </button>
      </div>
    )
  }
}
