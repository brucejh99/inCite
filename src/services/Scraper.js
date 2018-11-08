/* global chrome */
const requestPromise = require('request-promise');
const { extract } = require('article-parser');

function getUrl() {
    let url;
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        url = tabs[0].url;
        console.log(`Url: ${tabs[0].url}`);
    });
    return url;
}

async function getPage(url) {
    const content = await requestPromise(url)
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

function getData(url) {
    const data = extract(url).then((articleData) => {
        data = articleData;
        console.log(data);
    }).catch((err) => {
        console.error(err);
        data = null;
    });
    return data;
}

function parseActivePage() {
    const url = getUrl();
    const data = getData(url);
    return data;
}