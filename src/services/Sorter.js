const titleExceptions = ['A', 'a', 'An', 'an', 'The', 'the'];

function standardizeFormat(citation) {
  if (citation[0] === '"') {
    return standardizeFormat(citation.substring(1, citation.length));
  } else if (citation.length > 2 && citation.substring(0, 3) === "<i>") {
    return standardizeFormat(citation.substring(3, citation.length));
  } else if (titleExceptions.includes(citation.split(' ')[0])) {
    return standardizeFormat(citation.substring(citation.split(' ')[0].length), citation.length);
  }
  return citation;
}

// TODO: get full number and check. Numbers should always go after letter ones and localeCompare only compares the first digit, not full number since it is still string comparison

/**
 * Function to be passed into an array of citation objects' sort() method to sort it into APA order
 * @param {Object} citation1
 * @param {Object} citation2
 */
export function APASort(citation1, citation2) {
  const apa1 = standardizeFormat(citation1.apa);
  const apa2 = standardizeFormat(citation2.apa);
  return apa1.localeCompare(apa2);
}

export function MLASort(citation1, citation2) {
  const mla1 = standardizeFormat(citation1.mla);
  const mla2 = standardizeFormat(citation2.mla);
  return mla1.localeCompare(mla2);
}

export function ChicagoSort(citation1, citation2) {
  const chicago1 = standardizeFormat(citation1.chicago);
  const chicago2 = standardizeFormat(citation2.chicago);
  return chicago1.localeCompare(chicago2);
}

export function HarvardSort(citation1, citation2) {
  const harvard1 = standardizeFormat(citation1.harvard);
  const harvard2 = standardizeFormat(citation2.harvard);
  return harvard1.localeCompare(harvard2);
}
