const titleExceptions = ['A', 'a', 'An', 'an', 'The', 'the'];

function getLastName(author) {
  const nameArr = author.split(' ');
  if (nameArr.length == 1) {
    return nameArr[0];
  }
  return nameArr[nameArr.length - 1];
}

/**
 * Function to be passed into an array of citation objects' sort() method to sort it into APA order
 * @param {Object} citation1
 * @param {Object} citation2
 */
export function APASort(citation1, citation2) {
  if (citation1.apa < citation2.apa) {
    return -1;
  } if (citation1.apa === citation2.apa) {
    return 0;
  } // (citation1.apa > citation2.apa)
  return 1;
}

export function MLASort(citation1, citation2) {
  if (citation1.mla < citation2.mla) {
    return -1;
  } if (citation1.mla === citation2.mla) {
    return 0;
  } // (citation1.mla > citation2.mla)
  return 1;
}

export function ChicagoSort(citation1, citation2) {
  if (citation1.chicago < citation2.chicago) {
    return -1;
  } if (citation1.chicago === citation2.chicago) {
    return 0;
  } // (citation1.chicago > citation2.chicago)
  return 1;
}

export function HarvardSort(citation1, citation2) {
  if (citation1.harvard < citation2.harvard) {
    return -1;
  } if (citation1.harvard === citation2.harvard) {
    return 0;
  } // (citation1.harvard > citation2.harvard)
  return 1;
}
