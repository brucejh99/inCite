const requestPromise = require('request-promise');

function getPage(url) {
    const content = requestPromise(url)
        .then(function(html) {
            console.log(html);
            return html;
        })
        .catch(function(html) {
            console.error('Error getting page');
            return null;
        })
    console.log(content);
    return content;
}
