/* global localStorage chrome */
import { types, flow } from 'mobx-state-tree';
import uuid from 'uuid/v4';
import request from 'request';

const metascraper = require('metascraper')([
    require('metascraper-author')(),
    require('metascraper-date')(),
    require('metascraper-publisher')(),
    require('metascraper-title')(),
    require('metascraper-url')()
]);

function getCorrectedCurrentDate() { // correct the date for timezone differences
    let date = new Date();
    date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return date;
}

const CitationModel = types
    .model('App', {
        article: types.optional(types.string),
        author: types.optional(types.string),
        publisher: types.optional(types.string),
        website: types.optional(types.string),
        datePublished: types.optional(types.Date),
        dateRetrieved: types.optional(types.Date),
        url: types.optional(types.string),
        id: types.string,
        complete: types.boolean
    })
    .actions(self => ({
        setData: flow(function*(data) {
            if(data === null) {
                self.complete = false;
                chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
                    const url = tabs[0].url;
                    request({ uri: url, timeout: 5000 }, async function(err, res, html) {
                      if(html === undefined || err) {
                        self.setState({
                          url: url,
                          id: uuid(),
                          complete: true
                        });
                      } else {
                        const metadata = yield metascraper({ html, url });
                        let dateString = metadata.date;
                        if(dateString) dateString = new Date(dateString);
                        self.setState({
                          complete: true,
                          article: metadata.title,
                          author: metadata.author,
                          website: metadata.publisher,
                          publisher: undefined,
                          datePublished: dateString,
                          dateRetrieved: getCorrectedCurrentDate(),
                          url: url,
                          id: uuid()
                        });
                      }
                    });
                  });
            } else {
                self.article = data.article;
                self.author = data.author;
                self.publisher = data.publisher;
                self.website = data.website;
                self.dataPublished = data.datePublished;
                self.dateRetrieved = data.dateRetrieved;
                self.url = data.url;
                self.id = data.id;
                self.complete = true;
            }
        })
    }))
    .views(self => ({

    }));

export const defaultView = {
    bibliographyListPage: true,
    bibliographyPage: false,
    citationPage: false
}

export default NavigationModel;
