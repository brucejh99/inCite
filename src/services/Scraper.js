/* global chrome */

const requestPromise = require('request-promise');

function getUrl() {
    let url;
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        url = tabs[0].url;
        console.log(`Url: ${tabs[0].url}`);
    });
    return url;
}

function getPage(url) {
    const content = requestPromise(url)
        .then(function(html) {
            console.log(html);
            return html;
        })
        .catch(function(err) {
            console.error('Error getting page');
            return null;
        })
    console.log(content);
    return content;
}
