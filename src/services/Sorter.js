function getLastName(author) {
    const nameArr = author.split(' ');
    if (nameArr.length == 1) {
        return nameArr[0];
    } else {
        return nameArr[nameArr.length - 1];
    }
}

export function APASort(citation1, citation2) {
    let sortVal;
    if(citation1.author && citation2.author) {
        const lastName1 = getLastName(citation1);
    } else if(citation1.author) {
        // conditions
    } else if(citation2.author) {
        // conditions
    } else {
        // title only conditions
    }
}

export function MLASort(citation1, citation2) {
}

export function ChicagoSort(citation1, citation2) {
}

export function HarvardSort(citation1, citation2) {
}
