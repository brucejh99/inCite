import React, { Component } from 'react';
import './Citation.css';

export default class Citation extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Format: MLA</h1>
        </header>

        <div className="body">
          <form>
            <div className="table">
              <label className="tr">
                <span className="td table-name">Website Name</span>
                <span className="td table-field">
                  <input className="name-input" type="text" name="website-name"
                    placeholder="Website Name"/>
                </span>
              </label>
              <label className="tr">
                <span className="td table-name">Article Name</span>
                <span className="td table-field">
                  <input className="name-input" type="text" name="article-name"
                    placeholder="Article Name"/>
                </span>
              </label>
              <label className="tr">
                <span className="td table-name">Author</span>
                <span className="td table-field">
                  <input className="author-name-input author-first-name" type="text"
                    name="author-first-name" placeholder="First Name"/>
                  <input className="author-name-input" type="text"
                    name="author-last-name" placeholder="Last Name"/>
                </span>
              </label>
              <label className="tr">
                <span className="td table-name">Date Published</span>
                <span className="td table-field">
                  <input className="name-input" type="date"
                    name="date-published" placeholder="Date Published"/>
                </span>
              </label>
              <label className="tr">
                <span className="td table-name">Sponsor</span>
                <span className="td table-field">
                  <input className="name-input" type="text"
                    name="sponsor" placeholder="Sponsor"/>
                </span>
              </label>
            </div>
            <div className="add-citation"><input type="submit" value="Add Citation" /></div>
          </form>
        </div>
      </div>
    );
  }
}
