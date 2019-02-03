const titleExceptions = ['A', 'a', 'An', 'an', 'The', 'the'];

function standardizeFormat(citation) {
  if (citation[0] === '"') {
    return citation.substring(1, citation.length);
  } else if (citation.length > 2 && citation.substring(0, 3) === "<i>") {
    return citation.substring(3, citation.length);
  }
  return citation;
}

/*function getLastName(author) {
  const nameArr = author.split(' ');
  if (nameArr.length == 1) {
    return nameArr[0];
  }
  return nameArr[nameArr.length - 1];
}*/

/**
 * Function to be passed into an array of citation objects' sort() method to sort it into APA order
 * @param {Object} citation1
 * @param {Object} citation2
 */
export function APASort(citation1, citation2) {
  let apa1 = standardizeFormat(citation1.apa);
  let apa2 = standardizeFormat(citation2.apa);
  
  if (apa1 < apa2) {
    return -1;
  } if (apa1 === apa2) {
    return 0;
  } // (apa1 > apa2)
  return 1;
}

export function MLASort(citation1, citation2) {
  let mla1 = standardizeFormat(citation1.mla);
  let mla2 = standardizeFormat(citation2.mla);

  if (mla1 < mla2) {
    return -1;
  } if (mla1 === mla2) {
    return 0;
  } // (mla1 > mla2)
  return 1;
}

export function ChicagoSort(citation1, citation2) {
  let chicago1 = standardizeFormat(citation1.chicago);
  let chicago2 = standardizeFormat(citation2.chicago);

  if (chicago1 < chicago2) {
    return -1;
  } if (chicago1 === chicago2) {
    return 0;
  } // (chicago1 > chicago2)
  return 1;
}

export function HarvardSort(citation1, citation2) {
  let harvard1 = standardizeFormat(citation1.harvard);
  let harvard2 = standardizeFormat(citation2.harvard);

  if (harvard1 < harvard2) {
    return -1;
  } if (harvard1 === harvard2) {
    return 0;
  } // (harvard1 > harvard2)
  return 1;
}
