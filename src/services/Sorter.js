function getLastName(author) {
    const nameArr = author.split(' ');
    if (nameArr.length == 1) {
        return nameArr[0];
    } else {
        return nameArr[nameArr.length - 1];
    }
}

/**
 * Function to be passed into an array of citation objects' sort() method to sort it into APA order
 * @param {Object} citation1 
 * @param {Object} citation2 
 */
export function APASort(citation1, citation2) {
    if(citation1.author && citation2.author) {
        const lastName1 = getLastName(citation1.author);
        const lastName2 = getLastName(citation2.author);
        if(lastName1 < lastName2) return 1;
        else if(lastName1 > lastName2) return -1;
        else return 0;
    } else if(citation1.author) {
        const lastName1 = getLastName(citation1.author);
        const title2 = citation2.title || '';
        if(lastName1 < title2) return 1;
        else if(lastName1 > title2) return -1;
        else return 0;
    } else if(citation2.author) {
        const title1 = citation1.title || '';
        const lastName2 = getLastName(citation2.author);
        if(title1 < lastName2) return 1;
        else if(title1 > lastName2) return -1;
        else return 0;
    } else {
        const title1 = citation1.title || '';
        const title2 = citation2.title || '';
        if(title1 < title2) return 1;
        else if(title2 > title2) return -1;
        else return 0;
    }
}

export function MLASort(citation1, citation2) {
}

export function ChicagoSort(citation1, citation2) {
}

export function HarvardSort(citation1, citation2) {
}
