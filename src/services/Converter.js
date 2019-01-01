// used for reading months
const monthName = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function toAPA(data) {
    let citation = '';
    const author = data.author || undefined;
    const date = data.datePublished || undefined;
    const publisher = data.publisher || undefined;
    const title = data.article || undefined;
    const dateAccessed = data.dateRetrieved || undefined;
    const url = data.url; // must be there, even if they provide it as an empty string?
    // APA-style name
    if(author) {
        const nameArr = author.split(' ');
        if(nameArr.length === 1) {
            citation += `${nameArr[0]}. `;
        } else {
            citation += `${nameArr[nameArr.length - 1]}, `;
            const firstName = nameArr[0];
            citation += `${firstName[0]}. `;
            for(var i = 1; i < nameArr.length - 1; ++i) {
                const currMiddleName = nameArr[i];
                citation += `${currMiddleName[0]}. `;
            }
        }
    }
    if(!author && title) {
        const italicizedTitle = title.italics();
        citation += `${italicizedTitle}. `;
    }
    // APA-style date
    if(date) {
        const longDate = new Date(date);
        citation += `(${longDate.getFullYear()}, ${monthName[longDate.getMonth()]} ${longDate.getDate()}). `;
    }
    // article title
    if(author && title) {
        const italicizedTitle = title.italics();
        citation += `${italicizedTitle}. `;
    }
    // publisher name
    if(publisher) {
        citation += `${publisher}. `;
    }
    citation += 'Retrieved ';
    // date the resource was accessed
    if(dateAccessed) {
        const longDate = new Date(dateAccessed);
        citation += `(${longDate.getFullYear()}, ${monthName[longDate.getMonth()]} ${longDate.getDate()}), `;
    }
    // TODO: decide how to handle non-existent url
    citation += `from ${url}.`;
    return citation;
}

export function toMLA(data) {
    let citation = '';
    const author = data.author || undefined;
    const date = data.datePublished || undefined;
    const publisher = data.publisher || undefined;
    const title = data.article || undefined;
    const dateAccessed = data.dateRetrieved || undefined;
    const url = data.url; // must be there, even if they provide it as an empty string?
}

export function toChicago(data) {

}

export function toHarvard(data) {

}
