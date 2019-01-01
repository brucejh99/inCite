function getFirstName(author) {
    const nameArr = author.split(' ');
    if (nameArr.length == 1) {
        return undefined;
    } else {
        return nameArr[0];
    }
}

function getMiddleNames(author) {
    const nameArr = author.split(' ');
    if (nameArr.length == 1) {
        return undefined;
    } else {
        let middleNames = '';
        for(var i = 1; i < nameArr.length - 1; ++i) {
        const currMiddleName = nameArr[i];
        middleNames += `${currMiddleName} `;
        }
        return middleNames;
    }
}

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
        // conditions
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
