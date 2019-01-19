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
    const url = data.url || '';
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
    if(date) {
        const longDate = new Date(date);
        citation += `(${longDate.getFullYear()}, ${monthName[longDate.getMonth()]} ${longDate.getDate()}). `;
    }
    if(author && title) {
        citation += `${title.italics()}. `;
    }
    if(publisher) {
        citation += `${publisher}. `;
    }
    citation += 'Retrieved ';
    if(dateAccessed) {
        const longDate = new Date(dateAccessed);
        citation += `(${longDate.getFullYear()}, ${monthName[longDate.getMonth()]} ${longDate.getDate()})`;
    }
    if(url) {
        citation += `, from ${url}.`;
    } else {
        citation += '.';
    }
    return citation;
}

export function toMLA(data) {
    let citation = '';
    const author = data.author || undefined;
    const date = data.datePublished || undefined;
    const publisher = data.publisher || undefined;
    const website = data.website | undefined;
    const title = data.article || undefined;
    const url = data.url || '';
    if(author) {
        const nameArr = author.split(' ');
        if(nameArr.length === 1) {
            citation += `${nameArr[0]}. `;
        } else {
            citation += `${nameArr[nameArr.length - 1]}, `;
            const firstName = nameArr[0];
            citation += `${firstName[0]} `;
            for(var i = 1; i < nameArr.length - 1; ++i) {
                const currMiddleName = nameArr[i];
                citation += `${currMiddleName[0]}. `;
            }
        }
    }
    if(title) {
        citation += `"${title}." `
    }
    if(website) {
        citation += `${website.italics()}, `;
    }
    if(publisher) {
        citation += `${publisher}, `;
    }
    if(date) {
        const longDate = new Date(date);
        citation += `${longDate.getDate()} ${monthName[longDate.getMonth()]} ${longDate.getFullYear()}`;
    }
    if(url) {
        citation += `, ${url}.`;
    } else {
        citation += '.';
    }
    return citation;
}

export function toChicago(data) {

}

export function toHarvard(data) {

}
