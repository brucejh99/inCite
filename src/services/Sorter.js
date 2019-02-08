const titleExceptions = ['A', 'a', 'An', 'an', 'The', 'the'];
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

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

// TODO: we might be able to break these down into a single function just by passing the .type portion. We'll see.

// For number comparison since localeCompare does string comparison and only considers the first digit
function getStartNumber(citation) {
  if(digits.includes(citation[0])) {
    let i = 0;
    let curr = 0;;
    while(digits.includes(citation[i])) {
      curr *= 10;
      curr += parseInt(citation[i]);
      ++i;
    }
    return curr;
  }
  return false;
}

/**
 * Function to be passed into an array of citation objects' sort() method to sort it into APA order
 * @param {Object} citation1
 * @param {Object} citation2
 */
export function APASort(citation1, citation2) {
  const apa1 = standardizeFormat(citation1.apa);
  const apa2 = standardizeFormat(citation2.apa);
  const num1 = getStartNumber(apa1);
  const num2 = getStartNumber(apa2);
  if(num1 && num2) {
    if(num1 < num2) return -1;
    else if(num1 === num2) return 0;
    else return 1;
  }
  if(num1) return -1;
  if(num2) return 1;
  return apa1.localeCompare(apa2);
}

export function MLASort(citation1, citation2) {
  const mla1 = standardizeFormat(citation1.mla);
  const mla2 = standardizeFormat(citation2.mla);
  const num1 = getStartNumber(mla1);
  const num2 = getStartNumber(mla2);
  if(num1 && num2) {
    if(num1 < num2) return -1;
    else if(num1 === num2) return 0;
    else return 1;
  }
  if(num1) return -1;
  if(num2) return 1;
  return mla1.localeCompare(mla2);
}

export function ChicagoSort(citation1, citation2) {
  const chicago1 = standardizeFormat(citation1.chicago);
  const chicago2 = standardizeFormat(citation2.chicago);
  const num1 = getStartNumber(chicago1);
  const num2 = getStartNumber(chicago2);
  if(num1 && num2) {
    if(num1 < num2) return -1;
    else if(num1 === num2) return 0;
    else return 1;
  }
  if(num1) return -1;
  if(num2) return 1;
  return chicago1.localeCompare(chicago2);
}

export function HarvardSort(citation1, citation2) {
  const harvard1 = standardizeFormat(citation1.harvard);
  const harvard2 = standardizeFormat(citation2.harvard);
  const num1 = getStartNumber(harvard1);
  const num2 = getStartNumber(harvard2);
  if(num1 && num2) {
    if(num1 < num2) return -1;
    else if(num1 === num2) return 0;
    else return 1;
  }
  if(num1) return -1;
  if(num2) return 1;
  return harvard1.localeCompare(harvard2);
}
