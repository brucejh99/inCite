import React, { Component } from 'react';
import './Launch.css';

export default class Launch extends Component {
  constructor(props) {
    super(props);
    this.value = props.value;
    this.updateName = props.updateName;
    this.selectStyle = this.selectStyle.bind(this);
    this.updateStyleGlobal = props.updateStyle;
    this.state = {
      MLA: false,
      APA: false,
      Chicago: false,
      Harvard: false,
    }
  }

  selectStyle(styleName) {
    if(styleName === "MLA") {
      this.setState({
        MLA: true,
        APA: false,
        Chicago: false,
        Harvard: false,
      });
      this.updateStyleGlobal("MLA");
    } else if(styleName === "APA") {
      this.setState({
        MLA: false,
        APA: true,
        Chicago: false,
        Harvard: false,
      });
      this.updateStyleGlobal("APA");
    } else if(styleName === "Chicago") {
      this.setState({
        MLA: false,
        APA: false,
        Chicago: true,
        Harvard: false,
      });
      this.updateStyleGlobal("Chicago");
    } else if(styleName === "Harvard") {
      this.setState({
        MLA: false,
        APA: false,
        Chicago: false,
        Harvard: true,
      });
      this.updateStyleGlobal("Harvard");
    } else {
      console.error('Error: invalid styleName provided');
    }
  }

  render() {
    return (
      <div>
        <h1 className="splash">inCite</h1>
        <div className="input-box">
            <input className="input-field" value={this.value} onKeyPress={this.updateName} type="text" placeholder="Bibliography Name" />
        </div>
        <div className="button-container space-between">
            <StyleButton styleName="MLA" selected={this.state.MLA} selectStyleMethod={() => this.selectStyle("MLA")}/>
            <StyleButton styleName="APA" selected={this.state.APA} selectStyleMethod={() => this.selectStyle("APA")}/>
            <StyleButton styleName="Chicago" selected={this.state.Chicago} selectStyleMethod={() => this.selectStyle("Chicago")}/>
            <StyleButton styleName="Harvard" selected={this.state.Harvard} selectStyleMethod={() => this.selectStyle("Harvard")}/>
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
