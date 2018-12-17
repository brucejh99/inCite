import React, { Component } from 'react';
import './Bibliography.css';
import { getOrSetBibliography, resetBibliography } from '../services/Storage';

export default class Bibliography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: props.style,
      bibliography: getOrSetBibliography()
    }
  }

  render() {
    return (
      <div className="body">
        <header className="splash">
          <h1 className="title">Bibliography</h1>
        </header>
        <body>

        </body>
      </div>
    );
  }
}
