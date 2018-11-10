/* global chrome */
// const requestPromise = require('request-promise');
// const { extract } = require('article-parser');

export default function getUrl() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        console.log(`Url: ${tabs[0].url}`);
        const url = tabs[0].url;
    });
}

/*
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
    let data;
    extract(url).then((articleData) => {
        data = articleData;
        console.log(articleData);
    }).catch((err) => {
        console.error(err);
        data = null;
    });
    return data;
}

export default function pageScraper() {
    const url = getUrl();
    const data = getData(url);
    return data;
}
*/
