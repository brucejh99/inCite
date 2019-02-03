/* global localStorage */

const defaultState = {
  style: null,
  launchPage: false,
  citationPage: true,
};

const defaultBibliography = [];

/**
 * Returns current state from local storage or sets it to default values if it is null and returns default values
 */
export function getOrSetState() {
  const currState = localStorage.getItem('state');
  if (currState === null) {
    localStorage.setItem('state', JSON.stringify(defaultState));
  }
  const state = JSON.parse(localStorage.getItem('state'));
  return state;
}

/**
 * Returns current state from local storage
 */
export function getState() {
  const state = JSON.parse(localStorage.getItem('state'));
  return state;
}

/**
 * Updates state item in local storage
 * @param {Object} state
 */
export function updateState(state) {
  localStorage.setItem('state', JSON.stringify(state));
}

/**
 * Returns bibliography stored in local storage or sets it to "" and retuns "" if it does not exist
 */
export function getOrSetBibliography() {
  const currBib = localStorage.getItem('bibliography');
  if (currBib === null) {
    localStorage.setItem('bibliography', JSON.stringify(defaultBibliography));
  }
  const bib = JSON.parse(localStorage.getItem('bibliography'));
  return bib;
}

export function getBibliography() {
  const bib = JSON.parse(localStorage.getItem('bibliography'));
  return bib;
}

/**
 * Resets bibliography item in local storage to an empty array
 */
export async function resetBibliography() {
  localStorage.setItem('bibliography', JSON.stringify(defaultBibliography));
}

/**
 * Sets an array of bibliography objects to the local storage
 * @param {Array} bibliography
 */
export function updateBibliography(bibliography) {
  localStorage.setItem('bibliography', JSON.stringify(bibliography));
}
